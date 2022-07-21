"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quietFlagProvided = exports.parseCommandLine = exports.parsedCli = exports.BooleanFlags = void 0;
const minimist_1 = __importDefault(require("minimist"));
const path_1 = require("path");
const remotion_1 = require("remotion");
const log_1 = require("./log");
exports.BooleanFlags = [
    'force',
    'overwrite',
    'sequence',
    'help',
    'quiet',
    'q',
    // Lambda flags
    'force',
    'disable-chunk-optimization',
    'save-browser-logs',
    'disable-cloudwatch',
    'yes',
    'y',
    'disable-web-security',
    'ignore-certificate-errors',
    'disable-headless',
];
exports.parsedCli = (0, minimist_1.default)(process.argv.slice(2), {
    boolean: exports.BooleanFlags,
});
const parseCommandLine = (type) => {
    if (exports.parsedCli['pixel-format']) {
        remotion_1.Config.Output.setPixelFormat(exports.parsedCli['pixel-format']);
    }
    if (exports.parsedCli['image-format']) {
        remotion_1.Config.Rendering.setImageFormat(exports.parsedCli['image-format']);
    }
    if (exports.parsedCli['browser-executable']) {
        remotion_1.Config.Puppeteer.setBrowserExecutable(exports.parsedCli['browser-executable']);
    }
    if (exports.parsedCli['ffmpeg-executable']) {
        remotion_1.Config.Rendering.setFfmpegExecutable((0, path_1.resolve)(exports.parsedCli['ffmpeg-executable']));
    }
    if (exports.parsedCli['number-of-gif-loops']) {
        remotion_1.Config.Rendering.setNumberOfGifLoops(exports.parsedCli['number-of-gif-loops']);
    }
    if (exports.parsedCli['ffprobe-executable']) {
        remotion_1.Config.Rendering.setFfprobeExecutable((0, path_1.resolve)(exports.parsedCli['ffprobe-executable']));
    }
    if (typeof exports.parsedCli['bundle-cache'] !== 'undefined') {
        remotion_1.Config.Bundling.setCachingEnabled(exports.parsedCli['bundle-cache'] !== 'false');
    }
    if (exports.parsedCli['disable-web-security']) {
        remotion_1.Config.Puppeteer.setChromiumDisableWebSecurity(true);
    }
    if (exports.parsedCli['ignore-certificate-errors']) {
        remotion_1.Config.Puppeteer.setChromiumIgnoreCertificateErrors(true);
    }
    if (exports.parsedCli['disable-headless']) {
        remotion_1.Config.Puppeteer.setChromiumHeadlessMode(false);
    }
    if (exports.parsedCli.log) {
        if (!remotion_1.Internals.Logging.isValidLogLevel(exports.parsedCli.log)) {
            log_1.Log.error('Invalid `--log` value passed.');
            log_1.Log.error(`Accepted values: ${remotion_1.Internals.Logging.logLevels
                .map((l) => `'${l}'`)
                .join(', ')}.`);
            process.exit(1);
        }
        remotion_1.Internals.Logging.setLogLevel(exports.parsedCli.log);
    }
    if (exports.parsedCli.concurrency) {
        remotion_1.Config.Rendering.setConcurrency(exports.parsedCli.concurrency);
    }
    if (exports.parsedCli.timeout) {
        remotion_1.Config.Puppeteer.setTimeoutInMilliseconds(exports.parsedCli.timeout);
    }
    if (exports.parsedCli.frames) {
        if (type === 'still') {
            log_1.Log.error('--frames flag was passed to the `still` command. This flag only works with the `render` command. Did you mean `--frame`? See reference: https://www.remotion.dev/docs/cli/');
            process.exit(1);
        }
        remotion_1.Internals.setFrameRangeFromCli(exports.parsedCli.frames);
    }
    if (exports.parsedCli.frame) {
        if (type === 'sequence') {
            log_1.Log.error('--frame flag was passed to the `render` command. This flag only works with the `still` command. Did you mean `--frames`? See reference: https://www.remotion.dev/docs/cli/');
            process.exit(1);
        }
        remotion_1.Internals.setStillFrame(Number(exports.parsedCli.frame));
    }
    if (exports.parsedCli.png) {
        log_1.Log.warn('The --png flag has been deprecrated. Use --sequence --image-format=png from now on.');
        remotion_1.Config.Output.setImageSequence(true);
        remotion_1.Config.Rendering.setImageFormat('png');
    }
    if (exports.parsedCli.sequence) {
        remotion_1.Config.Output.setImageSequence(true);
    }
    if (typeof exports.parsedCli.crf !== 'undefined') {
        remotion_1.Config.Output.setCrf(exports.parsedCli.crf);
    }
    if (exports.parsedCli.codec) {
        remotion_1.Config.Output.setCodec(exports.parsedCli.codec);
    }
    if (exports.parsedCli['every-nth-frame']) {
        remotion_1.Config.Rendering.setEveryNthFrame(exports.parsedCli['every-nth-frame']);
    }
    if (exports.parsedCli.gl) {
        remotion_1.Config.Puppeteer.setChromiumOpenGlRenderer(exports.parsedCli.gl);
    }
    if (exports.parsedCli['prores-profile']) {
        remotion_1.Config.Output.setProResProfile(String(exports.parsedCli['prores-profile']));
    }
    if (exports.parsedCli.overwrite) {
        remotion_1.Config.Output.setOverwriteOutput(exports.parsedCli.overwrite);
    }
    if (typeof exports.parsedCli.quality !== 'undefined') {
        remotion_1.Config.Rendering.setQuality(exports.parsedCli.quality);
    }
    if (typeof exports.parsedCli.scale !== 'undefined') {
        remotion_1.Config.Rendering.setScale(exports.parsedCli.scale);
    }
    if (typeof exports.parsedCli.port !== 'undefined') {
        remotion_1.Config.Bundling.setPort(exports.parsedCli.port);
    }
};
exports.parseCommandLine = parseCommandLine;
const quietFlagProvided = () => exports.parsedCli.quiet || exports.parsedCli.q;
exports.quietFlagProvided = quietFlagProvided;
