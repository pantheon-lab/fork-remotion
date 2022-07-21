"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCommand = exports.RENDER_COMMAND = void 0;
const cli_1 = require("@remotion/cli");
const renderer_1 = require("@remotion/renderer");
const download_media_1 = require("../../../api/download-media");
const get_render_progress_1 = require("../../../api/get-render-progress");
const render_media_on_lambda_1 = require("../../../api/render-media-on-lambda");
const constants_1 = require("../../../shared/constants");
const sleep_1 = require("../../../shared/sleep");
const validate_frames_per_lambda_1 = require("../../../shared/validate-frames-per-lambda");
const validate_privacy_1 = require("../../../shared/validate-privacy");
const validate_retries_1 = require("../../../shared/validate-retries");
const args_1 = require("../../args");
const get_aws_region_1 = require("../../get-aws-region");
const find_function_name_1 = require("../../helpers/find-function-name");
const get_cloudwatch_stream_url_1 = require("../../helpers/get-cloudwatch-stream-url");
const quit_1 = require("../../helpers/quit");
const log_1 = require("../../log");
const progress_1 = require("./progress");
exports.RENDER_COMMAND = 'render';
const renderCommand = async (args) => {
    var _a, _b, _c, _d;
    const serveUrl = args[0];
    if (!serveUrl) {
        log_1.Log.error('No serve URL passed.');
        log_1.Log.info('Pass an additional argument specifying a URL where your Remotion project is hosted.');
        log_1.Log.info();
        log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.RENDER_COMMAND} <serve-url> <composition-id> [output-location]`);
        (0, quit_1.quit)(1);
    }
    const composition = args[1];
    if (!composition) {
        log_1.Log.error('No composition ID passed.');
        log_1.Log.info('Pass an additional argument specifying the composition ID.');
        log_1.Log.info();
        log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.RENDER_COMMAND} <serve-url> <composition-id> [output-location]`);
        (0, quit_1.quit)(1);
    }
    const outName = (_a = args[2]) !== null && _a !== void 0 ? _a : null;
    const { chromiumOptions, codec, crf, envVariables, frameRange, imageFormat, inputProps, logLevel, pixelFormat, proResProfile, puppeteerTimeout, quality, scale, everyNthFrame, numberOfGifLoops, } = await cli_1.CliInternals.getCliOptions({
        type: 'series',
        isLambda: true,
    });
    const functionName = await (0, find_function_name_1.findFunctionName)();
    const region = (0, get_aws_region_1.getAwsRegion)();
    const maxRetries = (_b = args_1.parsedLambdaCli['max-retries']) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_MAX_RETRIES;
    (0, validate_retries_1.validateMaxRetries)(maxRetries);
    const privacy = (_c = args_1.parsedLambdaCli.privacy) !== null && _c !== void 0 ? _c : constants_1.DEFAULT_OUTPUT_PRIVACY;
    (0, validate_privacy_1.validatePrivacy)(privacy);
    const framesPerLambda = (_d = args_1.parsedLambdaCli['frames-per-lambda']) !== null && _d !== void 0 ? _d : undefined;
    (0, validate_frames_per_lambda_1.validateFramesPerLambda)(framesPerLambda);
    const res = await (0, render_media_on_lambda_1.renderMediaOnLambda)({
        functionName,
        serveUrl,
        inputProps,
        codec: codec,
        imageFormat,
        crf: crf !== null && crf !== void 0 ? crf : undefined,
        envVariables,
        pixelFormat,
        proResProfile,
        quality,
        region,
        maxRetries,
        composition,
        framesPerLambda,
        privacy,
        logLevel,
        frameRange: frameRange !== null && frameRange !== void 0 ? frameRange : undefined,
        outName: args_1.parsedLambdaCli['out-name'],
        timeoutInMilliseconds: puppeteerTimeout,
        chromiumOptions,
        scale,
        numberOfGifLoops,
        everyNthFrame,
        concurrencyPerLambda: args_1.parsedLambdaCli['concurrency-per-lambda'],
    });
    const totalSteps = outName ? 5 : 4;
    const progressBar = cli_1.CliInternals.createOverwriteableCliOutput(cli_1.CliInternals.quietFlagProvided());
    log_1.Log.info(cli_1.CliInternals.chalk.gray(`Bucket = ${res.bucketName}, renderId = ${res.renderId}, functionName = ${functionName}`));
    log_1.Log.verbose(`CloudWatch logs (if enabled): ${(0, get_cloudwatch_stream_url_1.getCloudwatchStreamUrl)({
        functionName,
        region,
        renderId: res.renderId,
        method: constants_1.LambdaRoutines.renderer,
    })}`);
    const status = await (0, get_render_progress_1.getRenderProgress)({
        functionName,
        bucketName: res.bucketName,
        renderId: res.renderId,
        region: (0, get_aws_region_1.getAwsRegion)(),
    });
    const multiProgress = (0, progress_1.makeMultiProgressFromStatus)(status);
    progressBar.update((0, progress_1.makeProgressString)({
        progress: multiProgress,
        steps: totalSteps,
        downloadInfo: null,
        retriesInfo: status.retriesInfo,
    }));
    // eslint-disable-next-line no-constant-condition
    while (true) {
        await (0, sleep_1.sleep)(1000);
        const newStatus = await (0, get_render_progress_1.getRenderProgress)({
            functionName,
            bucketName: res.bucketName,
            renderId: res.renderId,
            region: (0, get_aws_region_1.getAwsRegion)(),
        });
        const newProgress = (0, progress_1.makeMultiProgressFromStatus)(newStatus);
        progressBar.update((0, progress_1.makeProgressString)({
            progress: newProgress,
            steps: totalSteps,
            retriesInfo: newStatus.retriesInfo,
            downloadInfo: null,
        }));
        if (newStatus.done) {
            progressBar.update((0, progress_1.makeProgressString)({
                progress: newProgress,
                steps: totalSteps,
                downloadInfo: null,
                retriesInfo: newStatus.retriesInfo,
            }));
            if (outName) {
                const downloadStart = Date.now();
                const { outputPath, sizeInBytes } = await (0, download_media_1.downloadMedia)({
                    bucketName: res.bucketName,
                    outPath: outName,
                    region: (0, get_aws_region_1.getAwsRegion)(),
                    renderId: res.renderId,
                    onProgress: ({ downloaded, totalSize }) => {
                        progressBar.update((0, progress_1.makeProgressString)({
                            progress: newProgress,
                            steps: totalSteps,
                            retriesInfo: newStatus.retriesInfo,
                            downloadInfo: {
                                doneIn: null,
                                downloaded,
                                totalSize,
                            },
                        }));
                    },
                });
                progressBar.update((0, progress_1.makeProgressString)({
                    progress: newProgress,
                    steps: totalSteps,
                    retriesInfo: newStatus.retriesInfo,
                    downloadInfo: {
                        doneIn: Date.now() - downloadStart,
                        downloaded: sizeInBytes,
                        totalSize: sizeInBytes,
                    },
                }));
                log_1.Log.info();
                log_1.Log.info();
                log_1.Log.info('Done!', outputPath, cli_1.CliInternals.formatBytes(sizeInBytes));
            }
            else {
                log_1.Log.info();
                log_1.Log.info();
                log_1.Log.info('Done! ' + newStatus.outputFile);
            }
            log_1.Log.info([
                newStatus.renderMetadata
                    ? `${newStatus.renderMetadata.estimatedTotalLambdaInvokations} λ's used`
                    : null,
                newStatus.timeToFinish
                    ? `${(newStatus.timeToFinish / 1000).toFixed(2)}sec`
                    : null,
                `Estimated cost $${newStatus.costs.displayCost}`,
            ]
                .filter(Boolean)
                .join(', '));
            if (newStatus.mostExpensiveFrameRanges) {
                log_1.Log.verbose('Most expensive frame ranges:');
                log_1.Log.verbose(newStatus.mostExpensiveFrameRanges
                    .map((f) => {
                    return `${f.frameRange[0]}-${f.frameRange[1]} (${f.timeInMilliseconds}ms)`;
                })
                    .join(', '));
            }
            (0, quit_1.quit)(0);
        }
        if (newStatus.fatalErrorEncountered) {
            log_1.Log.error('\n');
            for (const err of newStatus.errors) {
                if (err.explanation) {
                    log_1.Log.error(err.explanation);
                }
                const frames = renderer_1.RenderInternals.parseStack(err.stack.split('\n'));
                const errorWithStackFrame = new renderer_1.RenderInternals.SymbolicateableError({
                    message: err.message,
                    frame: err.frame,
                    name: err.name,
                    stack: err.stack,
                    stackFrame: frames,
                });
                await cli_1.CliInternals.handleCommonError(errorWithStackFrame);
            }
            (0, quit_1.quit)(1);
        }
    }
};
exports.renderCommand = renderCommand;
