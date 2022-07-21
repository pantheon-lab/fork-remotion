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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stitchFramesToVideo = exports.spawnFfmpeg = void 0;
const execa_1 = __importDefault(require("execa"));
const fs_1 = __importStar(require("fs"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const calculate_asset_positions_1 = require("./assets/calculate-asset-positions");
const convert_assets_to_file_urls_1 = require("./assets/convert-assets-to-file-urls");
const download_and_map_assets_to_file_1 = require("./assets/download-and-map-assets-to-file");
const codec_supports_media_1 = require("./codec-supports-media");
const convert_number_of_gif_loops_to_ffmpeg_1 = require("./convert-number-of-gif-loops-to-ffmpeg");
const delete_directory_1 = require("./delete-directory");
const get_audio_codec_name_1 = require("./get-audio-codec-name");
const get_codec_name_1 = require("./get-codec-name");
const get_extension_from_codec_1 = require("./get-extension-from-codec");
const get_prores_profile_name_1 = require("./get-prores-profile-name");
const merge_audio_track_1 = require("./merge-audio-track");
const parse_ffmpeg_progress_1 = require("./parse-ffmpeg-progress");
const preprocess_audio_track_1 = require("./preprocess-audio-track");
const tmp_dir_1 = require("./tmp-dir");
const validate_even_dimensions_with_codec_1 = require("./validate-even-dimensions-with-codec");
const validate_ffmpeg_1 = require("./validate-ffmpeg");
const packageJsonPath = path_1.default.join(__dirname, '..', 'package.json');
const packageJson = fs_1.default.existsSync(packageJsonPath)
    ? JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf-8'))
    : null;
const getAssetsData = async ({ assets, downloadDir, onDownload, fps, expectedFrames, verbose, ffmpegExecutable, ffprobeExecutable, onProgress, }) => {
    const fileUrlAssets = await (0, convert_assets_to_file_urls_1.convertAssetsToFileUrls)({
        assets,
        downloadDir,
        onDownload: onDownload !== null && onDownload !== void 0 ? onDownload : (() => () => undefined),
    });
    (0, download_and_map_assets_to_file_1.markAllAssetsAsDownloaded)();
    const assetPositions = (0, calculate_asset_positions_1.calculateAssetPositions)(fileUrlAssets);
    if (verbose) {
        console.log('asset positions', assetPositions);
    }
    const tempPath = (0, tmp_dir_1.tmpDir)('remotion-audio-mixing');
    const preprocessProgress = new Array(assetPositions.length).fill(0);
    const updateProgress = () => {
        onProgress(preprocessProgress.reduce((a, b) => a + b, 0) / assetPositions.length);
    };
    const preprocessed = (await Promise.all(assetPositions.map(async (asset, index) => {
        const filterFile = path_1.default.join(tempPath, `${index}.wav`);
        const result = await (0, preprocess_audio_track_1.preprocessAudioTrack)({
            ffmpegExecutable: ffmpegExecutable !== null && ffmpegExecutable !== void 0 ? ffmpegExecutable : null,
            ffprobeExecutable: ffprobeExecutable !== null && ffprobeExecutable !== void 0 ? ffprobeExecutable : null,
            outName: filterFile,
            asset,
            expectedFrames,
            fps,
        });
        preprocessProgress[index] = 1;
        updateProgress();
        return result;
    }))).filter(remotion_1.Internals.truthy);
    const outName = path_1.default.join((0, tmp_dir_1.tmpDir)('remotion-audio-preprocessing'), `audio.wav`);
    await (0, merge_audio_track_1.mergeAudioTrack)({
        ffmpegExecutable: ffmpegExecutable !== null && ffmpegExecutable !== void 0 ? ffmpegExecutable : null,
        files: preprocessed,
        outName,
        numberOfSeconds: Number((expectedFrames / fps).toFixed(3)),
    });
    (0, delete_directory_1.deleteDirectory)(tempPath);
    onProgress(1);
    preprocessed.forEach((p) => {
        (0, delete_directory_1.deleteDirectory)(p);
    });
    return outName;
};
const spawnFfmpeg = async (options) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    remotion_1.Internals.validateDimension(options.height, 'height', 'passed to `stitchFramesToVideo()`');
    remotion_1.Internals.validateDimension(options.width, 'width', 'passed to `stitchFramesToVideo()`');
    const codec = (_a = options.codec) !== null && _a !== void 0 ? _a : remotion_1.Internals.DEFAULT_CODEC;
    (0, validate_even_dimensions_with_codec_1.validateEvenDimensionsWithCodec)({
        width: options.width,
        height: options.height,
        codec,
        scale: 1,
    });
    remotion_1.Internals.validateFps(options.fps, 'in `stitchFramesToVideo()`', codec);
    const crf = (_b = options.crf) !== null && _b !== void 0 ? _b : remotion_1.Internals.getDefaultCrfForCodec(codec);
    const pixelFormat = (_c = options.pixelFormat) !== null && _c !== void 0 ? _c : remotion_1.Internals.DEFAULT_PIXEL_FORMAT;
    await (0, validate_ffmpeg_1.validateFfmpeg)((_d = options.ffmpegExecutable) !== null && _d !== void 0 ? _d : null);
    const encoderName = (0, get_codec_name_1.getCodecName)(codec);
    const audioCodecName = (0, get_audio_codec_name_1.getAudioCodecName)(codec);
    const proResProfileName = (0, get_prores_profile_name_1.getProResProfileName)(codec, options.proResProfile);
    const mediaSupport = (0, codec_supports_media_1.codecSupportsMedia)(codec);
    const supportsCrf = encoderName && codec !== 'prores';
    const tempFile = options.outputLocation
        ? null
        : path_1.default.join((0, tmp_dir_1.tmpDir)('remotion-stitch-temp-dir'), `out.${(0, get_extension_from_codec_1.getFileExtensionFromCodec)(codec, 'final')}`);
    if (options.verbose) {
        console.log('[verbose] ffmpeg', (_e = options.ffmpegExecutable) !== null && _e !== void 0 ? _e : 'ffmpeg in PATH');
        console.log('[verbose] encoder', encoderName);
        console.log('[verbose] audioCodec', audioCodecName);
        console.log('[verbose] pixelFormat', pixelFormat);
        if (supportsCrf) {
            console.log('[verbose] crf', crf);
        }
        console.log('[verbose] codec', codec);
        console.log('[verbose] isAudioOnly', mediaSupport.audio && !mediaSupport.video);
        console.log('[verbose] proResProfileName', proResProfileName);
    }
    remotion_1.Internals.validateSelectedCrfAndCodecCombination(crf, codec);
    remotion_1.Internals.validateSelectedPixelFormatAndCodecCombination(pixelFormat, codec);
    const expectedFrames = options.assetsInfo.assets.length;
    const updateProgress = (preStitchProgress, muxProgress) => {
        var _a;
        const totalFrameProgress = 0.5 * preStitchProgress * expectedFrames + muxProgress * 0.5;
        (_a = options.onProgress) === null || _a === void 0 ? void 0 : _a.call(options, Math.round(totalFrameProgress));
    };
    const audio = mediaSupport.audio
        ? await getAssetsData({
            assets: options.assetsInfo.assets,
            downloadDir: options.assetsInfo.downloadDir,
            onDownload: options.onDownload,
            fps: options.fps,
            expectedFrames,
            verbose: (_f = options.verbose) !== null && _f !== void 0 ? _f : false,
            ffmpegExecutable: (_g = options.ffmpegExecutable) !== null && _g !== void 0 ? _g : null,
            ffprobeExecutable: (_h = options.ffprobeExecutable) !== null && _h !== void 0 ? _h : null,
            onProgress: (prog) => updateProgress(prog, 0),
        })
        : null;
    if (mediaSupport.audio && !mediaSupport.video) {
        if (!audioCodecName) {
            throw new TypeError('exporting audio but has no audio codec name. Report this in the Remotion repo.');
        }
        const ffmpegTask = (0, execa_1.default)('ffmpeg', [
            '-i',
            audio,
            '-c:a',
            audioCodecName,
            // Set bitrate up to 320k, for aac it might effectively be lower
            '-b:a',
            '320k',
            options.force ? '-y' : null,
            (_j = options.outputLocation) !== null && _j !== void 0 ? _j : tempFile,
        ].filter(remotion_1.Internals.truthy));
        (_k = options.cancelSignal) === null || _k === void 0 ? void 0 : _k.call(options, () => {
            ffmpegTask.kill();
        });
        await ffmpegTask;
        (_l = options.onProgress) === null || _l === void 0 ? void 0 : _l.call(options, expectedFrames);
        if (audio) {
            await (0, delete_directory_1.deleteDirectory)(path_1.default.dirname(audio));
        }
        const file = await new Promise((resolve, reject) => {
            if (tempFile) {
                (0, promises_1.readFile)(tempFile)
                    .then((f) => {
                    (0, fs_1.unlinkSync)(tempFile);
                    return resolve(f);
                })
                    .catch((e) => reject(e));
            }
            else {
                resolve(null);
            }
        });
        return {
            getLogs: () => '',
            task: Promise.resolve(file),
        };
    }
    const ffmpegArgs = [
        ['-r', String(options.fps)],
        ...(((_m = options.internalOptions) === null || _m === void 0 ? void 0 : _m.preEncodedFileLocation)
            ? [['-i', (_o = options.internalOptions) === null || _o === void 0 ? void 0 : _o.preEncodedFileLocation]]
            : [
                ['-f', 'image2'],
                ['-s', `${options.width}x${options.height}`],
                ['-start_number', String(options.assetsInfo.firstFrameIndex)],
                ['-i', options.assetsInfo.imageSequenceName],
            ]),
        audio ? ['-i', audio] : null,
        ((_p = options.numberOfGifLoops) !== null && _p !== void 0 ? _p : null) === null
            ? null
            : [
                '-loop',
                (0, convert_number_of_gif_loops_to_ffmpeg_1.convertNumberOfGifLoopsToFfmpegSyntax)((_q = options.numberOfGifLoops) !== null && _q !== void 0 ? _q : null),
            ],
        // -c:v is the same as -vcodec as -codec:video
        // and specified the video codec.
        ['-c:v', encoderName],
        ...(((_r = options.internalOptions) === null || _r === void 0 ? void 0 : _r.preEncodedFileLocation)
            ? []
            : [
                proResProfileName ? ['-profile:v', proResProfileName] : null,
                supportsCrf ? ['-crf', String(crf)] : null,
                ['-pix_fmt', pixelFormat],
                // Without explicitly disabling auto-alt-ref,
                // transparent WebM generation doesn't work
                pixelFormat === 'yuva420p' ? ['-auto-alt-ref', '0'] : null,
                ['-b:v', '1M'],
            ]),
        codec === 'h264' ? ['-movflags', 'faststart'] : null,
        audioCodecName ? ['-c:a', audioCodecName] : null,
        // Set max bitrate up to 1024kbps, will choose lower if that's too much
        audioCodecName ? ['-b:a', '512K'] : null,
        // Ignore metadata that may come from remote media
        ['-map_metadata', '-1'],
        [
            '-metadata',
            `comment=` +
                [`Made with Remotion`, packageJson ? packageJson.version : null].join(' '),
        ],
        options.force ? '-y' : null,
        (_s = options.outputLocation) !== null && _s !== void 0 ? _s : tempFile,
    ];
    if (options.verbose) {
        console.log('Generated FFMPEG command:');
        console.log(ffmpegArgs);
    }
    const ffmpegString = ffmpegArgs.flat(2).filter(Boolean);
    const task = (0, execa_1.default)((_t = options.ffmpegExecutable) !== null && _t !== void 0 ? _t : 'ffmpeg', ffmpegString, {
        cwd: options.dir,
    });
    (_u = options.cancelSignal) === null || _u === void 0 ? void 0 : _u.call(options, () => {
        task.kill();
    });
    let ffmpegOutput = '';
    let isFinished = false;
    (_v = task.stderr) === null || _v === void 0 ? void 0 : _v.on('data', (data) => {
        var _a;
        const str = data.toString();
        ffmpegOutput += str;
        if (options.onProgress) {
            const parsed = (0, parse_ffmpeg_progress_1.parseFfmpegProgress)(str);
            // FFMPEG bug: In some cases, FFMPEG does hang after it is finished with it's job
            // Example repo: https://github.com/JonnyBurger/ffmpeg-repro (access can be given upon request)
            if (parsed !== undefined) {
                // If two times in a row the finishing frame is logged, we quit the render
                if (parsed === expectedFrames) {
                    if (isFinished) {
                        (_a = task.stdin) === null || _a === void 0 ? void 0 : _a.write('q');
                    }
                    else {
                        isFinished = true;
                    }
                }
                updateProgress(1, parsed);
            }
        }
    });
    return {
        task: task.then(() => {
            if (tempFile === null) {
                return null;
            }
            return (0, promises_1.readFile)(tempFile)
                .then((file) => {
                return Promise.all([file, (0, delete_directory_1.deleteDirectory)(path_1.default.dirname(tempFile))]);
            })
                .then(([file]) => file);
        }),
        getLogs: () => ffmpegOutput,
    };
};
exports.spawnFfmpeg = spawnFfmpeg;
const stitchFramesToVideo = async (options) => {
    const { task, getLogs } = await (0, exports.spawnFfmpeg)(options);
    const happyPath = task.catch(() => {
        throw new Error(getLogs());
    });
    return Promise.race([
        happyPath,
        new Promise((_resolve, reject) => {
            var _a;
            (_a = options.cancelSignal) === null || _a === void 0 ? void 0 : _a.call(options, () => {
                reject(new Error('stitchFramesToVideo() got cancelled'));
            });
        }),
    ]);
};
exports.stitchFramesToVideo = stitchFramesToVideo;
