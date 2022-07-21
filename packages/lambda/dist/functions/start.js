"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHandler = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const remotion_1 = require("remotion");
const get_or_create_bucket_1 = require("../api/get-or-create-bucket");
const aws_clients_1 = require("../shared/aws-clients");
const constants_1 = require("../shared/constants");
const random_hash_1 = require("../shared/random-hash");
const get_current_region_1 = require("./helpers/get-current-region");
const startHandler = async (params) => {
    var _a;
    if (params.type !== constants_1.LambdaRoutines.start) {
        throw new TypeError('Expected type start');
    }
    const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
    });
    const renderId = (0, random_hash_1.randomHash)({ randomInTests: true });
    const payload = {
        type: constants_1.LambdaRoutines.launch,
        framesPerLambda: params.framesPerLambda,
        composition: params.composition,
        serveUrl: params.serveUrl,
        inputProps: params.inputProps,
        bucketName,
        renderId,
        codec: params.codec,
        imageFormat: params.imageFormat,
        crf: params.crf,
        envVariables: params.envVariables,
        pixelFormat: params.pixelFormat,
        proResProfile: params.proResProfile,
        quality: params.quality,
        maxRetries: params.maxRetries,
        privacy: params.privacy,
        logLevel: (_a = params.logLevel) !== null && _a !== void 0 ? _a : remotion_1.Internals.Logging.DEFAULT_LOG_LEVEL,
        frameRange: params.frameRange,
        outName: params.outName,
        timeoutInMilliseconds: params.timeoutInMilliseconds,
        chromiumOptions: params.chromiumOptions,
        scale: params.scale,
        numberOfGifLoops: params.numberOfGifLoops,
        everyNthFrame: params.everyNthFrame,
        concurrencyPerLambda: params.concurrencyPerLambda,
        downloadBehavior: params.downloadBehavior,
    };
    await (0, aws_clients_1.getLambdaClient)((0, get_current_region_1.getCurrentRegionInFunction)()).send(new client_lambda_1.InvokeCommand({
        FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
        // @ts-expect-error
        Payload: JSON.stringify(payload),
        InvocationType: 'Event',
    }));
    return {
        bucketName,
        renderId,
    };
};
exports.startHandler = startHandler;
