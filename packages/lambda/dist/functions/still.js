"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stillHandler = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const renderer_1 = require("@remotion/renderer");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const estimate_price_1 = require("../api/estimate-price");
const get_or_create_bucket_1 = require("../api/get-or-create-bucket");
const aws_clients_1 = require("../shared/aws-clients");
const constants_1 = require("../shared/constants");
const make_s3_url_1 = require("../shared/make-s3-url");
const random_hash_1 = require("../shared/random-hash");
const validate_outname_1 = require("../shared/validate-outname");
const validate_privacy_1 = require("../shared/validate-privacy");
const expected_out_name_1 = require("./helpers/expected-out-name");
const format_costs_info_1 = require("./helpers/format-costs-info");
const get_browser_instance_1 = require("./helpers/get-browser-instance");
const get_current_architecture_1 = require("./helpers/get-current-architecture");
const get_current_region_1 = require("./helpers/get-current-region");
const get_output_url_from_metadata_1 = require("./helpers/get-output-url-from-metadata");
const io_1 = require("./helpers/io");
const validate_composition_1 = require("./helpers/validate-composition");
const write_lambda_error_1 = require("./helpers/write-lambda-error");
const innerStillHandler = async (lambdaParams, renderId, options) => {
    var _a, _b, _c;
    if (lambdaParams.type !== constants_1.LambdaRoutines.still) {
        throw new TypeError('Expected still type');
    }
    (0, validate_privacy_1.validatePrivacy)(lambdaParams.privacy);
    (0, validate_outname_1.validateOutname)(lambdaParams.outName);
    const start = Date.now();
    const [{ bucketName }, browserInstance] = await Promise.all([
        (0, get_or_create_bucket_1.getOrCreateBucket)({
            region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        }),
        (0, get_browser_instance_1.getBrowserInstance)(remotion_1.Internals.Logging.isEqualOrBelowLogLevel((_a = lambdaParams.logLevel) !== null && _a !== void 0 ? _a : remotion_1.Internals.Logging.DEFAULT_LOG_LEVEL, 'verbose'), (_b = lambdaParams.chromiumOptions) !== null && _b !== void 0 ? _b : {}),
    ]);
    const outputDir = renderer_1.RenderInternals.tmpDir('remotion-render-');
    const outputPath = path_1.default.join(outputDir, 'output');
    const composition = await (0, validate_composition_1.validateComposition)({
        serveUrl: lambdaParams.serveUrl,
        browserInstance,
        composition: lambdaParams.composition,
        inputProps: lambdaParams.inputProps,
        envVariables: lambdaParams.envVariables,
        ffmpegExecutable: null,
        ffprobeExecutable: null,
        chromiumOptions: lambdaParams.chromiumOptions,
        timeoutInMilliseconds: lambdaParams.timeoutInMilliseconds,
        port: null,
    });
    const renderMetadata = {
        startedDate: Date.now(),
        videoConfig: composition,
        codec: null,
        compositionId: lambdaParams.composition,
        estimatedTotalLambdaInvokations: 1,
        estimatedRenderLambdaInvokations: 1,
        siteId: (0, make_s3_url_1.getServeUrlHash)(lambdaParams.serveUrl),
        totalChunks: 1,
        type: 'still',
        usesOptimizationProfile: false,
        imageFormat: lambdaParams.imageFormat,
        inputProps: lambdaParams.inputProps,
        lambdaVersion: constants_1.CURRENT_VERSION,
        framesPerLambda: 1,
        memorySizeInMb: Number(process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        renderId,
        outName: (_c = lambdaParams.outName) !== null && _c !== void 0 ? _c : undefined,
    };
    await (0, io_1.lambdaWriteFile)({
        bucketName,
        key: (0, constants_1.renderMetadataKey)(renderId),
        body: JSON.stringify(renderMetadata),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        privacy: 'private',
        expectedBucketOwner: options.expectedBucketOwner,
        downloadBehavior: null,
    });
    await (0, renderer_1.renderStill)({
        composition,
        output: outputPath,
        serveUrl: lambdaParams.serveUrl,
        dumpBrowserLogs: false,
        envVariables: lambdaParams.envVariables,
        frame: lambdaParams.frame,
        imageFormat: lambdaParams.imageFormat,
        inputProps: lambdaParams.inputProps,
        overwrite: false,
        puppeteerInstance: browserInstance,
        quality: lambdaParams.quality,
        chromiumOptions: lambdaParams.chromiumOptions,
        scale: lambdaParams.scale,
        timeoutInMilliseconds: lambdaParams.timeoutInMilliseconds,
    });
    const { key, renderBucketName } = (0, expected_out_name_1.getExpectedOutName)(renderMetadata, bucketName);
    const { size } = await fs_1.default.promises.stat(outputPath);
    await (0, io_1.lambdaWriteFile)({
        bucketName: renderBucketName,
        key,
        privacy: lambdaParams.privacy,
        body: fs_1.default.createReadStream(outputPath),
        expectedBucketOwner: options.expectedBucketOwner,
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        downloadBehavior: lambdaParams.downloadBehavior,
    });
    await fs_1.default.promises.rm(outputPath, { recursive: true });
    const estimatedPrice = (0, estimate_price_1.estimatePrice)({
        durationInMiliseconds: Date.now() - start + 100,
        memorySizeInMb: Number(process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        lambdasInvoked: 1,
        architecture: (0, get_current_architecture_1.getCurrentArchitecture)(),
        // We cannot determine the ephemeral storage size, so we
        // overestimate the price, but will only have a miniscule effect (~0.2%)
        diskSizeInMb: constants_1.MAX_EPHEMERAL_STORAGE_IN_MB,
    });
    return {
        output: (0, get_output_url_from_metadata_1.getOutputUrlFromMetadata)(renderMetadata, bucketName),
        size,
        bucketName,
        estimatedPrice: (0, format_costs_info_1.formatCostsInfo)(estimatedPrice),
        renderId,
    };
};
const stillHandler = async (params, options) => {
    if (params.type !== constants_1.LambdaRoutines.still) {
        throw new Error('Params must be renderer');
    }
    const renderId = (0, random_hash_1.randomHash)({ randomInTests: true });
    try {
        return innerStillHandler(params, renderId, options);
    }
    catch (err) {
        // If this error is encountered, we can just retry as it
        // is a very rare error to occur
        const isBrowserError = err.message.includes('FATAL:zygote_communication_linux.cc') ||
            err.message.includes('error while loading shared libraries: libnss3.so');
        const willRetry = isBrowserError || params.maxRetries > 0;
        if (willRetry) {
            const retryPayload = {
                ...params,
                maxRetries: params.maxRetries - 1,
                attempt: params.attempt + 1,
            };
            const res = await (0, aws_clients_1.getLambdaClient)((0, get_current_region_1.getCurrentRegionInFunction)()).send(new client_lambda_1.InvokeCommand({
                FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
                // @ts-expect-error
                Payload: JSON.stringify(retryPayload),
            }));
            const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
                region: (0, get_current_region_1.getCurrentRegionInFunction)(),
            });
            (0, write_lambda_error_1.writeLambdaError)({
                bucketName,
                errorInfo: {
                    chunk: null,
                    frame: null,
                    isFatal: false,
                    name: err.name,
                    message: err.message,
                    stack: err.stack,
                    type: 'browser',
                    tmpDir: (0, write_lambda_error_1.getTmpDirStateIfENoSp)(err.stack),
                    attempt: params.attempt,
                    totalAttempts: params.attempt + params.maxRetries,
                    willRetry,
                },
                expectedBucketOwner: options.expectedBucketOwner,
                renderId,
            });
            const str = JSON.parse(Buffer.from(res.Payload).toString());
            return str;
        }
        throw err;
    }
};
exports.stillHandler = stillHandler;
