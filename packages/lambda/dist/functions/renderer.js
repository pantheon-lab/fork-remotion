"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rendererHandler = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const renderer_1 = require("@remotion/renderer");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const aws_clients_1 = require("../shared/aws-clients");
const constants_1 = require("../shared/constants");
const clean_tmpdir_1 = require("./helpers/clean-tmpdir");
const get_browser_instance_1 = require("./helpers/get-browser-instance");
const get_current_region_1 = require("./helpers/get-current-region");
const get_files_in_folder_1 = require("./helpers/get-files-in-folder");
const get_folder_size_1 = require("./helpers/get-folder-size");
const io_1 = require("./helpers/io");
const write_lambda_error_1 = require("./helpers/write-lambda-error");
const renderHandler = async (params, options, logs) => {
    var _a, _b;
    if (params.type !== constants_1.LambdaRoutines.renderer) {
        throw new Error('Params must be renderer');
    }
    remotion_1.Internals.Logging.setLogLevel(params.logLevel);
    const browserInstance = await (0, get_browser_instance_1.getBrowserInstance)(remotion_1.Internals.Logging.isEqualOrBelowLogLevel(params.logLevel, 'verbose'), (_a = params.chromiumOptions) !== null && _a !== void 0 ? _a : {});
    const outputPath = renderer_1.RenderInternals.tmpDir('remotion-render-');
    if (typeof params.chunk !== 'number') {
        throw new Error('must pass chunk');
    }
    if (!params.frameRange) {
        throw new Error('must pass framerange');
    }
    const start = Date.now();
    const chunkTimingData = {
        timings: {},
        chunk: params.chunk,
        frameRange: params.frameRange,
        startDate: start,
    };
    const outdir = renderer_1.RenderInternals.tmpDir(constants_1.RENDERER_PATH_TOKEN);
    const outputLocation = path_1.default.join(outdir, `localchunk-${String(params.chunk).padStart(8, '0')}.${renderer_1.RenderInternals.getFileExtensionFromCodec(params.codec, 'chunk')}`);
    const chunkCodec = params.codec === 'gif' ? 'h264-mkv' : params.codec;
    await (0, renderer_1.renderMedia)({
        composition: {
            id: params.composition,
            durationInFrames: params.durationInFrames,
            fps: params.fps,
            height: params.height,
            width: params.width,
        },
        imageFormat: params.imageFormat,
        inputProps: params.inputProps,
        frameRange: params.frameRange,
        onProgress: ({ renderedFrames, encodedFrames, stitchStage }) => {
            if (renderedFrames % 10 === 0 &&
                remotion_1.Internals.Logging.isEqualOrBelowLogLevel(params.logLevel, 'verbose')) {
                console.log(`Rendered ${renderedFrames} frames, encoded ${encodedFrames} frames, stage = ${stitchStage}`);
            }
            const allFrames = renderer_1.RenderInternals.getFramesToRender(params.frameRange, params.everyNthFrame);
            if (renderedFrames === allFrames.length) {
                console.log('Rendered all frames!');
            }
            chunkTimingData.timings[renderedFrames] = Date.now() - start;
        },
        parallelism: params.concurrencyPerLambda,
        onStart: () => {
            (0, io_1.lambdaWriteFile)({
                privacy: 'private',
                bucketName: params.bucketName,
                body: JSON.stringify({
                    filesCleaned: clean_tmpdir_1.deletedFilesSize,
                    filesInTmp: fs_1.default.readdirSync('/tmp'),
                    isWarm: options.isWarm,
                    deletedFiles: clean_tmpdir_1.deletedFiles,
                    tmpSize: (0, get_folder_size_1.getFolderSizeRecursively)('/tmp'),
                    tmpDirFiles: (0, get_files_in_folder_1.getFolderFiles)('/tmp'),
                }),
                key: (0, constants_1.lambdaInitializedKey)({
                    renderId: params.renderId,
                    chunk: params.chunk,
                    attempt: params.attempt,
                }),
                region: (0, get_current_region_1.getCurrentRegionInFunction)(),
                expectedBucketOwner: options.expectedBucketOwner,
                downloadBehavior: null,
            });
        },
        puppeteerInstance: browserInstance,
        serveUrl: params.serveUrl,
        quality: params.quality,
        envVariables: params.envVariables,
        dumpBrowserLogs: remotion_1.Internals.Logging.isEqualOrBelowLogLevel(params.logLevel, 'verbose'),
        onBrowserLog: (log) => {
            logs.push(log);
        },
        outputLocation,
        codec: chunkCodec,
        crf: (_b = params.crf) !== null && _b !== void 0 ? _b : undefined,
        ffmpegExecutable: process.env.NODE_ENV === 'test' ? null : '/opt/bin/ffmpeg',
        pixelFormat: params.pixelFormat,
        proResProfile: params.proResProfile,
        onDownload: (src) => {
            console.log('Downloading', src);
            return () => undefined;
        },
        overwrite: false,
        chromiumOptions: params.chromiumOptions,
        scale: params.scale,
        timeoutInMilliseconds: params.timeoutInMilliseconds,
        port: null,
        everyNthFrame: params.everyNthFrame,
        numberOfGifLoops: null,
    });
    const endRendered = Date.now();
    console.log('Adding silent audio, chunk', params.chunk);
    const condensedTimingData = {
        ...chunkTimingData,
        timings: Object.values(chunkTimingData.timings),
    };
    await (0, io_1.lambdaWriteFile)({
        bucketName: params.bucketName,
        key: (0, constants_1.chunkKeyForIndex)({
            renderId: params.renderId,
            index: params.chunk,
        }),
        body: fs_1.default.createReadStream(outputLocation),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        privacy: params.privacy,
        expectedBucketOwner: options.expectedBucketOwner,
        downloadBehavior: null,
    });
    await Promise.all([
        fs_1.default.promises.rm(outputLocation, { recursive: true }),
        fs_1.default.promises.rm(outputPath, { recursive: true }),
        (0, io_1.lambdaWriteFile)({
            bucketName: params.bucketName,
            body: JSON.stringify(condensedTimingData, null, 2),
            key: (0, constants_1.lambdaTimingsKey)({
                renderId: params.renderId,
                chunk: params.chunk,
                rendered: endRendered,
                start,
            }),
            region: (0, get_current_region_1.getCurrentRegionInFunction)(),
            privacy: 'private',
            expectedBucketOwner: options.expectedBucketOwner,
            downloadBehavior: null,
        }),
    ]);
};
const rendererHandler = async (params, options) => {
    if (params.type !== constants_1.LambdaRoutines.renderer) {
        throw new Error('Params must be renderer');
    }
    const logs = [];
    try {
        await renderHandler(params, options, logs);
    }
    catch (err) {
        // If this error is encountered, we can just retry as it
        // is a very rare error to occur
        const isBrowserError = err.message.includes('FATAL:zygote_communication_linux.cc') ||
            err.message.includes('error while loading shared libraries: libnss3.so');
        const willRetry = isBrowserError || params.retriesLeft > 0;
        console.log('Error occurred');
        console.log(err);
        await (0, write_lambda_error_1.writeLambdaError)({
            bucketName: params.bucketName,
            errorInfo: {
                name: err.name,
                message: err.message,
                stack: err.stack,
                chunk: params.chunk,
                frame: null,
                type: 'renderer',
                isFatal: !isBrowserError,
                tmpDir: (0, write_lambda_error_1.getTmpDirStateIfENoSp)(err.stack),
                attempt: params.attempt,
                totalAttempts: params.retriesLeft + params.attempt,
                willRetry,
            },
            renderId: params.renderId,
            expectedBucketOwner: options.expectedBucketOwner,
        });
        if (willRetry) {
            const retryPayload = {
                ...params,
                retriesLeft: params.retriesLeft - 1,
                attempt: params.attempt + 1,
            };
            await (0, aws_clients_1.getLambdaClient)((0, get_current_region_1.getCurrentRegionInFunction)()).send(new client_lambda_1.InvokeCommand({
                FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
                // @ts-expect-error
                Payload: JSON.stringify(retryPayload),
                InvocationType: 'Event',
            }));
        }
    }
};
exports.rendererHandler = rendererHandler;
