"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployFunction = void 0;
const get_functions_1 = require("../api/get-functions");
const constants_1 = require("../shared/constants");
const function_zip_path_1 = require("../shared/function-zip-path");
const get_account_id_1 = require("../shared/get-account-id");
const validate_architecture_1 = require("../shared/validate-architecture");
const validate_aws_region_1 = require("../shared/validate-aws-region");
const validate_custom_role_arn_1 = require("../shared/validate-custom-role-arn");
const validate_disk_size_in_mb_1 = require("../shared/validate-disk-size-in-mb");
const validate_memory_size_1 = require("../shared/validate-memory-size");
const validate_retention_period_1 = require("../shared/validate-retention-period");
const validate_timeout_1 = require("../shared/validate-timeout");
const create_function_1 = require("./create-function");
/**
 * @description Creates an AWS Lambda function in your account that will be able to render a video in the cloud.
 * @link https://remotion.dev/docs/lambda/deployfunction
 * @param options.createCloudWatchLogGroup Whether you'd like to create a CloudWatch Log Group to store the logs for this function.
 * @param options.cloudWatchLogRetentionPeriodInDays (optional) The number of days to retain the CloudWatch logs for this function. Default is 14 days.
 * @param options.region The region you want to deploy your function to.
 * @param options.timeoutInSeconds After how many seconds the lambda function should be killed if it does not end itself.
 * @param options.memorySizeInMb How much memory should be allocated to the Lambda function.
 * @param options.architecture The architecture Lambda should run on. One of x86_64 and x64
 * @param options.diskSizeInMb The amount of storage the function should be allocated. The higher, the longer videos you can render. Default 512.
 * @returns {Promise<DeployFunctionOutput>} An object that contains the `functionName` property
 */
const deployFunction = async (options) => {
    var _a, _b;
    const diskSizeInMb = (_a = options.diskSizeInMb) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_EPHEMERAL_STORAGE_IN_MB;
    (0, validate_memory_size_1.validateMemorySize)(options.memorySizeInMb);
    (0, validate_timeout_1.validateTimeout)(options.timeoutInSeconds);
    (0, validate_aws_region_1.validateAwsRegion)(options.region);
    (0, validate_retention_period_1.validateCloudWatchRetentionPeriod)(options.cloudWatchLogRetentionPeriodInDays);
    (0, validate_architecture_1.validateArchitecture)(options.architecture);
    (0, validate_disk_size_in_mb_1.validateDiskSizeInMb)(diskSizeInMb);
    (0, validate_custom_role_arn_1.validateCustomRoleArn)(options.customRoleArn);
    const fnNameRender = [
        `${constants_1.RENDER_FN_PREFIX}${constants_1.CURRENT_VERSION}`,
        `mem${options.memorySizeInMb}mb`,
        `disk${diskSizeInMb}mb`,
        `${options.timeoutInSeconds}sec`,
    ].join('-');
    const accountId = await (0, get_account_id_1.getAccountId)({ region: options.region });
    const fns = await (0, get_functions_1.getFunctions)({
        compatibleOnly: true,
        region: options.region,
    });
    const alreadyDeployed = fns.find((f) => f.version === constants_1.CURRENT_VERSION &&
        f.memorySizeInMb === options.memorySizeInMb &&
        f.timeoutInSeconds === options.timeoutInSeconds &&
        f.diskSizeInMb === diskSizeInMb);
    const created = await (0, create_function_1.createFunction)({
        createCloudWatchLogGroup: options.createCloudWatchLogGroup,
        region: options.region,
        zipFile: function_zip_path_1.FUNCTION_ZIP,
        functionName: fnNameRender,
        accountId,
        memorySizeInMb: options.memorySizeInMb,
        timeoutInSeconds: options.timeoutInSeconds,
        retentionInDays: (_b = options.cloudWatchLogRetentionPeriodInDays) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_CLOUDWATCH_RETENTION_PERIOD,
        alreadyCreated: Boolean(alreadyDeployed),
        architecture: options.architecture,
        ephemerealStorageInMb: diskSizeInMb,
        customRoleArn: options.customRoleArn,
    });
    if (!created.FunctionName) {
        throw new Error('Lambda was created but has no name');
    }
    return {
        functionName: created.FunctionName,
        alreadyExisted: Boolean(alreadyDeployed),
    };
};
exports.deployFunction = deployFunction;
