"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCliOptions = void 0;
const renderer_1 = require("@remotion/renderer");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const get_env_1 = require("./get-env");
const get_filename_1 = require("./get-filename");
const get_input_props_1 = require("./get-input-props");
const image_formats_1 = require("./image-formats");
const log_1 = require("./log");
const user_passed_output_location_1 = require("./user-passed-output-location");
const getAndValidateFrameRange = () => {
    const frameRange = remotion_1.Internals.getRange();
    if (typeof frameRange === 'number') {
        log_1.Log.warn('Selected a single frame. Assuming you want to output an image.');
        log_1.Log.warn(`If you want to render a video, pass a range:  '--frames=${frameRange}-${frameRange}'.`);
        log_1.Log.warn("To dismiss this message, add the '--sequence' flag explicitly.");
    }
    return frameRange;
};
const getFinalCodec = async (options) => {
    const userCodec = remotion_1.Internals.getOutputCodecOrUndefined();
    const codec = remotion_1.Internals.getFinalOutputCodec({
        codec: userCodec,
        fileExtension: options.isLambda
            ? null
            : renderer_1.RenderInternals.getExtensionOfFilename((0, user_passed_output_location_1.getUserPassedOutputLocation)()),
        emitWarning: true,
    });
    const ffmpegExecutable = remotion_1.Internals.getCustomFfmpegExecutable();
    if (codec === 'vp8' &&
        !(await renderer_1.RenderInternals.ffmpegHasFeature({
            feature: 'enable-libvpx',
            isLambda: options.isLambda,
            ffmpegExecutable,
        }))) {
        log_1.Log.error("The Vp8 codec has been selected, but your FFMPEG binary wasn't compiled with the --enable-lipvpx flag.");
        log_1.Log.error('This does not work, please switch out your FFMPEG binary or choose a different codec.');
    }
    if (codec === 'h265' &&
        !(await renderer_1.RenderInternals.ffmpegHasFeature({
            feature: 'enable-gpl',
            isLambda: options.isLambda,
            ffmpegExecutable,
        }))) {
        log_1.Log.error("The H265 codec has been selected, but your FFMPEG binary wasn't compiled with the --enable-gpl flag.");
        log_1.Log.error('This does not work, please recompile your FFMPEG binary with --enable-gpl --enable-libx265 or choose a different codec.');
    }
    if (codec === 'h265' &&
        !(await renderer_1.RenderInternals.ffmpegHasFeature({
            feature: 'enable-libx265',
            isLambda: options.isLambda,
            ffmpegExecutable,
        }))) {
        log_1.Log.error("The H265 codec has been selected, but your FFMPEG binary wasn't compiled with the --enable-libx265 flag.");
        log_1.Log.error('This does not work, please recompile your FFMPEG binary with --enable-gpl --enable-libx265 or choose a different codec.');
    }
    return codec;
};
const getBrowser = () => { var _a; return (_a = remotion_1.Internals.getBrowser()) !== null && _a !== void 0 ? _a : remotion_1.Internals.DEFAULT_BROWSER; };
const getAndValidateAbsoluteOutputFile = (outputFile, overwrite) => {
    const absoluteOutputFile = path_1.default.resolve(process.cwd(), outputFile);
    if (fs_1.default.existsSync(absoluteOutputFile) && !overwrite) {
        log_1.Log.error(`File at ${absoluteOutputFile} already exists. Use --overwrite to overwrite.`);
        process.exit(1);
    }
    return absoluteOutputFile;
};
const getAndValidateShouldOutputImageSequence = async ({ frameRange, isLambda, }) => {
    const shouldOutputImageSequence = remotion_1.Internals.getShouldOutputImageSequence(frameRange);
    // When parsing options locally, we don't need FFMPEG because the render will happen on Lambda
    if (!shouldOutputImageSequence && !isLambda) {
        await renderer_1.RenderInternals.validateFfmpeg(remotion_1.Internals.getCustomFfmpegExecutable());
    }
    return shouldOutputImageSequence;
};
const getAndValidateCrf = (shouldOutputImageSequence, codec) => {
    const crf = shouldOutputImageSequence ? null : remotion_1.Internals.getActualCrf(codec);
    if (crf !== null) {
        remotion_1.Internals.validateSelectedCrfAndCodecCombination(crf, codec);
    }
    return crf;
};
const getAndValidatePixelFormat = (codec) => {
    const pixelFormat = remotion_1.Internals.getPixelFormat();
    remotion_1.Internals.validateSelectedPixelFormatAndCodecCombination(pixelFormat, codec);
    return pixelFormat;
};
const getAndValidateProResProfile = (actualCodec) => {
    const proResProfile = remotion_1.Internals.getProResProfile();
    remotion_1.Internals.validateSelectedCodecAndProResCombination(actualCodec, proResProfile);
    return proResProfile;
};
const getAndValidateImageFormat = ({ shouldOutputImageSequence, codec, pixelFormat, }) => {
    const imageFormat = (0, image_formats_1.getImageFormat)(shouldOutputImageSequence ? undefined : codec);
    remotion_1.Internals.validateSelectedPixelFormatAndImageFormatCombination(pixelFormat, imageFormat);
    return imageFormat;
};
const getAndValidateBrowser = async (browserExecutable) => {
    const browser = getBrowser();
    try {
        await renderer_1.RenderInternals.ensureLocalBrowser(browser, browserExecutable);
    }
    catch (err) {
        log_1.Log.error('Could not download a browser for rendering frames.');
        log_1.Log.error(err);
        process.exit(1);
    }
    return browser;
};
const getCliOptions = async (options) => {
    var _a;
    const frameRange = getAndValidateFrameRange();
    const codec = options.type === 'get-compositions'
        ? 'h264'
        : await getFinalCodec({ isLambda: options.isLambda });
    const shouldOutputImageSequence = options.type === 'still'
        ? true
        : await getAndValidateShouldOutputImageSequence({
            frameRange,
            isLambda: options.isLambda,
        });
    const outputFile = options.isLambda || options.type === 'get-compositions'
        ? null
        : (0, get_filename_1.getOutputFilename)({
            codec,
            imageSequence: shouldOutputImageSequence,
            type: options.type,
        });
    const overwrite = remotion_1.Internals.getShouldOverwrite();
    const crf = getAndValidateCrf(shouldOutputImageSequence, codec);
    const pixelFormat = getAndValidatePixelFormat(codec);
    const imageFormat = getAndValidateImageFormat({
        shouldOutputImageSequence,
        codec,
        pixelFormat,
    });
    const proResProfile = getAndValidateProResProfile(codec);
    const browserExecutable = remotion_1.Internals.getBrowserExecutable();
    const ffmpegExecutable = remotion_1.Internals.getCustomFfmpegExecutable();
    const ffprobeExecutable = remotion_1.Internals.getCustomFfprobeExecutable();
    const scale = remotion_1.Internals.getScale();
    const port = remotion_1.Internals.getServerPort();
    const chromiumOptions = {
        disableWebSecurity: remotion_1.Internals.getChromiumDisableWebSecurity(),
        ignoreCertificateErrors: remotion_1.Internals.getIgnoreCertificateErrors(),
        headless: remotion_1.Internals.getChromiumHeadlessMode(),
        gl: (_a = remotion_1.Internals.getChromiumOpenGlRenderer()) !== null && _a !== void 0 ? _a : remotion_1.Internals.DEFAULT_OPENGL_RENDERER,
    };
    const everyNthFrame = remotion_1.Internals.getAndValidateEveryNthFrame(codec);
    const numberOfGifLoops = remotion_1.Internals.getAndValidateNumberOfGifLoops(codec);
    const parallelism = remotion_1.Internals.getConcurrency();
    renderer_1.RenderInternals.validateConcurrency(parallelism, 'concurrency');
    return {
        puppeteerTimeout: remotion_1.Internals.getCurrentPuppeteerTimeout(),
        parallelism,
        frameRange,
        shouldOutputImageSequence,
        codec,
        overwrite: remotion_1.Internals.getShouldOverwrite(),
        inputProps: (0, get_input_props_1.getInputProps)(() => undefined),
        envVariables: await (0, get_env_1.getEnvironmentVariables)(),
        quality: remotion_1.Internals.getQuality(),
        absoluteOutputFile: outputFile
            ? getAndValidateAbsoluteOutputFile(outputFile, overwrite)
            : null,
        browser: await getAndValidateBrowser(browserExecutable),
        crf,
        pixelFormat,
        imageFormat,
        proResProfile,
        everyNthFrame,
        numberOfGifLoops,
        stillFrame: remotion_1.Internals.getStillFrame(),
        browserExecutable,
        ffmpegExecutable,
        ffprobeExecutable,
        logLevel: remotion_1.Internals.Logging.getLogLevel(),
        scale,
        chromiumOptions,
        port: port !== null && port !== void 0 ? port : null,
    };
};
exports.getCliOptions = getCliOptions;
