"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const renderer_1 = require("@remotion/renderer");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
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
const validate_ffmpeg_version_1 = require("./validate-ffmpeg-version");
const render = async () => {
    const startTime = Date.now();
    const file = parse_command_line_1.parsedCli._[1];
    if (!file) {
        log_1.Log.error('No entry point specified. Pass more arguments:');
        log_1.Log.error('   npx remotion render [entry-point] [composition-name] [out-name]');
        log_1.Log.error('Documentation: https://www.remotion.dev/docs/render');
        process.exit(1);
    }
    const fullPath = renderer_1.RenderInternals.isServeUrl(file)
        ? file
        : path_1.default.join(process.cwd(), file);
    await (0, initialize_render_cli_1.initializeRenderCli)('sequence');
    const { codec, proResProfile, parallelism, frameRange, shouldOutputImageSequence, absoluteOutputFile, overwrite, inputProps, envVariables, quality, browser, crf, pixelFormat, imageFormat, browserExecutable, ffmpegExecutable, ffprobeExecutable, scale, chromiumOptions, port, numberOfGifLoops, everyNthFrame, puppeteerTimeout, } = await (0, get_cli_options_1.getCliOptions)({ isLambda: false, type: 'series' });
    if (!absoluteOutputFile) {
        throw new Error('assertion error - expected absoluteOutputFile to not be null');
    }
    log_1.Log.verbose('Browser executable: ', browserExecutable);
    await (0, validate_ffmpeg_version_1.checkAndValidateFfmpegVersion)({
        ffmpegExecutable,
    });
    const browserInstance = (0, renderer_1.openBrowser)(browser, {
        browserExecutable,
        shouldDumpIo: remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose'),
        chromiumOptions,
        forceDeviceScaleFactor: scale,
    });
    const steps = [
        renderer_1.RenderInternals.isServeUrl(fullPath) ? null : 'bundling',
        'rendering',
        shouldOutputImageSequence ? null : 'stitching',
    ].filter(remotion_1.Internals.truthy);
    const urlOrBundle = renderer_1.RenderInternals.isServeUrl(fullPath)
        ? fullPath
        : await (0, setup_cache_1.bundleOnCli)({ fullPath, steps });
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
        updateRenderProgress();
        return ({ percent, downloaded, totalSize }) => {
            download.progress = percent;
            download.totalBytes = totalSize;
            download.downloaded = downloaded;
            updateRenderProgress();
        };
    };
    const puppeteerInstance = await browserInstance;
    const comps = await (0, renderer_1.getCompositions)(urlOrBundle, {
        inputProps,
        puppeteerInstance,
        envVariables,
        timeoutInMilliseconds: remotion_1.Internals.getCurrentPuppeteerTimeout(),
        chromiumOptions,
        browserExecutable,
    });
    const compositionId = (0, get_composition_id_1.getCompositionId)(comps);
    const config = comps.find((c) => c.id === compositionId);
    if (!config) {
        throw new Error(`Cannot find composition with ID ${compositionId}`);
    }
    renderer_1.RenderInternals.validateEvenDimensionsWithCodec({
        width: config.width,
        height: config.height,
        codec,
        scale,
    });
    const outputDir = shouldOutputImageSequence
        ? absoluteOutputFile
        : await fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'react-motion-render'));
    log_1.Log.verbose('Output dir', outputDir);
    const renderProgress = (0, progress_bar_1.createOverwriteableCliOutput)((0, parse_command_line_1.quietFlagProvided)());
    const realFrameRange = renderer_1.RenderInternals.getRealFrameRange(config.durationInFrames, frameRange);
    const totalFrames = renderer_1.RenderInternals.getFramesToRender(realFrameRange, everyNthFrame);
    let encodedFrames = 0;
    let renderedFrames = 0;
    let encodedDoneIn = null;
    let renderedDoneIn = null;
    let stitchStage = 'encoding';
    const downloads = [];
    const updateRenderProgress = () => {
        if (totalFrames.length === 0) {
            throw new Error('totalFrames should not be 0');
        }
        return renderProgress.update((0, progress_bar_1.makeRenderingAndStitchingProgress)({
            rendering: {
                frames: renderedFrames,
                totalFrames: totalFrames.length,
                concurrency: renderer_1.RenderInternals.getActualConcurrency(parallelism),
                doneIn: renderedDoneIn,
                steps,
            },
            stitching: shouldOutputImageSequence
                ? null
                : {
                    doneIn: encodedDoneIn,
                    frames: encodedFrames,
                    stage: stitchStage,
                    steps,
                    totalFrames: totalFrames.length,
                    codec,
                },
            downloads,
        }));
    };
    if (shouldOutputImageSequence) {
        fs_1.default.mkdirSync(absoluteOutputFile, {
            recursive: true,
        });
        if (imageFormat === 'none') {
            log_1.Log.error('Cannot render an image sequence with a codec that renders no images.');
            log_1.Log.error(`codec = ${codec}, imageFormat = ${imageFormat}`);
            process.exit(1);
        }
        await (0, renderer_1.renderFrames)({
            config,
            imageFormat,
            inputProps,
            onFrameUpdate: (rendered) => {
                renderedFrames = rendered;
                updateRenderProgress();
            },
            onStart: () => undefined,
            onDownload: (src) => {
                if (src.startsWith('data:')) {
                    log_1.Log.info('\nWriting Data URL to file: ', src.substring(0, 30) + '...');
                }
                else {
                    log_1.Log.info('\nDownloading asset... ', src);
                }
            },
            outputDir,
            serveUrl: urlOrBundle,
            dumpBrowserLogs: remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose'),
            everyNthFrame,
            envVariables,
            frameRange,
            parallelism,
            puppeteerInstance,
            quality,
            timeoutInMilliseconds: puppeteerTimeout,
            chromiumOptions,
            scale,
            ffmpegExecutable,
            ffprobeExecutable,
            browserExecutable,
            port,
        });
        renderedDoneIn = Date.now() - startTime;
        updateRenderProgress();
        log_1.Log.info();
        log_1.Log.info();
        log_1.Log.info(chalk_1.chalk.green('\nYour image sequence is ready!'));
        return;
    }
    await (0, renderer_1.renderMedia)({
        outputLocation: absoluteOutputFile,
        codec,
        composition: config,
        crf,
        envVariables,
        ffmpegExecutable,
        ffprobeExecutable,
        frameRange,
        imageFormat,
        inputProps,
        onProgress: (update) => {
            encodedDoneIn = update.encodedDoneIn;
            encodedFrames = update.encodedFrames;
            renderedDoneIn = update.renderedDoneIn;
            stitchStage = update.stitchStage;
            renderedFrames = update.renderedFrames;
            updateRenderProgress();
        },
        puppeteerInstance,
        overwrite,
        parallelism,
        pixelFormat,
        proResProfile,
        quality,
        serveUrl: urlOrBundle,
        onDownload,
        dumpBrowserLogs: remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose'),
        chromiumOptions,
        timeoutInMilliseconds: remotion_1.Internals.getCurrentPuppeteerTimeout(),
        scale,
        port,
        numberOfGifLoops,
        everyNthFrame,
    });
    log_1.Log.info();
    log_1.Log.info();
    const seconds = Math.round((Date.now() - startTime) / 1000);
    log_1.Log.info([
        '- Total render time:',
        seconds,
        seconds === 1 ? 'second' : 'seconds',
    ].join(' '));
    log_1.Log.info('-', 'Output can be found at:');
    log_1.Log.info(chalk_1.chalk.cyan(`▶ ${absoluteOutputFile}`));
    log_1.Log.verbose('Cleaning up...');
    try {
        await renderer_1.RenderInternals.deleteDirectory(urlOrBundle);
    }
    catch (err) {
        log_1.Log.warn('Could not clean up directory.');
        log_1.Log.warn(err);
        log_1.Log.warn('Do you have minimum required Node.js version?');
    }
    log_1.Log.info(chalk_1.chalk.green(`\nYour ${codec === 'gif' ? 'GIF' : 'video'} is ready!`));
    if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose')) {
        remotion_1.Internals.perf.logPerf();
    }
};
exports.render = render;
