"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateChunkTimes = void 0;
const constants_1 = require("../../shared/constants");
const parse_lambda_timings_key_1 = require("../../shared/parse-lambda-timings-key");
const min_max_1 = require("./min-max");
const getAbsoluteTime = (parsedTimings) => {
    if (parsedTimings.length === 0) {
        return 0;
    }
    const allEnds = parsedTimings.map((p) => p.rendered);
    const allStarts = parsedTimings.map((p) => p.start);
    const biggestEnd = (0, min_max_1.max)(allEnds);
    const smallestStart = (0, min_max_1.min)(allStarts);
    return biggestEnd - smallestStart;
};
const calculateChunkTimes = ({ contents, renderId, type, }) => {
    const parsedTimings = contents
        .filter((c) => { var _a; return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith((0, constants_1.lambdaTimingsPrefix)(renderId)); })
        .map((f) => (0, parse_lambda_timings_key_1.parseLambdaTimingsKey)(f.Key));
    const absoluteTime = getAbsoluteTime(parsedTimings);
    if (type === 'combined-time-for-cost-calculation') {
        const totalEncodingTimings = parsedTimings
            .map((p) => p.rendered - p.start)
            .reduce((a, b) => a + b, 0);
        return totalEncodingTimings + absoluteTime;
    }
    if (type === 'absolute-time') {
        return absoluteTime;
    }
    throw new Error('invalid time for calculate chunk times');
};
exports.calculateChunkTimes = calculateChunkTimes;
