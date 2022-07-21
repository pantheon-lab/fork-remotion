"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFunctionName = void 0;
const get_functions_1 = require("../../api/get-functions");
const constants_1 = require("../../shared/constants");
const functions_1 = require("../commands/functions");
const deploy_1 = require("../commands/functions/deploy");
const ls_1 = require("../commands/functions/ls");
const rm_1 = require("../commands/functions/rm");
const get_aws_region_1 = require("../get-aws-region");
const log_1 = require("../log");
const quit_1 = require("./quit");
const findFunctionName = async () => {
    const remotionLambdas = await (0, get_functions_1.getFunctions)({
        region: (0, get_aws_region_1.getAwsRegion)(),
        compatibleOnly: false,
    });
    const lambdasWithMatchingVersion = remotionLambdas.filter((l) => l.version === constants_1.CURRENT_VERSION);
    if (lambdasWithMatchingVersion.length === 0) {
        log_1.Log.error(`No lambda functions with version ${constants_1.CURRENT_VERSION} found in your account.`);
        if (remotionLambdas.length > 0) {
            log_1.Log.error('Other functions were found, but are not compatible with this version of the CLI.');
        }
        log_1.Log.info('Run');
        log_1.Log.info(`  npx ${constants_1.BINARY_NAME} ${functions_1.FUNCTIONS_COMMAND} ${deploy_1.FUNCTIONS_DEPLOY_SUBCOMMAND}`);
        log_1.Log.info(`to deploy a new lambda function.`);
        (0, quit_1.quit)(1);
    }
    if (lambdasWithMatchingVersion.length > 1) {
        log_1.Log.error('More than 1 lambda function found in your account. This is an error.');
        log_1.Log.info(`Delete extraneous lambda functions in your AWS console or run`);
        log_1.Log.info(`  npx ${constants_1.BINARY_NAME} ${functions_1.FUNCTIONS_COMMAND} ${rm_1.FUNCTIONS_RM_SUBCOMMAND} $(npx ${constants_1.BINARY_NAME} ${functions_1.FUNCTIONS_COMMAND} ${ls_1.FUNCTIONS_LS_SUBCOMMAND} -q) -y`);
        log_1.Log.info('to delete all lambda functions.');
        (0, quit_1.quit)(1);
    }
    const { functionName } = lambdasWithMatchingVersion[0];
    return functionName;
};
exports.findFunctionName = findFunctionName;
