"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMedia = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const can_use_parallel_encoding_1 = require("./can-use-parallel-encoding");
const ensure_frames_in_order_1 = require("./ensure-frames-in-order");
const ensure_output_directory_1 = require("./ensure-output-directory");
const get_duration_from_frame_range_1 = require("./get-duration-from-frame-range");
const get_extension_from_codec_1 = require("./get-extension-from-codec");
const get_extension_of_filename_1 = require("./get-extension-of-filename");
const get_frame_to_render_1 = require("./get-frame-to-render");
const legacy_webpack_config_1 = require("./legacy-webpack-config");
const make_cancel_signal_1 = require("./make-cancel-signal");
const prespawn_ffmpeg_1 = require("./prespawn-ffmpeg");
const render_frames_1 = require("./render-frames");
const stitch_frames_to_video_1 = require("./stitch-frames-to-video");
const tmp_dir_1 = require("./tmp-dir");
const validate_even_dimensions_with_codec_1 = require("./validate-even-dimensions-with-codec");
const validate_output_filename_1 = require("./validate-output-filename");
const validate_scale_1 = require("./validate-scale");
/**
 *
 * @description Render a video from a composition
 * @link https://www.remotion.dev/docs/renderer/render-media
 */
const renderMedia = ({ parallelism, proResProfile, crf, composition, imageFormat, ffmpegExecutable, ffprobeExecutable, inputProps, pixelFormat, codec, envVariables, quality, frameRange, puppeteerInstance, outputLocation, onProgress, overwrite, onDownload, dumpBrowserLogs, onBrowserLog, onStart, timeoutInMilliseconds, chromiumOptions, scale, browserExecutable, port, cancelSignal, ...options }) => {
    var _a, _b;
    remotion_1.Internals.validateQuality(quality);
    if (typeof crf !== 'undefined' && crf !== null) {
        remotion_1.Internals.validateSelectedCrfAndCodecCombination(crf, codec);
    }
    if (outputLocation) {
        (0, validate_output_filename_1.validateOutputFilename)(codec, (0, get_extension_of_filename_1.getExtensionOfFilename)(outputLocation));
    }
    (0, validate_scale_1.validateScale)(scale);
    const everyNthFrame = (_a = options.everyNthFrame) !== null && _a !== void 0 ? _a : 1;
    const numberOfGifLoops = (_b = options.numberOfGifLoops) !== null && _b !== void 0 ? _b : null;
    const serveUrl = (0, legacy_webpack_config_1.getServeUrlWithFallback)(options);
    let stitchStage = 'encoding';
    let stitcherFfmpeg;
    let preStitcher = null;
    let encodedFrames = 0;
    let renderedFrames = 0;
    let renderedDoneIn = null;
    let encodedDoneIn = null;
    let cancelled = false;
    const renderStart = Date.now();
    const tmpdir = (0, tmp_dir_1.tmpDir)('pre-encode');
    const parallelEncoding = (0, can_use_parallel_encoding_1.canUseParallelEncoding)(codec);
    const actualImageFormat = imageFormat !== null && imageFormat !== void 0 ? imageFormat : 'jpeg';
    const preEncodedFileLocation = parallelEncoding
        ? path_1.default.join(tmpdir, 'pre-encode.' + (0, get_extension_from_codec_1.getFileExtensionFromCodec)(codec, 'chunk'))
        : null;
    const outputDir = parallelEncoding
        ? null
        : fs_1.default.mkdtempSync(path_1.default.join(os_1.default.tmpdir(), 'react-motion-render'));
    (0, validate_even_dimensions_with_codec_1.validateEvenDimensionsWithCodec)({
        codec,
        height: composition.height,
        scale: scale !== null && scale !== void 0 ? scale : 1,
        width: composition.width,
    });
    const callUpdate = () => {
        onProgress === null || onProgress === void 0 ? void 0 : onProgress({
            encodedDoneIn,
            encodedFrames,
            renderedDoneIn,
            renderedFrames,
            stitchStage,
        });
    };
    const realFrameRange = (0, get_frame_to_render_1.getRealFrameRange)(composition.durationInFrames, frameRange !== null && frameRange !== void 0 ? frameRange : null);
    const cancelRenderFrames = (0, make_cancel_signal_1.makeCancelSignal)();
    const cancelPrestitcher = (0, make_cancel_signal_1.makeCancelSignal)();
    const cancelStitcher = (0, make_cancel_signal_1.makeCancelSignal)();
    cancelSignal === null || cancelSignal === void 0 ? void 0 : cancelSignal(() => {
        cancelRenderFrames.cancel();
    });
    const { waitForRightTimeOfFrameToBeInserted, setFrameToStitch, waitForFinish } = (0, ensure_frames_in_order_1.ensureFramesInOrder)(realFrameRange);
    const fps = composition.fps / (everyNthFrame !== null && everyNthFrame !== void 0 ? everyNthFrame : 1);
    remotion_1.Internals.validateFps(fps, 'in "renderMedia()"', codec);
    const createPrestitcherIfNecessary = async () => {
        if (preEncodedFileLocation) {
            preStitcher = await (0, prespawn_ffmpeg_1.prespawnFfmpeg)({
                width: composition.width * (scale !== null && scale !== void 0 ? scale : 1),
                height: composition.height * (scale !== null && scale !== void 0 ? scale : 1),
                fps,
                outputLocation: preEncodedFileLocation,
                pixelFormat,
                codec,
                proResProfile,
                crf,
                onProgress: (frame) => {
                    encodedFrames = frame;
                    callUpdate();
                },
                verbose: remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose'),
                ffmpegExecutable,
                imageFormat: actualImageFormat,
                signal: cancelPrestitcher.cancelSignal,
            });
            stitcherFfmpeg = preStitcher.task;
        }
    };
    const waitForPrestitcherIfNecessary = async () => {
        var _a;
        if (stitcherFfmpeg) {
            await waitForFinish();
            (_a = stitcherFfmpeg === null || stitcherFfmpeg === void 0 ? void 0 : stitcherFfmpeg.stdin) === null || _a === void 0 ? void 0 : _a.end();
            try {
                await stitcherFfmpeg;
            }
            catch (err) {
                throw new Error(preStitcher === null || preStitcher === void 0 ? void 0 : preStitcher.getLogs());
            }
        }
    };
    const happyPath = createPrestitcherIfNecessary()
        .then(() => {
        const renderFramesProc = (0, render_frames_1.renderFrames)({
            config: composition,
            onFrameUpdate: (frame) => {
                renderedFrames = frame;
                callUpdate();
            },
            parallelism,
            outputDir,
            onStart: (data) => {
                renderedFrames = 0;
                callUpdate();
                onStart === null || onStart === void 0 ? void 0 : onStart(data);
            },
            inputProps,
            envVariables,
            imageFormat: actualImageFormat,
            quality,
            frameRange: frameRange !== null && frameRange !== void 0 ? frameRange : null,
            puppeteerInstance,
            everyNthFrame,
            onFrameBuffer: parallelEncoding
                ? async (buffer, frame) => {
                    var _a;
                    await waitForRightTimeOfFrameToBeInserted(frame);
                    if (cancelled) {
                        return;
                    }
                    const id = remotion_1.Internals.perf.startPerfMeasure('piping');
                    (_a = stitcherFfmpeg === null || stitcherFfmpeg === void 0 ? void 0 : stitcherFfmpeg.stdin) === null || _a === void 0 ? void 0 : _a.write(buffer);
                    remotion_1.Internals.perf.stopPerfMeasure(id);
                    setFrameToStitch(Math.min(realFrameRange[1] + 1, frame + everyNthFrame));
                }
                : undefined,
            serveUrl,
            dumpBrowserLogs,
            onBrowserLog,
            onDownload,
            timeoutInMilliseconds,
            chromiumOptions,
            scale,
            ffmpegExecutable,
            ffprobeExecutable,
            browserExecutable,
            port,
            cancelSignal: cancelRenderFrames.cancelSignal,
        });
        return renderFramesProc;
    })
        .then((renderFramesReturn) => {
        return Promise.all([renderFramesReturn, waitForPrestitcherIfNecessary()]);
    })
        .then(([{ assetsInfo }]) => {
        renderedDoneIn = Date.now() - renderStart;
        callUpdate();
        if (outputLocation) {
            (0, ensure_output_directory_1.ensureOutputDirectory)(outputLocation);
        }
        const stitchStart = Date.now();
        return Promise.all([
            (0, stitch_frames_to_video_1.stitchFramesToVideo)({
                width: composition.width * (scale !== null && scale !== void 0 ? scale : 1),
                height: composition.height * (scale !== null && scale !== void 0 ? scale : 1),
                fps,
                outputLocation,
                internalOptions: {
                    preEncodedFileLocation,
                    imageFormat: actualImageFormat,
                },
                force: overwrite !== null && overwrite !== void 0 ? overwrite : remotion_1.Internals.DEFAULT_OVERWRITE,
                pixelFormat,
                codec,
                proResProfile,
                crf,
                assetsInfo,
                ffmpegExecutable,
                ffprobeExecutable,
                onProgress: (frame) => {
                    stitchStage = 'muxing';
                    encodedFrames = frame;
                    callUpdate();
                },
                onDownload,
                numberOfGifLoops,
                verbose: remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose'),
                dir: outputDir !== null && outputDir !== void 0 ? outputDir : undefined,
                cancelSignal: cancelStitcher.cancelSignal,
            }),
            stitchStart,
        ]);
    })
        .then(([buffer, stitchStart]) => {
        encodedFrames = (0, get_duration_from_frame_range_1.getFramesToRender)(realFrameRange, everyNthFrame).length;
        encodedDoneIn = Date.now() - stitchStart;
        callUpdate();
        return buffer;
    })
        .catch((err) => {
        /**
         * When an error is thrown in renderFrames(...) (e.g., when delayRender() is used incorrectly), fs.unlinkSync(...) throws an error that the file is locked because ffmpeg is still running, and renderMedia returns it.
         * Therefore we first kill the FFMPEG process before deleting the file
         */
        cancelled = true;
        cancelRenderFrames.cancel();
        cancelStitcher.cancel();
        cancelPrestitcher.cancel();
        if (stitcherFfmpeg !== undefined && stitcherFfmpeg.exitCode === null) {
            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
                stitcherFfmpeg.on('close', resolve);
            });
            stitcherFfmpeg.kill();
            return promise.then(() => {
                throw err;
            });
        }
        throw err;
    })
        .finally(() => {
        if (preEncodedFileLocation !== null &&
            fs_1.default.existsSync(preEncodedFileLocation)) {
            fs_1.default.unlinkSync(preEncodedFileLocation);
        }
    });
    return Promise.race([
        happyPath,
        new Promise((_resolve, reject) => {
            cancelSignal === null || cancelSignal === void 0 ? void 0 : cancelSignal(() => {
                reject(new Error('renderMedia() got cancelled'));
            });
        }),
    ]);
};
exports.renderMedia = renderMedia;
