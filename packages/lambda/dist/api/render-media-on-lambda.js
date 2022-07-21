"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderVideoOnLambda = exports.renderMediaOnLambda = void 0;
const remotion_1 = require("remotion");
const call_lambda_1 = require("../shared/call-lambda");
const constants_1 = require("../shared/constants");
const convert_to_serve_url_1 = require("../shared/convert-to-serve-url");
const validate_frames_per_lambda_1 = require("../shared/validate-frames-per-lambda");
const validate_lambda_codec_1 = require("../shared/validate-lambda-codec");
const validate_serveurl_1 = require("../shared/validate-serveurl");
/**
 * @description Triggers a render on a lambda given a composition and a lambda function.
 * @link https://remotion.dev/docs/lambda/rendermediaonlambda
 * @param params.functionName The name of the Lambda function that should be used
 * @param params.serveUrl The URL of the deployed project
 * @param params.composition The ID of the composition which should be rendered.
 * @param params.inputProps The input props that should be passed to the composition.
 * @param params.codec The video codec which should be used for encoding.
 * @param params.imageFormat In which image format the frames should be rendered.
 * @param params.crf The constant rate factor to be used during encoding.
 * @param params.envVariables Object containing environment variables to be inserted into the video environment
 * @param params.proResProfile The ProRes profile if rendering a ProRes video
 * @param params.quality JPEG quality if JPEG was selected as the image format.
 * @param params.region The AWS region in which the video should be rendered.
 * @param params.maxRetries How often rendering a chunk may fail before the video render gets aborted.
 * @param params.logLevel Level of logging that Lambda function should perform. Default "info".
 * @returns {Promise<RenderMediaOnLambdaOutput>} See documentation for detailed structure
 */
const renderMediaOnLambda = async ({ functionName, serveUrl, inputProps, codec, imageFormat, crf, envVariables, pixelFormat, proResProfile, quality, region, maxRetries, composition, framesPerLambda, privacy, logLevel, frameRange, outName, timeoutInMilliseconds, chromiumOptions, scale, numberOfGifLoops, everyNthFrame, concurrencyPerLambda, downloadBehavior, }) => {
    const actualCodec = (0, validate_lambda_codec_1.validateLambdaCodec)(codec);
    (0, validate_serveurl_1.validateServeUrl)(serveUrl);
    (0, validate_frames_per_lambda_1.validateFramesPerLambda)(framesPerLambda !== null && framesPerLambda !== void 0 ? framesPerLambda : null);
    const realServeUrl = await (0, convert_to_serve_url_1.convertToServeUrl)(serveUrl, region);
    const res = await (0, call_lambda_1.callLambda)({
        functionName,
        type: constants_1.LambdaRoutines.start,
        payload: {
            framesPerLambda: framesPerLambda !== null && framesPerLambda !== void 0 ? framesPerLambda : null,
            composition,
            serveUrl: realServeUrl,
            inputProps,
            codec: actualCodec,
            imageFormat,
            crf,
            envVariables,
            pixelFormat,
            proResProfile,
            quality,
            maxRetries,
            privacy,
            logLevel: logLevel !== null && logLevel !== void 0 ? logLevel : remotion_1.Internals.Logging.DEFAULT_LOG_LEVEL,
            frameRange: frameRange !== null && frameRange !== void 0 ? frameRange : null,
            outName: outName !== null && outName !== void 0 ? outName : null,
            timeoutInMilliseconds: timeoutInMilliseconds !== null && timeoutInMilliseconds !== void 0 ? timeoutInMilliseconds : remotion_1.Internals.DEFAULT_PUPPETEER_TIMEOUT,
            chromiumOptions: chromiumOptions !== null && chromiumOptions !== void 0 ? chromiumOptions : {},
            scale: scale !== null && scale !== void 0 ? scale : 1,
            everyNthFrame: everyNthFrame !== null && everyNthFrame !== void 0 ? everyNthFrame : 1,
            numberOfGifLoops: numberOfGifLoops !== null && numberOfGifLoops !== void 0 ? numberOfGifLoops : 0,
            concurrencyPerLambda: concurrencyPerLambda !== null && concurrencyPerLambda !== void 0 ? concurrencyPerLambda : 1,
            downloadBehavior: downloadBehavior !== null && downloadBehavior !== void 0 ? downloadBehavior : { type: 'play-in-browser' },
        },
        region,
    });
    return {
        renderId: res.renderId,
        bucketName: res.bucketName,
    };
};
exports.renderMediaOnLambda = renderMediaOnLambda;
/**
 * @deprecated Renamed to renderMediaOnLambda()
 */
exports.renderVideoOnLambda = exports.renderMediaOnLambda;
