"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatVideosS3 = void 0;
const renderer_1 = require("@remotion/renderer");
const fs_1 = __importStar(require("fs"));
const path_1 = __importStar(require("path"));
const constants_1 = require("../../shared/constants");
const io_1 = require("./io");
const timer_1 = require("./timer");
const getChunkDownloadOutputLocation = ({ outdir, file, }) => {
    return path_1.default.join(outdir, path_1.default.basename(file));
};
const downloadS3File = async ({ bucket, key, outdir, region, expectedBucketOwner, }) => {
    const Body = await (0, io_1.lambdaReadFile)({
        bucketName: bucket,
        key,
        region,
        expectedBucketOwner,
    });
    const outpath = getChunkDownloadOutputLocation({ outdir, file: key });
    if (Buffer.isBuffer(Body)) {
        return fs_1.promises.writeFile(outpath, Body);
    }
    return new Promise((resolve, reject) => {
        Body.pipe((0, fs_1.createWriteStream)(outpath))
            .on('error', (err) => reject(err))
            .on('close', () => resolve());
    });
};
const getAllFilesS3 = ({ bucket, expectedFiles, outdir, renderId, region, expectedBucketOwner, }) => {
    const alreadyDownloading = {};
    const downloaded = {};
    const getFiles = async () => {
        const prefix = (0, constants_1.chunkKey)(renderId);
        const lsTimer = (0, timer_1.timer)('Listing files');
        const contents = await (0, io_1.lambdaLs)({
            bucketName: bucket,
            prefix,
            region,
            expectedBucketOwner,
        });
        lsTimer.end();
        return contents
            .filter((c) => { var _a; return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith((0, constants_1.chunkKey)(renderId)); })
            .map((_) => _.Key);
    };
    return new Promise((resolve, reject) => {
        const loop = async () => {
            const filesInBucket = await getFiles();
            const checkFinish = () => {
                const areAllFilesDownloaded = Object.keys(downloaded).length === expectedFiles;
                console.log('Checking for finish... ', Object.keys(downloaded), expectedFiles + ' files expected');
                if (areAllFilesDownloaded) {
                    console.log('All files are downloaded!');
                    resolve(filesInBucket.map((file) => getChunkDownloadOutputLocation({ outdir, file })));
                }
            };
            console.log('Found ', filesInBucket);
            filesInBucket.forEach(async (key) => {
                if (alreadyDownloading[key]) {
                    return;
                }
                alreadyDownloading[key] = true;
                try {
                    const downloadTimer = (0, timer_1.timer)('Downloading ' + key);
                    await downloadS3File({
                        bucket,
                        key,
                        outdir,
                        region,
                        expectedBucketOwner,
                    });
                    console.log('Successfully downloaded', key);
                    downloadTimer.end();
                    downloaded[key] = true;
                    checkFinish();
                }
                catch (err) {
                    reject(err);
                }
            });
            const areAllFilesDownloading = Object.keys(alreadyDownloading).length === expectedFiles;
            if (!areAllFilesDownloading) {
                setTimeout(() => {
                    loop();
                }, 100);
            }
        };
        loop();
    });
};
const concatVideosS3 = async ({ bucket, expectedFiles, onProgress, numberOfFrames, renderId, region, codec, expectedBucketOwner, fps, numberOfGifLoops, }) => {
    var _a;
    const outdir = (0, path_1.join)(renderer_1.RenderInternals.tmpDir(constants_1.CONCAT_FOLDER_TOKEN), 'bucket');
    if ((0, fs_1.existsSync)(outdir)) {
        (fs_1.rmSync !== null && fs_1.rmSync !== void 0 ? fs_1.rmSync : fs_1.rmdirSync)(outdir, {
            recursive: true,
        });
    }
    (0, fs_1.mkdirSync)(outdir);
    const files = await getAllFilesS3({
        bucket,
        expectedFiles,
        outdir,
        renderId,
        region,
        expectedBucketOwner,
    });
    const outfile = (0, path_1.join)(renderer_1.RenderInternals.tmpDir(constants_1.REMOTION_CONCATED_TOKEN), 'concat.' + renderer_1.RenderInternals.getFileExtensionFromCodec(codec, 'final'));
    const combine = (0, timer_1.timer)('Combine videos');
    const filelistDir = renderer_1.RenderInternals.tmpDir(constants_1.REMOTION_FILELIST_TOKEN);
    const encodingStart = Date.now();
    const codecForCombining = codec === 'h264-mkv' ? 'h264' : codec;
    await (0, renderer_1.combineVideos)({
        files,
        filelistDir,
        output: outfile,
        onProgress: (p) => onProgress(p, encodingStart),
        numberOfFrames,
        codec: codecForCombining,
        fps,
        numberOfGifLoops,
    });
    combine.end();
    const cleanupChunksProm = ((_a = fs_1.default.promises.rm) !== null && _a !== void 0 ? _a : fs_1.default.promises.rmdir)(outdir, {
        recursive: true,
    });
    return { outfile, cleanupChunksProm, encodingStart };
};
exports.concatVideosS3 = concatVideosS3;
