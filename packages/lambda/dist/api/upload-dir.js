"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDir = exports.getDirFiles = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const fs_1 = require("fs");
const mime_types_1 = __importDefault(require("mime-types"));
const path_1 = __importDefault(require("path"));
const aws_clients_1 = require("../shared/aws-clients");
const make_s3_key_1 = require("../shared/make-s3-key");
const getDirFiles = (entry) => {
    throw new TypeError('should only be executed in test ' + JSON.stringify(entry));
};
exports.getDirFiles = getDirFiles;
const uploadDir = async ({ bucket, region, dir, onProgress, folder, privacy, }) => {
    async function getFiles(directory) {
        const dirents = await fs_1.promises.readdir(directory, { withFileTypes: true });
        const _files = await Promise.all(dirents.map(async (dirent) => {
            const res = path_1.default.resolve(directory, dirent.name);
            const { size } = await fs_1.promises.stat(res);
            return dirent.isDirectory()
                ? getFiles(res)
                : [
                    {
                        name: res,
                        size,
                    },
                ];
        }));
        return _files.flat(1);
    }
    const files = await getFiles(dir);
    const progresses = {};
    for (const file of files) {
        progresses[file.name] = 0;
    }
    const client = (0, aws_clients_1.getS3Client)(region);
    const uploads = files.map(async (filePath) => {
        const Key = (0, make_s3_key_1.makeS3Key)(folder, dir, filePath.name);
        const Body = (0, fs_1.createReadStream)(filePath.name);
        const ContentType = mime_types_1.default.lookup(Key) || 'application/octet-stream';
        const ACL = privacy === 'private' ? 'private' : 'public-read';
        if (filePath.size > 5 * 1024 * 1024) {
            const paralellUploads3 = new lib_storage_1.Upload({
                client,
                queueSize: 4,
                partSize: 5 * 1024 * 1024,
                params: {
                    Key,
                    Bucket: bucket,
                    Body,
                    ACL,
                    ContentType,
                },
            });
            paralellUploads3.on('httpUploadProgress', (progress) => {
                var _a;
                progresses[filePath.name] = (_a = progress.loaded) !== null && _a !== void 0 ? _a : 0;
            });
            return paralellUploads3.done();
        }
        await client.send(new client_s3_1.PutObjectCommand({
            Key,
            Bucket: bucket,
            Body,
            ACL,
            ContentType,
        }));
        progresses[filePath.name] = filePath.size;
    });
    const promise = Promise.all(uploads);
    const interval = setInterval(() => {
        onProgress({
            totalSize: files.map((f) => f.size).reduce((a, b) => a + b, 0),
            sizeUploaded: Object.values(progresses).reduce((a, b) => a + b, 0),
            totalFiles: files.length,
            filesUploaded: files.filter((f) => progresses[f.name] === f.size).length,
        });
    }, 1000);
    await promise;
    clearInterval(interval);
};
exports.uploadDir = uploadDir;
