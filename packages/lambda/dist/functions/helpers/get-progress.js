"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgress = void 0;
const remotion_1 = require("remotion");
const constants_1 = require("../../shared/constants");
const docs_url_1 = require("../../shared/docs-url");
const calculate_chunk_times_1 = require("./calculate-chunk-times");
const calculate_price_from_bucket_1 = require("./calculate-price-from-bucket");
const expected_out_name_1 = require("./expected-out-name");
const find_output_file_in_bucket_1 = require("./find-output-file-in-bucket");
const format_costs_info_1 = require("./format-costs-info");
const get_cleanup_progress_1 = require("./get-cleanup-progress");
const get_current_architecture_1 = require("./get-current-architecture");
const get_current_region_1 = require("./get-current-region");
const get_encoding_metadata_1 = require("./get-encoding-metadata");
const get_final_encoding_status_1 = require("./get-final-encoding-status");
const get_lambdas_invoked_stats_1 = require("./get-lambdas-invoked-stats");
const get_overall_progress_1 = require("./get-overall-progress");
const get_post_render_data_1 = require("./get-post-render-data");
const get_render_metadata_1 = require("./get-render-metadata");
const get_retry_stats_1 = require("./get-retry-stats");
const get_time_to_finish_1 = require("./get-time-to-finish");
const inspect_errors_1 = require("./inspect-errors");
const io_1 = require("./io");
const getProgress = async ({ bucketName, renderId, expectedBucketOwner, region, memorySizeInMb, timeoutInMiliseconds, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const postRenderData = await (0, get_post_render_data_1.getPostRenderData)({
        bucketName,
        region,
        renderId,
        expectedBucketOwner,
    });
    if (postRenderData) {
        const outData = (0, expected_out_name_1.getExpectedOutName)(postRenderData.renderMetadata, bucketName);
        return {
            bucket: bucketName,
            renderSize: postRenderData.renderSize,
            chunks: postRenderData.renderMetadata.totalChunks,
            cleanup: {
                doneIn: postRenderData.timeToCleanUp,
                filesDeleted: postRenderData.filesCleanedUp,
                minFilesToDelete: postRenderData.filesCleanedUp,
            },
            costs: {
                accruedSoFar: postRenderData.cost.estimatedCost,
                displayCost: postRenderData.cost.estimatedDisplayCost,
                currency: postRenderData.cost.currency,
                disclaimer: postRenderData.cost.disclaimer,
            },
            currentTime: Date.now(),
            done: true,
            encodingStatus: {
                framesEncoded: postRenderData.renderMetadata.videoConfig.durationInFrames,
                totalFrames: postRenderData.renderMetadata.videoConfig.durationInFrames,
                doneIn: postRenderData.timeToEncode,
                timeToInvoke: postRenderData.timeToInvokeLambdas,
            },
            errors: postRenderData.errors,
            fatalErrorEncountered: false,
            lambdasInvoked: postRenderData.renderMetadata.totalChunks,
            outputFile: postRenderData.outputFile,
            renderId,
            renderMetadata: postRenderData.renderMetadata,
            timeToFinish: postRenderData.timeToFinish,
            timeToFinishChunks: postRenderData.timeToRenderChunks,
            timeToInvokeLambdas: postRenderData.timeToInvokeLambdas,
            overallProgress: 1,
            retriesInfo: postRenderData.retriesInfo,
            outKey: outData.key,
            outBucket: outData.renderBucketName,
            mostExpensiveFrameRanges: (_a = postRenderData.mostExpensiveFrameRanges) !== null && _a !== void 0 ? _a : null,
        };
    }
    const contents = await (0, io_1.lambdaLs)({
        bucketName,
        prefix: (0, constants_1.rendersPrefix)(renderId),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        expectedBucketOwner,
    });
    const renderMetadataExists = Boolean(contents.find((c) => c.Key === (0, constants_1.renderMetadataKey)(renderId)));
    const [encodingStatus, renderMetadata, errorExplanations] = await Promise.all([
        (0, get_encoding_metadata_1.getEncodingMetadata)({
            exists: Boolean(contents.find((c) => c.Key === (0, constants_1.encodingProgressKey)(renderId))),
            bucketName,
            renderId,
            region: (0, get_current_region_1.getCurrentRegionInFunction)(),
            expectedBucketOwner,
        }),
        renderMetadataExists
            ? (0, get_render_metadata_1.getRenderMetadata)({
                bucketName,
                renderId,
                region: (0, get_current_region_1.getCurrentRegionInFunction)(),
                expectedBucketOwner,
            })
            : null,
        (0, inspect_errors_1.inspectErrors)({
            contents,
            renderId,
            bucket: bucketName,
            region: (0, get_current_region_1.getCurrentRegionInFunction)(),
            expectedBucketOwner,
        }),
    ]);
    const outputFile = renderMetadata
        ? await (0, find_output_file_in_bucket_1.findOutputFileInBucket)({
            bucketName,
            renderMetadata,
            region,
        })
        : null;
    const accruedSoFar = Number((0, calculate_price_from_bucket_1.estimatePriceFromBucket)({
        contents,
        renderMetadata,
        memorySizeInMb,
        outputFileMetadata: outputFile,
        architecture: (0, get_current_architecture_1.getCurrentArchitecture)(),
        lambdasInvoked: (_b = renderMetadata === null || renderMetadata === void 0 ? void 0 : renderMetadata.estimatedRenderLambdaInvokations) !== null && _b !== void 0 ? _b : 0,
        // We cannot determine the ephemeral storage size, so we
        // overestimate the price, but will only have a miniscule effect (~0.2%)
        diskSizeInMb: constants_1.MAX_EPHEMERAL_STORAGE_IN_MB,
    }));
    const cleanup = (0, get_cleanup_progress_1.getCleanupProgress)({
        chunkCount: (_c = renderMetadata === null || renderMetadata === void 0 ? void 0 : renderMetadata.totalChunks) !== null && _c !== void 0 ? _c : 0,
        contents,
        output: (_d = outputFile === null || outputFile === void 0 ? void 0 : outputFile.url) !== null && _d !== void 0 ? _d : null,
        renderId,
    });
    const timeToFinish = (0, get_time_to_finish_1.getTimeToFinish)({
        lastModified: (_e = outputFile === null || outputFile === void 0 ? void 0 : outputFile.lastModified) !== null && _e !== void 0 ? _e : null,
        renderMetadata,
    });
    const chunks = contents.filter((c) => { var _a; return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith((0, constants_1.chunkKey)(renderId)); });
    const allChunks = chunks.length === ((_f = renderMetadata === null || renderMetadata === void 0 ? void 0 : renderMetadata.totalChunks) !== null && _f !== void 0 ? _f : Infinity);
    const renderSize = contents
        .map((c) => { var _a; return (_a = c.Size) !== null && _a !== void 0 ? _a : 0; })
        .reduce((a, b) => a + b, 0);
    const lambdasInvokedStats = (0, get_lambdas_invoked_stats_1.getLambdasInvokedStats)(contents, renderId, (_g = renderMetadata === null || renderMetadata === void 0 ? void 0 : renderMetadata.estimatedRenderLambdaInvokations) !== null && _g !== void 0 ? _g : null, (_h = renderMetadata === null || renderMetadata === void 0 ? void 0 : renderMetadata.startedDate) !== null && _h !== void 0 ? _h : null);
    const retriesInfo = (0, get_retry_stats_1.getRetryStats)({
        contents,
        renderId,
    });
    const finalEncodingStatus = (0, get_final_encoding_status_1.getFinalEncodingStatus)({
        encodingStatus,
        outputFileExists: Boolean(outputFile),
        renderMetadata,
        lambdaInvokeStatus: lambdasInvokedStats,
    });
    const chunkCount = outputFile
        ? (_j = renderMetadata === null || renderMetadata === void 0 ? void 0 : renderMetadata.totalChunks) !== null && _j !== void 0 ? _j : 0
        : chunks.length;
    // We add a 20 second buffer for it, since AWS timeshifts can be quite a lot. Once it's 20sec over the limit, we consider it timed out
    const isBeyondTimeout = renderMetadata &&
        Date.now() > renderMetadata.startedDate + timeoutInMiliseconds + 20000;
    const allErrors = [
        isBeyondTimeout
            ? {
                attempt: 1,
                chunk: null,
                explanation: `The main function timed out after ${timeoutInMiliseconds}ms. Consider increasing the timeout of your function. You can use the "--timeout" parameter when deploying a function via CLI, or the "timeoutInSeconds" parameter when using the deployFunction API. ${docs_url_1.DOCS_URL}/docs/lambda/cli/functions#deploy`,
                frame: null,
                isFatal: true,
                s3Location: '',
                stack: new Error().stack,
                tmpDir: null,
                totalAttempts: 1,
                type: 'stitcher',
                willRetry: false,
            }
            : null,
        ...errorExplanations,
    ].filter(remotion_1.Internals.truthy);
    return {
        chunks: chunkCount,
        done: false,
        encodingStatus,
        costs: (0, format_costs_info_1.formatCostsInfo)(accruedSoFar),
        renderId,
        renderMetadata,
        bucket: bucketName,
        outputFile: (_k = outputFile === null || outputFile === void 0 ? void 0 : outputFile.url) !== null && _k !== void 0 ? _k : null,
        timeToFinish,
        errors: allErrors,
        fatalErrorEncountered: allErrors.some((f) => f.isFatal && !f.willRetry),
        currentTime: Date.now(),
        renderSize,
        lambdasInvoked: lambdasInvokedStats.lambdasInvoked,
        cleanup,
        timeToFinishChunks: allChunks
            ? (0, calculate_chunk_times_1.calculateChunkTimes)({
                contents,
                renderId,
                type: 'absolute-time',
            })
            : null,
        timeToInvokeLambdas: (_l = encodingStatus === null || encodingStatus === void 0 ? void 0 : encodingStatus.timeToInvoke) !== null && _l !== void 0 ? _l : lambdasInvokedStats.timeToInvokeLambdas,
        overallProgress: (0, get_overall_progress_1.getOverallProgress)({
            cleanup: cleanup ? cleanup.filesDeleted / cleanup.minFilesToDelete : 0,
            encoding: finalEncodingStatus && renderMetadata
                ? finalEncodingStatus.framesEncoded /
                    renderMetadata.videoConfig.durationInFrames
                : 0,
            invoking: renderMetadata
                ? lambdasInvokedStats.lambdasInvoked /
                    renderMetadata.estimatedRenderLambdaInvokations
                : 0,
            rendering: renderMetadata ? chunkCount / renderMetadata.totalChunks : 0,
        }),
        retriesInfo,
        outKey: outputFile && renderMetadata
            ? (0, expected_out_name_1.getExpectedOutName)(renderMetadata, bucketName).key
            : null,
        outBucket: outputFile && renderMetadata
            ? (0, expected_out_name_1.getExpectedOutName)(renderMetadata, bucketName).renderBucketName
            : null,
        mostExpensiveFrameRanges: null,
    };
};
exports.getProgress = getProgress;
