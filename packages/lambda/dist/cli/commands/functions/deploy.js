"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionsDeploySubcommand = exports.FUNCTIONS_DEPLOY_SUBCOMMAND = void 0;
const cli_1 = require("@remotion/cli");
const log_1 = require("@remotion/cli/dist/log");
const deploy_function_1 = require("../../../api/deploy-function");
const constants_1 = require("../../../shared/constants");
const validate_architecture_1 = require("../../../shared/validate-architecture");
const validate_custom_role_arn_1 = require("../../../shared/validate-custom-role-arn");
const validate_disk_size_in_mb_1 = require("../../../shared/validate-disk-size-in-mb");
const validate_memory_size_1 = require("../../../shared/validate-memory-size");
const validate_timeout_1 = require("../../../shared/validate-timeout");
const args_1 = require("../../args");
const get_aws_region_1 = require("../../get-aws-region");
exports.FUNCTIONS_DEPLOY_SUBCOMMAND = 'deploy';
const functionsDeploySubcommand = async () => {
    var _a, _b, _c, _d, _e, _f;
    const region = (0, get_aws_region_1.getAwsRegion)();
    const timeoutInSeconds = (_a = args_1.parsedLambdaCli.timeout) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_TIMEOUT;
    const memorySizeInMb = (_b = args_1.parsedLambdaCli.memory) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_MEMORY_SIZE;
    const diskSizeInMb = (_c = args_1.parsedLambdaCli.disk) !== null && _c !== void 0 ? _c : constants_1.DEFAULT_EPHEMERAL_STORAGE_IN_MB;
    const architecture = (_d = args_1.parsedLambdaCli.architecture) !== null && _d !== void 0 ? _d : constants_1.DEFAULT_ARCHITECTURE;
    const customRoleArn = (_e = args_1.parsedLambdaCli['custom-role-arn']) !== null && _e !== void 0 ? _e : undefined;
    const createCloudWatchLogGroup = !args_1.parsedLambdaCli['disable-cloudwatch'];
    const cloudWatchLogRetentionPeriodInDays = (_f = args_1.parsedLambdaCli['retention-period']) !== null && _f !== void 0 ? _f : constants_1.DEFAULT_CLOUDWATCH_RETENTION_PERIOD;
    (0, validate_memory_size_1.validateMemorySize)(memorySizeInMb);
    (0, validate_timeout_1.validateTimeout)(timeoutInSeconds);
    (0, validate_architecture_1.validateArchitecture)(architecture);
    (0, validate_disk_size_in_mb_1.validateDiskSizeInMb)(diskSizeInMb);
    (0, validate_custom_role_arn_1.validateCustomRoleArn)(customRoleArn);
    if (!cli_1.CliInternals.quietFlagProvided()) {
        log_1.Log.info(cli_1.CliInternals.chalk.gray(`
Region = ${region}
Memory = ${memorySizeInMb}MB
Disk size = ${diskSizeInMb}MB
Timeout = ${timeoutInSeconds}sec
Version = ${constants_1.CURRENT_VERSION}
Architecture = ${architecture}
CloudWatch Logging Enabled = ${createCloudWatchLogGroup}
CloudWatch Retention Period = ${cloudWatchLogRetentionPeriodInDays} days
				`.trim()));
    }
    const output = cli_1.CliInternals.createOverwriteableCliOutput(cli_1.CliInternals.quietFlagProvided());
    output.update('Deploying Lambda...');
    const { functionName, alreadyExisted } = await (0, deploy_function_1.deployFunction)({
        createCloudWatchLogGroup,
        region,
        timeoutInSeconds,
        memorySizeInMb,
        cloudWatchLogRetentionPeriodInDays,
        architecture,
        diskSizeInMb,
        customRoleArn,
    });
    if (cli_1.CliInternals.quietFlagProvided()) {
        log_1.Log.info(functionName);
    }
    if (alreadyExisted) {
        output.update(`Already exists as ${functionName}\n`);
    }
    else {
        output.update(`Deployed as ${functionName}\n`);
    }
};
exports.functionsDeploySubcommand = functionsDeploySubcommand;
