"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderInternals = exports.stitchFramesToVideo = exports.renderStill = exports.renderMedia = exports.renderFrames = exports.openBrowser = exports.makeCancelSignal = exports.getCompositions = exports.ErrorWithStackFrame = exports.combineVideos = void 0;
const execa_1 = __importDefault(require("execa"));
const download_file_1 = require("./assets/download-file");
const can_use_parallel_encoding_1 = require("./can-use-parallel-encoding");
const delete_directory_1 = require("./delete-directory");
const ensure_output_directory_1 = require("./ensure-output-directory");
const symbolicate_error_1 = require("./error-handling/symbolicate-error");
const symbolicateable_error_1 = require("./error-handling/symbolicateable-error");
const ffmpeg_flags_1 = require("./ffmpeg-flags");
const get_concurrency_1 = require("./get-concurrency");
const get_duration_from_frame_range_1 = require("./get-duration-from-frame-range");
const get_extension_from_codec_1 = require("./get-extension-from-codec");
const get_extension_of_filename_1 = require("./get-extension-of-filename");
const get_frame_to_render_1 = require("./get-frame-to-render");
const get_local_browser_executable_1 = require("./get-local-browser-executable");
const get_port_1 = require("./get-port");
const is_serve_url_1 = require("./is-serve-url");
const mime_types_1 = require("./mime-types");
const normalize_serve_url_1 = require("./normalize-serve-url");
const open_browser_1 = require("./open-browser");
const parse_browser_error_stack_1 = require("./parse-browser-error-stack");
const is_path_inside_1 = require("./serve-handler/is-path-inside");
const serve_static_1 = require("./serve-static");
const stitch_frames_to_video_1 = require("./stitch-frames-to-video");
const tmp_dir_1 = require("./tmp-dir");
const validate_concurrency_1 = require("./validate-concurrency");
const validate_even_dimensions_with_codec_1 = require("./validate-even-dimensions-with-codec");
const validate_ffmpeg_1 = require("./validate-ffmpeg");
const validate_puppeteer_timeout_1 = require("./validate-puppeteer-timeout");
const validate_scale_1 = require("./validate-scale");
const wait_for_symbolication_error_to_be_done_1 = require("./wait-for-symbolication-error-to-be-done");
var combine_videos_1 = require("./combine-videos");
Object.defineProperty(exports, "combineVideos", { enumerable: true, get: function () { return combine_videos_1.combineVideos; } });
var handle_javascript_exception_1 = require("./error-handling/handle-javascript-exception");
Object.defineProperty(exports, "ErrorWithStackFrame", { enumerable: true, get: function () { return handle_javascript_exception_1.ErrorWithStackFrame; } });
var get_compositions_1 = require("./get-compositions");
Object.defineProperty(exports, "getCompositions", { enumerable: true, get: function () { return get_compositions_1.getCompositions; } });
var make_cancel_signal_1 = require("./make-cancel-signal");
Object.defineProperty(exports, "makeCancelSignal", { enumerable: true, get: function () { return make_cancel_signal_1.makeCancelSignal; } });
var open_browser_2 = require("./open-browser");
Object.defineProperty(exports, "openBrowser", { enumerable: true, get: function () { return open_browser_2.openBrowser; } });
var render_frames_1 = require("./render-frames");
Object.defineProperty(exports, "renderFrames", { enumerable: true, get: function () { return render_frames_1.renderFrames; } });
var render_media_1 = require("./render-media");
Object.defineProperty(exports, "renderMedia", { enumerable: true, get: function () { return render_media_1.renderMedia; } });
var render_still_1 = require("./render-still");
Object.defineProperty(exports, "renderStill", { enumerable: true, get: function () { return render_still_1.renderStill; } });
var stitch_frames_to_video_2 = require("./stitch-frames-to-video");
Object.defineProperty(exports, "stitchFramesToVideo", { enumerable: true, get: function () { return stitch_frames_to_video_2.stitchFramesToVideo; } });
exports.RenderInternals = {
    ensureLocalBrowser: get_local_browser_executable_1.ensureLocalBrowser,
    ffmpegHasFeature: ffmpeg_flags_1.ffmpegHasFeature,
    getActualConcurrency: get_concurrency_1.getActualConcurrency,
    getFfmpegVersion: ffmpeg_flags_1.getFfmpegVersion,
    validateFfmpeg: validate_ffmpeg_1.validateFfmpeg,
    binaryExists: validate_ffmpeg_1.binaryExists,
    getFfmpegBuildInfo: ffmpeg_flags_1.getFfmpegBuildInfo,
    serveStatic: serve_static_1.serveStatic,
    validateEvenDimensionsWithCodec: validate_even_dimensions_with_codec_1.validateEvenDimensionsWithCodec,
    normalizeServeUrl: normalize_serve_url_1.normalizeServeUrl,
    spawnFfmpeg: stitch_frames_to_video_1.spawnFfmpeg,
    getFileExtensionFromCodec: get_extension_from_codec_1.getFileExtensionFromCodec,
    tmpDir: tmp_dir_1.tmpDir,
    deleteDirectory: delete_directory_1.deleteDirectory,
    isServeUrl: is_serve_url_1.isServeUrl,
    ensureOutputDirectory: ensure_output_directory_1.ensureOutputDirectory,
    getRealFrameRange: get_frame_to_render_1.getRealFrameRange,
    validatePuppeteerTimeout: validate_puppeteer_timeout_1.validatePuppeteerTimeout,
    downloadFile: download_file_1.downloadFile,
    validateScale: validate_scale_1.validateScale,
    killAllBrowsers: open_browser_1.killAllBrowsers,
    parseStack: parse_browser_error_stack_1.parseStack,
    symbolicateError: symbolicate_error_1.symbolicateError,
    SymbolicateableError: symbolicateable_error_1.SymbolicateableError,
    getFramesToRender: get_duration_from_frame_range_1.getFramesToRender,
    getExtensionOfFilename: get_extension_of_filename_1.getExtensionOfFilename,
    getDesiredPort: get_port_1.getDesiredPort,
    isPathInside: is_path_inside_1.isPathInside,
    execa: execa_1.default,
    registerErrorSymbolicationLock: wait_for_symbolication_error_to_be_done_1.registerErrorSymbolicationLock,
    unlockErrorSymbolicationLock: wait_for_symbolication_error_to_be_done_1.unlockErrorSymbolicationLock,
    canUseParallelEncoding: can_use_parallel_encoding_1.canUseParallelEncoding,
    mimeContentType: mime_types_1.mimeContentType,
    mimeLookup: mime_types_1.mimeLookup,
    validateConcurrency: validate_concurrency_1.validateConcurrency,
};
