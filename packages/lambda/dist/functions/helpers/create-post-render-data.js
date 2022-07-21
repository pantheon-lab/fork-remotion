"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostRenderData = void 0;
const estimate_price_1 = require("../../api/estimate-price");
const constants_1 = require("../../shared/constants");
const get_most_expensive_chunks_1 = require("../../shared/get-most-expensive-chunks");
const parse_lambda_timings_key_1 = require("../../shared/parse-lambda-timings-key");
const calculate_chunk_times_1 = require("./calculate-chunk-times");
const get_current_architecture_1 = require("./get-current-architecture");
const get_files_to_delete_1 = require("./get-files-to-delete");
const get_lambdas_invoked_stats_1 = require("./get-lambdas-invoked-stats");
const get_retry_stats_1 = require("./get-retry-stats");
const get_time_to_finish_1 = require("./get-time-to-finish");
const createPostRenderData = ({ renderId, region, memorySizeInMb, renderMetadata, contents, timeToEncode, errorExplanations, timeToDelete, outputFile, }) => {
    var _a;
    const initializedKeys = contents.filter((c) => { var _a; return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith((0, constants_1.lambdaTimingsPrefix)(renderId)); });
    const parsedTimings = initializedKeys.map(({ Key }) => (0, parse_lambda_timings_key_1.parseLambdaTimingsKey)(Key));
    const times = parsedTimings
        .map((p) => p.rendered - p.start + get_most_expensive_chunks_1.OVERHEAD_TIME_PER_LAMBDA)
        .reduce((a, b) => a + b);
    const cost = (0, estimate_price_1.estimatePrice)({
        durationInMiliseconds: times,
        memorySizeInMb,
        region,
        architecture: (0, get_current_architecture_1.getCurrentArchitecture)(),
        lambdasInvoked: renderMetadata.estimatedTotalLambdaInvokations,
        // We cannot determine the ephemeral storage size, so we
        // overestimate the price, but will only have a miniscule effect (~0.2%)
        diskSizeInMb: constants_1.MAX_EPHEMERAL_STORAGE_IN_MB,
    });
    if (!outputFile) {
        throw new Error('Cannot wrap up without an output file in the S3 bucket.');
    }
    const endTime = Date.now();
    const timeToFinish = (0, get_time_to_finish_1.getTimeToFinish)({
        renderMetadata,
        lastModified: endTime,
    });
    if (!timeToFinish) {
        throw new TypeError(`Cannot calculate timeToFinish value`);
    }
    const renderSize = contents
        .map((c) => { var _a; return (_a = c.Size) !== null && _a !== void 0 ? _a : 0; })
        .reduce((a, b) => a + b, 0);
    const { timeToInvokeLambdas } = (0, get_lambdas_invoked_stats_1.getLambdasInvokedStats)(contents, renderId, (_a = renderMetadata === null || renderMetadata === void 0 ? void 0 : renderMetadata.estimatedRenderLambdaInvokations) !== null && _a !== void 0 ? _a : null, renderMetadata.startedDate);
    const retriesInfo = (0, get_retry_stats_1.getRetryStats)({ contents, renderId });
    if (timeToInvokeLambdas === null) {
        throw new Error('should have timing for all lambdas');
    }
    return {
        cost: {
            currency: 'USD',
            disclaimer: 'Estimated cost for lambda invocations only. Does not include cost for S3 storage and data transfer.',
            estimatedCost: cost,
            estimatedDisplayCost: new Intl.NumberFormat('en-US', {
                currency: 'USD',
                currencyDisplay: 'narrowSymbol',
            }).format(cost),
        },
        outputFile: outputFile.url,
        timeToFinish,
        errors: errorExplanations,
        startTime: renderMetadata.startedDate,
        endTime,
        outputSize: outputFile.size,
        renderSize,
        renderMetadata,
        filesCleanedUp: (0, get_files_to_delete_1.getFilesToDelete)({
            chunkCount: renderMetadata.totalChunks,
            renderId,
        }).length,
        timeToEncode,
        timeToCleanUp: timeToDelete,
        timeToRenderChunks: (0, calculate_chunk_times_1.calculateChunkTimes)({
            contents,
            renderId,
            type: 'absolute-time',
        }),
        timeToInvokeLambdas,
        retriesInfo,
        mostExpensiveFrameRanges: (0, get_most_expensive_chunks_1.getMostExpensiveChunks)(parsedTimings, renderMetadata.framesPerLambda),
    };
};
exports.createPostRenderData = createPostRenderData;
