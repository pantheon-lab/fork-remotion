"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.still = void 0;
const renderer_1 = require("@remotion/renderer");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const chalk_1 = require("./chalk");
const get_cli_options_1 = require("./get-cli-options");
const get_composition_id_1 = require("./get-composition-id");
const initialize_render_cli_1 = require("./initialize-render-cli");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const progress_bar_1 = require("./progress-bar");
const setup_cache_1 = require("./setup-cache");
const user_passed_output_location_1 = require("./user-passed-output-location");
const still = async () => {
    const startTime = Date.now();
    const file = parse_command_line_1.parsedCli._[1];
    const fullPath = renderer_1.RenderInternals.isServeUrl(file)
        ? file
        : path_1.default.join(process.cwd(), file);
    await (0, initialize_render_cli_1.initializeRenderCli)('still');
    const userOutput = path_1.default.resolve(process.cwd(), (0, user_passed_output_location_1.getUserPassedOutputLocation)());
    if (userOutput.endsWith('.jpeg') || userOutput.endsWith('.jpg')) {
        log_1.Log.verbose('Output file has a JPEG extension, therefore setting the image format to JPEG.');
        remotion_1.Config.Rendering.setImageFormat('jpeg');
    }
    if (userOutput.endsWith('.png')) {
        log_1.Log.verbose('Output file has a PNG extension, therefore setting the image format to PNG.');
        remotion_1.Config.Rendering.setImageFormat('png');
    }
    const { inputProps, envVariables, quality, browser, imageFormat, stillFrame, browserExecutable, chromiumOptions, scale, ffmpegExecutable, ffprobeExecutable, overwrite, puppeteerTimeout, port, } = await (0, get_cli_options_1.getCliOptions)({ isLambda: false, type: 'still' });
    log_1.Log.verbose('Browser executable: ', browserExecutable);
    if (imageFormat === 'none') {
        log_1.Log.error('No image format was selected - this is probably an error in Remotion - please post your command on Github Issues for help.');
        process.exit(1);
    }
    if (imageFormat === 'png' && !userOutput.endsWith('.png')) {
        log_1.Log.warn(`Rendering a PNG, expected a .png extension but got ${userOutput}`);
    }
    if (imageFormat === 'jpeg' &&
        !userOutput.endsWith('.jpg') &&
        !userOutput.endsWith('.jpeg')) {
        log_1.Log.warn(`Rendering a JPEG, expected a .jpg or .jpeg extension but got ${userOutput}`);
    }
    const browserInstance = (0, renderer_1.openBrowser)(browser, {
        browserExecutable,
        chromiumOptions,
        shouldDumpIo: remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose'),
        forceDeviceScaleFactor: scale,
    });
    (0, fs_1.mkdirSync)(path_1.default.join(userOutput, '..'), {
        recursive: true,
    });
    const steps = [
        renderer_1.RenderInternals.isServeUrl(fullPath) ? null : 'bundling',
        'rendering',
    ].filter(remotion_1.Internals.truthy);
    const urlOrBundle = renderer_1.RenderInternals.isServeUrl(fullPath)
        ? Promise.resolve(fullPath)
        : await (0, setup_cache_1.bundleOnCli)({ fullPath, steps });
    const puppeteerInstance = await browserInstance;
    const comps = await (0, renderer_1.getCompositions)(await urlOrBundle, {
        inputProps,
        puppeteerInstance,
        envVariables,
        timeoutInMilliseconds: puppeteerTimeout,
        chromiumOptions,
        port,
        browserExecutable,
        ffmpegExecutable,
        ffprobeExecutable,
    });
    const compositionId = (0, get_composition_id_1.getCompositionId)(comps);
    const composition = comps.find((c) => c.id === compositionId);
    if (!composition) {
        throw new Error(`Cannot find composition with ID ${compositionId}`);
    }
    const renderProgress = (0, progress_bar_1.createOverwriteableCliOutput)((0, parse_command_line_1.quietFlagProvided)());
    const renderStart = Date.now();
    const downloads = [];
    let frames = 0;
    const totalFrames = 1;
    const updateProgress = () => {
        renderProgress.update((0, progress_bar_1.makeRenderingAndStitchingProgress)({
            rendering: {
                frames,
                concurrency: 1,
                doneIn: frames === totalFrames ? Date.now() - renderStart : null,
                steps,
                totalFrames,
            },
            downloads,
            stitching: null,
        }));
    };
    updateProgress();
    const onDownload = (src) => {
        const id = Math.random();
        const download = {
            id,
            name: src,
            progress: 0,
            downloaded: 0,
            totalBytes: null,
        };
        downloads.push(download);
        updateProgress();
        return ({ percent }) => {
            download.progress = percent;
            updateProgress();
        };
    };
    await (0, renderer_1.renderStill)({
        composition,
        frame: stillFrame,
        output: userOutput,
        serveUrl: await urlOrBundle,
        quality,
        dumpBrowserLogs: remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose'),
        envVariables,
        imageFormat,
        inputProps,
        chromiumOptions,
        timeoutInMilliseconds: remotion_1.Internals.getCurrentPuppeteerTimeout(),
        scale,
        ffmpegExecutable,
        browserExecutable,
        overwrite,
        onDownload,
    });
    frames = 1;
    updateProgress();
    log_1.Log.info();
    const closeBrowserPromise = puppeteerInstance.close();
    log_1.Log.info(chalk_1.chalk.green('\nYour still frame is ready!'));
    const seconds = Math.round((Date.now() - startTime) / 1000);
    log_1.Log.info([
        '- Total render time:',
        seconds,
        seconds === 1 ? 'second' : 'seconds',
    ].join(' '));
    log_1.Log.info('-', 'Output can be found at:');
    log_1.Log.info(chalk_1.chalk.cyan(`▶️ ${userOutput}`));
    await closeBrowserPromise;
};
exports.still = still;
