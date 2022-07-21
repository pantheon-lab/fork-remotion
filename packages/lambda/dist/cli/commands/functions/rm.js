"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionsRmCommand = exports.FUNCTIONS_RM_SUBCOMMAND = void 0;
const cli_1 = require("@remotion/cli");
const delete_function_1 = require("../../../api/delete-function");
const get_function_info_1 = require("../../../api/get-function-info");
const constants_1 = require("../../../shared/constants");
const get_aws_region_1 = require("../../get-aws-region");
const confirm_1 = require("../../helpers/confirm");
const quit_1 = require("../../helpers/quit");
const log_1 = require("../../log");
const index_1 = require("./index");
const ls_1 = require("./ls");
exports.FUNCTIONS_RM_SUBCOMMAND = 'rm';
const LEFT_COL = 16;
const functionsRmCommand = async (args) => {
    if (args.length === 0) {
        log_1.Log.error('No function name passed.');
        log_1.Log.error('Pass another argument which is the name of the function you would like to remove.');
        log_1.Log.info(`You can run \`${constants_1.BINARY_NAME} ${index_1.FUNCTIONS_COMMAND} ${ls_1.FUNCTIONS_LS_SUBCOMMAND}\` to see a list of deployed Lambda functions.`);
        (0, quit_1.quit)(1);
    }
    if (args[0] === '()') {
        log_1.Log.info('No functions to remove.');
        return;
    }
    const region = (0, get_aws_region_1.getAwsRegion)();
    for (const functionName of args) {
        const infoOutput = cli_1.CliInternals.createOverwriteableCliOutput(cli_1.CliInternals.quietFlagProvided());
        infoOutput.update('Getting function info...');
        const info = await (0, get_function_info_1.getFunctionInfo)({
            region,
            functionName,
        });
        infoOutput.update([
            'Function name: '.padEnd(LEFT_COL, ' ') + ' ' + info.functionName,
            'Memory: '.padEnd(LEFT_COL, ' ') + ' ' + info.memorySizeInMb + 'MB',
            'Timeout: '.padEnd(LEFT_COL, ' ') + ' ' + info.timeoutInSeconds + 'sec',
            'Version: '.padEnd(LEFT_COL, ' ') + ' ' + info.version,
        ].join('\n'));
        log_1.Log.info();
        await (0, confirm_1.confirmCli)({ delMessage: 'Delete? (Y/n)', allowForceFlag: true });
        const output = cli_1.CliInternals.createOverwriteableCliOutput(cli_1.CliInternals.quietFlagProvided());
        output.update('Deleting...');
        await (0, delete_function_1.deleteFunction)({ region, functionName });
        output.update('Deleted!\n');
    }
};
exports.functionsRmCommand = functionsRmCommand;
