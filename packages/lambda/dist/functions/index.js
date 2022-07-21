"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const remotion_1 = require("remotion");
const constants_1 = require("../shared/constants");
const clean_tmpdir_1 = require("./helpers/clean-tmpdir");
const is_warm_1 = require("./helpers/is-warm");
const print_cloudwatch_helper_1 = require("./helpers/print-cloudwatch-helper");
const info_1 = require("./info");
const launch_1 = require("./launch");
const progress_1 = require("./progress");
const renderer_1 = require("./renderer");
const start_1 = require("./start");
const still_1 = require("./still");
const handler = async (params, context) => {
    process.env.REMOTION_LAMBDA = 'true';
    const timeoutInMiliseconds = context.getRemainingTimeInMillis();
    if (!context || !context.invokedFunctionArn) {
        throw new Error('Lambda function unexpectedly does not have context.invokedFunctionArn');
    }
    (0, clean_tmpdir_1.deleteTmpDir)();
    const isWarm = (0, is_warm_1.getWarm)();
    (0, is_warm_1.setWarm)();
    const currentUserId = context.invokedFunctionArn.split(':')[4];
    if (params.type === constants_1.LambdaRoutines.still) {
        (0, print_cloudwatch_helper_1.printCloudwatchHelper)(constants_1.LambdaRoutines.still, {
            inputProps: JSON.stringify(params.inputProps),
        });
        return (0, still_1.stillHandler)(params, {
            expectedBucketOwner: currentUserId,
        });
    }
    if (params.type === constants_1.LambdaRoutines.start) {
        (0, print_cloudwatch_helper_1.printCloudwatchHelper)(constants_1.LambdaRoutines.start, {
            inputProps: JSON.stringify(params.inputProps),
        });
        return (0, start_1.startHandler)(params);
    }
    if (params.type === constants_1.LambdaRoutines.launch) {
        (0, print_cloudwatch_helper_1.printCloudwatchHelper)(constants_1.LambdaRoutines.launch, {
            renderId: params.renderId,
            inputProps: JSON.stringify(params.inputProps),
        });
        return (0, launch_1.launchHandler)(params, { expectedBucketOwner: currentUserId });
    }
    if (params.type === constants_1.LambdaRoutines.status) {
        (0, print_cloudwatch_helper_1.printCloudwatchHelper)(constants_1.LambdaRoutines.status, {
            renderId: params.renderId,
        });
        return (0, progress_1.progressHandler)(params, {
            expectedBucketOwner: currentUserId,
            timeoutInMiliseconds,
        });
    }
    if (params.type === constants_1.LambdaRoutines.renderer) {
        (0, print_cloudwatch_helper_1.printCloudwatchHelper)(constants_1.LambdaRoutines.renderer, {
            renderId: params.renderId,
            chunk: String(params.chunk),
            dumpLogs: String(remotion_1.Internals.Logging.isEqualOrBelowLogLevel(params.logLevel, 'verbose')),
            inputProps: JSON.stringify(params.inputProps),
        });
        return (0, renderer_1.rendererHandler)(params, {
            expectedBucketOwner: currentUserId,
            isWarm,
        });
    }
    if (params.type === constants_1.LambdaRoutines.info) {
        (0, print_cloudwatch_helper_1.printCloudwatchHelper)(constants_1.LambdaRoutines.info, {});
        return (0, info_1.infoHandler)(params);
    }
    throw new Error(constants_1.COMMAND_NOT_FOUND);
};
exports.handler = handler;
