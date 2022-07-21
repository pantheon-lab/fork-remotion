"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenderProgress = void 0;
const call_lambda_1 = require("../shared/call-lambda");
const constants_1 = require("../shared/constants");
/**
 * @description Gets the current status of a render originally triggered via renderMediaOnLambda().
 * @link https://remotion.dev/docs/lambda/getrenderprogress
 * @param {string} params.functionName The name of the function used to trigger the render.
 * @param {string} params.bucketName The name of the bucket that was used in the render.
 * @param {string} params.renderId The ID of the render that was returned by `renderMediaOnLambda()`.
 * @param {AwsRegion} params.region The region in which the render was triggered.
 * @returns {Promise<RenderProgress>} See documentation for this function to see all properties on the return object.
 */
const getRenderProgress = async ({ functionName, bucketName, renderId, region, }) => {
    const result = await (0, call_lambda_1.callLambda)({
        functionName,
        type: constants_1.LambdaRoutines.status,
        payload: {
            bucketName,
            renderId,
        },
        region,
    });
    return result;
};
exports.getRenderProgress = getRenderProgress;
