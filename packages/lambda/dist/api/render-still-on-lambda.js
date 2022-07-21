"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderStillOnLambda = void 0;
const remotion_1 = require("remotion");
const call_lambda_1 = require("../shared/call-lambda");
const constants_1 = require("../shared/constants");
const convert_to_serve_url_1 = require("../shared/convert-to-serve-url");
/**
 * @description Renders a still frame on Lambda
 * @link https://remotion.dev/docs/lambda/renderstillonlambda
 * @param params.functionName The name of the Lambda function that should be used
 * @param params.serveUrl The URL of the deployed project
 * @param params.composition The ID of the composition which should be rendered.
 * @param params.inputProps The input props that should be passed to the composition.
 * @param params.imageFormat In which image format the frames should be rendered.
 * @param params.envVariables Object containing environment variables to be inserted into the video environment
 * @param params.quality JPEG quality if JPEG was selected as the image format.
 * @param params.region The AWS region in which the video should be rendered.
 * @param params.maxRetries How often rendering a chunk may fail before the video render gets aborted.
 * @param params.frame Which frame should be used for the still image. Default 0.
 * @param params.privacy Whether the item in the S3 bucket should be public. Possible values: `"private"` and `"public"`
 * @returns {Promise<RenderStillOnLambdaOutput>} See documentation for exact response structure.
 */
const renderStillOnLambda = async ({ functionName, serveUrl, inputProps, imageFormat, envVariables, quality, region, maxRetries, composition, privacy, frame, logLevel, outName, timeoutInMilliseconds, chromiumOptions, scale, downloadBehavior, }) => {
    const realServeUrl = await (0, convert_to_serve_url_1.convertToServeUrl)(serveUrl, region);
    const res = await (0, call_lambda_1.callLambda)({
        functionName,
        type: constants_1.LambdaRoutines.still,
        payload: {
            composition,
            serveUrl: realServeUrl,
            inputProps,
            imageFormat,
            envVariables,
            quality,
            maxRetries: maxRetries !== null && maxRetries !== void 0 ? maxRetries : constants_1.DEFAULT_MAX_RETRIES,
            frame: frame !== null && frame !== void 0 ? frame : 0,
            privacy,
            attempt: 1,
            logLevel: logLevel !== null && logLevel !== void 0 ? logLevel : remotion_1.Internals.Logging.DEFAULT_LOG_LEVEL,
            outName: outName !== null && outName !== void 0 ? outName : null,
            timeoutInMilliseconds: timeoutInMilliseconds !== null && timeoutInMilliseconds !== void 0 ? timeoutInMilliseconds : remotion_1.Internals.DEFAULT_PUPPETEER_TIMEOUT,
            chromiumOptions: chromiumOptions !== null && chromiumOptions !== void 0 ? chromiumOptions : {},
            scale: scale !== null && scale !== void 0 ? scale : 1,
            downloadBehavior: downloadBehavior !== null && downloadBehavior !== void 0 ? downloadBehavior : { type: 'play-in-browser' },
        },
        region,
    });
    return {
        estimatedPrice: res.estimatedPrice,
        url: res.output,
        sizeInBytes: res.size,
        bucketName: res.bucketName,
        renderId: res.renderId,
    };
};
exports.renderStillOnLambda = renderStillOnLambda;
