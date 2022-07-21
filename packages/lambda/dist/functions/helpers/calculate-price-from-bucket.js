"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimatePriceFromBucket = void 0;
const estimate_price_1 = require("../../api/estimate-price");
const constants_1 = require("../../shared/constants");
const parse_lambda_timings_key_1 = require("../../shared/parse-lambda-timings-key");
const calculate_chunk_times_1 = require("./calculate-chunk-times");
const get_current_region_1 = require("./get-current-region");
const get_time_to_finish_1 = require("./get-time-to-finish");
const estimatePriceFromBucket = ({ contents, renderMetadata, memorySizeInMb, outputFileMetadata, architecture, diskSizeInMb, lambdasInvoked, }) => {
    var _a, _b, _c;
    if (!renderMetadata) {
        return null;
    }
    const parsedTimings = contents
        .filter((c) => { var _a; return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith((0, constants_1.lambdaTimingsPrefix)(renderMetadata.renderId)); })
        .map((f) => (0, parse_lambda_timings_key_1.parseLambdaTimingsKey)(f.Key));
    const timeToFinish = (0, get_time_to_finish_1.getTimeToFinish)({
        lastModified: (_a = outputFileMetadata === null || outputFileMetadata === void 0 ? void 0 : outputFileMetadata.lastModified) !== null && _a !== void 0 ? _a : null,
        renderMetadata,
    });
    const elapsedTime = timeToFinish === null
        ? Math.max(0, Date.now() - ((_b = renderMetadata === null || renderMetadata === void 0 ? void 0 : renderMetadata.startedDate) !== null && _b !== void 0 ? _b : 0))
        : timeToFinish;
    const unfinished = Math.max(0, ((_c = renderMetadata === null || renderMetadata === void 0 ? void 0 : renderMetadata.totalChunks) !== null && _c !== void 0 ? _c : 0) - parsedTimings.length);
    const timeElapsedOfUnfinished = new Array(unfinished)
        .fill(true)
        .map(() => elapsedTime)
        .reduce((a, b) => a + b, 0);
    const accruedSoFar = Number((0, estimate_price_1.estimatePrice)({
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        durationInMiliseconds: (0, calculate_chunk_times_1.calculateChunkTimes)({
            contents,
            renderId: renderMetadata.renderId,
            type: 'combined-time-for-cost-calculation',
        }) + timeElapsedOfUnfinished,
        memorySizeInMb,
        architecture,
        diskSizeInMb,
        lambdasInvoked,
    }).toPrecision(5));
    return accruedSoFar;
};
exports.estimatePriceFromBucket = estimatePriceFromBucket;
