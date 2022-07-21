"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchHandler = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const renderer_1 = require("@remotion/renderer");
const fs_1 = __importDefault(require("fs"));
const remotion_1 = require("remotion");
const aws_clients_1 = require("../shared/aws-clients");
const constants_1 = require("../shared/constants");
const docs_url_1 = require("../shared/docs-url");
const make_s3_url_1 = require("../shared/make-s3-url");
const validate_frames_per_lambda_1 = require("../shared/validate-frames-per-lambda");
const validate_outname_1 = require("../shared/validate-outname");
const validate_privacy_1 = require("../shared/validate-privacy");
const collect_data_1 = require("./chunk-optimization/collect-data");
const get_frame_ranges_from_profile_1 = require("./chunk-optimization/get-frame-ranges-from-profile");
const get_profile_duration_1 = require("./chunk-optimization/get-profile-duration");
const is_valid_profile_1 = require("./chunk-optimization/is-valid-profile");
const optimize_invocation_order_1 = require("./chunk-optimization/optimize-invocation-order");
const optimize_profile_1 = require("./chunk-optimization/optimize-profile");
const plan_frame_ranges_1 = require("./chunk-optimization/plan-frame-ranges");
const s3_optimization_file_1 = require("./chunk-optimization/s3-optimization-file");
const best_frames_per_lambda_param_1 = require("./helpers/best-frames-per-lambda-param");
const concat_videos_1 = require("./helpers/concat-videos");
const create_post_render_data_1 = require("./helpers/create-post-render-data");
const delete_chunks_1 = require("./helpers/delete-chunks");
const expected_out_name_1 = require("./helpers/expected-out-name");
const get_browser_instance_1 = require("./helpers/get-browser-instance");
const get_current_region_1 = require("./helpers/get-current-region");
const get_files_to_delete_1 = require("./helpers/get-files-to-delete");
const get_lambdas_invoked_stats_1 = require("./helpers/get-lambdas-invoked-stats");
const get_output_url_from_metadata_1 = require("./helpers/get-output-url-from-metadata");
const inspect_errors_1 = require("./helpers/inspect-errors");
const io_1 = require("./helpers/io");
const timer_1 = require("./helpers/timer");
const validate_composition_1 = require("./helpers/validate-composition");
const write_lambda_error_1 = require("./helpers/write-lambda-error");
const write_post_render_data_1 = require("./helpers/write-post-render-data");
const innerLaunchHandler = async (params, options) => {
    var _a, _b;
    if (params.type !== constants_1.LambdaRoutines.launch) {
        throw new Error('Expected launch type');
    }
    const startedDate = Date.now();
    const [browserInstance, optimization] = await Promise.all([
        (0, get_browser_instance_1.getBrowserInstance)(remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose'), params.chromiumOptions),
        (0, s3_optimization_file_1.getOptimization)({
            bucketName: params.bucketName,
            siteId: (0, make_s3_url_1.getServeUrlHash)(params.serveUrl),
            compositionId: params.composition,
            region: (0, get_current_region_1.getCurrentRegionInFunction)(),
            expectedBucketOwner: options.expectedBucketOwner,
        }),
    ]);
    const comp = await (0, validate_composition_1.validateComposition)({
        serveUrl: params.serveUrl,
        composition: params.composition,
        browserInstance,
        inputProps: params.inputProps,
        envVariables: params.envVariables,
        ffmpegExecutable: null,
        ffprobeExecutable: null,
        timeoutInMilliseconds: params.timeoutInMilliseconds,
        chromiumOptions: params.chromiumOptions,
        port: null,
    });
    remotion_1.Internals.validateDurationInFrames(comp.durationInFrames, 'passed to <Component />');
    remotion_1.Internals.validateFps(comp.fps, 'passed to <Component />', null);
    remotion_1.Internals.validateDimension(comp.height, 'height', 'passed to <Component />');
    remotion_1.Internals.validateDimension(comp.width, 'width', 'passed to <Component />');
    renderer_1.RenderInternals.validateConcurrency(params.concurrencyPerLambda, 'concurrencyPerLambda');
    const realFrameRange = renderer_1.RenderInternals.getRealFrameRange(comp.durationInFrames, params.frameRange);
    const frameCount = renderer_1.RenderInternals.getFramesToRender(realFrameRange, params.everyNthFrame);
    const framesPerLambda = (_a = params.framesPerLambda) !== null && _a !== void 0 ? _a : (0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(frameCount.length);
    (0, validate_frames_per_lambda_1.validateFramesPerLambda)(framesPerLambda);
    const chunkCount = Math.ceil(frameCount.length / framesPerLambda);
    if (chunkCount > constants_1.MAX_FUNCTIONS_PER_RENDER) {
        throw new Error(`Too many functions: This render would cause ${chunkCount} functions to spawn. We limit this amount to ${constants_1.MAX_FUNCTIONS_PER_RENDER} functions as more would result in diminishing returns. Values set: frameCount = ${frameCount}, framesPerLambda=${framesPerLambda}. See ${docs_url_1.DOCS_URL}/docs/lambda/concurrency for how this parameter is calculated.`);
    }
    (0, validate_outname_1.validateOutname)(params.outName);
    (0, validate_privacy_1.validatePrivacy)(params.privacy);
    renderer_1.RenderInternals.validatePuppeteerTimeout(params.timeoutInMilliseconds);
    const { chunks, didUseOptimization } = (0, plan_frame_ranges_1.planFrameRanges)({
        framesPerLambda,
        optimization,
        // TODO: Re-enable chunk optimization later
        shouldUseOptimization: false,
        frameRange: realFrameRange,
        everyNthFrame: params.everyNthFrame,
    });
    const sortedChunks = chunks.slice().sort((a, b) => a[0] - b[0]);
    const invokers = Math.round(Math.sqrt(chunks.length));
    const reqSend = (0, timer_1.timer)('sending off requests');
    const lambdaPayloads = chunks.map((chunkPayload) => {
        var _a;
        const payload = {
            type: constants_1.LambdaRoutines.renderer,
            frameRange: chunkPayload,
            serveUrl: params.serveUrl,
            chunk: sortedChunks.indexOf(chunkPayload),
            composition: params.composition,
            fps: comp.fps,
            height: comp.height,
            width: comp.width,
            durationInFrames: comp.durationInFrames,
            bucketName: params.bucketName,
            retriesLeft: params.maxRetries,
            inputProps: params.inputProps,
            renderId: params.renderId,
            imageFormat: params.imageFormat,
            codec: params.codec === 'h264' ? 'h264-mkv' : params.codec,
            crf: params.crf,
            envVariables: params.envVariables,
            pixelFormat: params.pixelFormat,
            proResProfile: params.proResProfile,
            quality: params.quality,
            privacy: params.privacy,
            logLevel: (_a = params.logLevel) !== null && _a !== void 0 ? _a : remotion_1.Internals.Logging.DEFAULT_LOG_LEVEL,
            attempt: 1,
            timeoutInMilliseconds: params.timeoutInMilliseconds,
            chromiumOptions: params.chromiumOptions,
            scale: params.scale,
            everyNthFrame: params.everyNthFrame,
            concurrencyPerLambda: params.concurrencyPerLambda,
        };
        return payload;
    });
    const renderMetadata = {
        startedDate,
        videoConfig: comp,
        totalChunks: chunks.length,
        estimatedTotalLambdaInvokations: [
            // Direct invokations
            chunks.length,
            // Parent invokers
            invokers,
            // This function
        ].reduce((a, b) => a + b, 0),
        estimatedRenderLambdaInvokations: chunks.length,
        compositionId: comp.id,
        siteId: (0, make_s3_url_1.getServeUrlHash)(params.serveUrl),
        codec: params.codec,
        usesOptimizationProfile: didUseOptimization,
        type: 'video',
        imageFormat: params.imageFormat,
        inputProps: params.inputProps,
        lambdaVersion: constants_1.CURRENT_VERSION,
        framesPerLambda,
        memorySizeInMb: Number(process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        renderId: params.renderId,
        outName: (_b = params.outName) !== null && _b !== void 0 ? _b : undefined,
    };
    await (0, io_1.lambdaWriteFile)({
        bucketName: params.bucketName,
        key: (0, constants_1.renderMetadataKey)(params.renderId),
        body: JSON.stringify(renderMetadata),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        privacy: 'private',
        expectedBucketOwner: options.expectedBucketOwner,
        downloadBehavior: null,
    });
    await Promise.all(lambdaPayloads.map(async (payload, index) => {
        const callingLambdaTimer = (0, timer_1.timer)('Calling chunk ' + index);
        await (0, aws_clients_1.getLambdaClient)((0, get_current_region_1.getCurrentRegionInFunction)()).send(new client_lambda_1.InvokeCommand({
            FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
            // @ts-expect-error
            Payload: JSON.stringify(payload),
            InvocationType: 'Event',
        }), {});
        callingLambdaTimer.end();
    }));
    reqSend.end();
    let lastProgressUploaded = 0;
    let encodingStop = null;
    const onProgress = (framesEncoded, start) => {
        const relativeProgress = framesEncoded / frameCount.length;
        const deltaSinceLastProgressUploaded = relativeProgress - lastProgressUploaded;
        if (relativeProgress === 1) {
            encodingStop = Date.now();
        }
        if (deltaSinceLastProgressUploaded < 0.1) {
            return;
        }
        lastProgressUploaded = relativeProgress;
        const encodingProgress = {
            framesEncoded,
            totalFrames: frameCount.length,
            doneIn: encodingStop ? encodingStop - start : null,
            timeToInvoke: null,
        };
        (0, io_1.lambdaWriteFile)({
            bucketName: params.bucketName,
            key: (0, constants_1.encodingProgressKey)(params.renderId),
            body: JSON.stringify(encodingProgress),
            region: (0, get_current_region_1.getCurrentRegionInFunction)(),
            privacy: 'private',
            expectedBucketOwner: options.expectedBucketOwner,
            downloadBehavior: null,
        }).catch((err) => {
            (0, write_lambda_error_1.writeLambdaError)({
                bucketName: params.bucketName,
                errorInfo: {
                    chunk: null,
                    frame: null,
                    isFatal: false,
                    name: err.name,
                    message: err.message,
                    stack: `Could not upload stitching progress ${err.stack}`,
                    tmpDir: null,
                    type: 'stitcher',
                    attempt: 1,
                    totalAttempts: 1,
                    willRetry: false,
                },
                renderId: params.renderId,
                expectedBucketOwner: options.expectedBucketOwner,
            });
        });
    };
    const fps = comp.fps / params.everyNthFrame;
    const { outfile, cleanupChunksProm, encodingStart } = await (0, concat_videos_1.concatVideosS3)({
        bucket: params.bucketName,
        expectedFiles: chunkCount,
        onProgress,
        numberOfFrames: frameCount.length,
        renderId: params.renderId,
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        codec: params.codec,
        expectedBucketOwner: options.expectedBucketOwner,
        fps,
        numberOfGifLoops: params.numberOfGifLoops,
    });
    if (!encodingStop) {
        encodingStop = Date.now();
    }
    const { key, renderBucketName } = (0, expected_out_name_1.getExpectedOutName)(renderMetadata, params.bucketName);
    const outputSize = fs_1.default.statSync(outfile);
    await (0, io_1.lambdaWriteFile)({
        bucketName: renderBucketName,
        key,
        body: fs_1.default.createReadStream(outfile),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        privacy: params.privacy,
        expectedBucketOwner: options.expectedBucketOwner,
        downloadBehavior: params.downloadBehavior,
    });
    let chunkProm = Promise.resolve();
    // TODO: Enable in a later release
    const enableChunkOptimization = false;
    if (enableChunkOptimization) {
        const chunkData = await (0, collect_data_1.collectChunkInformation)({
            bucketName: params.bucketName,
            renderId: params.renderId,
            region: (0, get_current_region_1.getCurrentRegionInFunction)(),
            expectedBucketOwner: options.expectedBucketOwner,
        });
        const optimizedProfile = (0, optimize_invocation_order_1.optimizeInvocationOrder)((0, optimize_profile_1.optimizeProfileRecursively)(chunkData, 400));
        const optimizedFrameRange = (0, get_frame_ranges_from_profile_1.getFrameRangesFromProfile)(optimizedProfile);
        chunkProm = (0, is_valid_profile_1.isValidOptimizationProfile)(optimizedProfile)
            ? (0, s3_optimization_file_1.writeOptimization)({
                bucketName: params.bucketName,
                optimization: {
                    ranges: optimizedFrameRange,
                    oldTiming: (0, get_profile_duration_1.getProfileDuration)(chunkData),
                    newTiming: (0, get_profile_duration_1.getProfileDuration)(optimizedProfile),
                    createdFromRenderId: params.renderId,
                    framesPerLambda,
                    lambdaVersion: constants_1.CURRENT_VERSION,
                    frameRange: realFrameRange,
                    everyNthFrame: params.everyNthFrame,
                },
                expectedBucketOwner: options.expectedBucketOwner,
                compositionId: params.composition,
                siteId: (0, make_s3_url_1.getServeUrlHash)(params.serveUrl),
                region: (0, get_current_region_1.getCurrentRegionInFunction)(),
            })
            : Promise.resolve();
    }
    const [, contents] = await Promise.all([
        chunkProm,
        (0, io_1.lambdaLs)({
            bucketName: params.bucketName,
            prefix: (0, constants_1.rendersPrefix)(params.renderId),
            expectedBucketOwner: options.expectedBucketOwner,
            region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        }),
    ]);
    const finalEncodingProgress = {
        framesEncoded: frameCount.length,
        totalFrames: frameCount.length,
        doneIn: encodingStop ? encodingStop - encodingStart : null,
        timeToInvoke: (0, get_lambdas_invoked_stats_1.getLambdasInvokedStats)(contents, params.renderId, renderMetadata.estimatedRenderLambdaInvokations, renderMetadata.startedDate).timeToInvokeLambdas,
    };
    const finalEncodingProgressProm = (0, io_1.lambdaWriteFile)({
        bucketName: params.bucketName,
        key: (0, constants_1.encodingProgressKey)(params.renderId),
        body: JSON.stringify(finalEncodingProgress),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        privacy: 'private',
        expectedBucketOwner: options.expectedBucketOwner,
        downloadBehavior: null,
    });
    const errorExplanationsProm = (0, inspect_errors_1.inspectErrors)({
        contents,
        renderId: params.renderId,
        bucket: params.bucketName,
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        expectedBucketOwner: options.expectedBucketOwner,
    });
    const jobs = (0, get_files_to_delete_1.getFilesToDelete)({
        chunkCount,
        renderId: params.renderId,
    });
    const deletProm = (0, delete_chunks_1.cleanupFiles)({
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        bucket: params.bucketName,
        contents,
        jobs,
    });
    const postRenderData = await (0, create_post_render_data_1.createPostRenderData)({
        expectedBucketOwner: options.expectedBucketOwner,
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        renderId: params.renderId,
        memorySizeInMb: Number(process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE),
        renderMetadata,
        contents,
        errorExplanations: await errorExplanationsProm,
        timeToEncode: encodingStop - encodingStart,
        timeToDelete: await deletProm,
        outputFile: {
            lastModified: Date.now(),
            size: outputSize.size,
            url: (0, get_output_url_from_metadata_1.getOutputUrlFromMetadata)(renderMetadata, params.bucketName),
        },
    });
    await finalEncodingProgressProm;
    await (0, write_post_render_data_1.writePostRenderData)({
        bucketName: params.bucketName,
        expectedBucketOwner: options.expectedBucketOwner,
        postRenderData,
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        renderId: params.renderId,
    });
    await Promise.all([cleanupChunksProm, fs_1.default.promises.rm(outfile)]);
};
const launchHandler = async (params, options) => {
    if (params.type !== constants_1.LambdaRoutines.launch) {
        throw new Error('Expected launch type');
    }
    try {
        await innerLaunchHandler(params, options);
    }
    catch (err) {
        console.log('Error occurred', err);
        await (0, write_lambda_error_1.writeLambdaError)({
            bucketName: params.bucketName,
            errorInfo: {
                chunk: null,
                frame: null,
                name: err.name,
                stack: err.stack,
                type: 'stitcher',
                isFatal: true,
                tmpDir: (0, write_lambda_error_1.getTmpDirStateIfENoSp)(err.stack),
                attempt: 1,
                totalAttempts: 1,
                willRetry: false,
                message: err.message,
            },
            expectedBucketOwner: options.expectedBucketOwner,
            renderId: params.renderId,
        });
    }
};
exports.launchHandler = launchHandler;
