"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLambdasInvokedStats = void 0;
const constants_1 = require("../../shared/constants");
const parse_lambda_initialized_key_1 = require("../../shared/parse-lambda-initialized-key");
const min_max_1 = require("./min-max");
const getLambdasInvokedStats = (contents, renderId, estimatedRenderLambdaInvokations, startDate) => {
    const lambdasInvoked = contents
        .filter((c) => { var _a; return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith((0, constants_1.lambdaInitializedPrefix)(renderId)); })
        .filter((c) => (0, parse_lambda_initialized_key_1.parseLambdaInitializedKey)(c.Key).attempt === 1);
    const allLambdasInvoked = lambdasInvoked.length === estimatedRenderLambdaInvokations;
    const timeToInvokeLambdas = allLambdasInvoked && startDate
        ? (0, min_max_1.max)(lambdasInvoked.map((l) => { var _a; return (_a = l.LastModified) === null || _a === void 0 ? void 0 : _a.getTime(); })) -
            startDate
        : null;
    return {
        timeToInvokeLambdas,
        allLambdasInvoked,
        lambdasInvoked: lambdasInvoked.length,
    };
};
exports.getLambdasInvokedStats = getLambdasInvokedStats;
