"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressHandler = void 0;
const constants_1 = require("../shared/constants");
const get_current_region_1 = require("./helpers/get-current-region");
const get_progress_1 = require("./helpers/get-progress");
const progressHandler = (lambdaParams, options) => {
    if (lambdaParams.type !== constants_1.LambdaRoutines.status) {
        throw new TypeError('Expected status type');
    }
    return (0, get_progress_1.getProgress)({
        bucketName: lambdaParams.bucketName,
        renderId: lambdaParams.renderId,
        expectedBucketOwner: options.expectedBucketOwner,
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        memorySizeInMb: Number(process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE),
        timeoutInMiliseconds: options.timeoutInMiliseconds,
    });
};
exports.progressHandler = progressHandler;
