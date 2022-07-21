"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRetryStats = void 0;
const constants_1 = require("../../shared/constants");
const parse_lambda_initialized_key_1 = require("../../shared/parse-lambda-initialized-key");
const getRetryStats = ({ contents, renderId, }) => {
    const retries = contents
        .filter((c) => { var _a; return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith((0, constants_1.lambdaInitializedPrefix)(renderId)); })
        .filter((c) => (0, parse_lambda_initialized_key_1.parseLambdaInitializedKey)(c.Key).attempt !== 1);
    return retries.map((retry) => {
        var _a;
        const parsed = (0, parse_lambda_initialized_key_1.parseLambdaInitializedKey)(retry.Key);
        return {
            chunk: parsed.chunk,
            attempt: parsed.attempt,
            time: (_a = retry.LastModified) === null || _a === void 0 ? void 0 : _a.getTime(),
        };
    });
};
exports.getRetryStats = getRetryStats;
