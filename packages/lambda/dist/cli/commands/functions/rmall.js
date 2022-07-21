"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionsRmallCommand = exports.FUNCTIONS_RMALL_SUBCOMMAND = void 0;
const cli_1 = require("@remotion/cli");
const delete_function_1 = require("../../../api/delete-function");
const get_function_info_1 = require("../../../api/get-function-info");
const get_functions_1 = require("../../../api/get-functions");
const get_aws_region_1 = require("../../get-aws-region");
const confirm_1 = require("../../helpers/confirm");
const log_1 = require("../../log");
exports.FUNCTIONS_RMALL_SUBCOMMAND = 'rmall';
const LEFT_COL = 16;
const functionsRmallCommand = async () => {
    const region = (0, get_aws_region_1.getAwsRegion)();
    const functions = await (0, get_functions_1.getFunctions)({
        region,
        compatibleOnly: false,
    });
    for (const fun of functions) {
        const infoOutput = cli_1.CliInternals.createOverwriteableCliOutput(cli_1.CliInternals.quietFlagProvided());
        infoOutput.update('Getting function info...');
        const info = await (0, get_function_info_1.getFunctionInfo)({
            region,
            functionName: fun.functionName,
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
        await (0, delete_function_1.deleteFunction)({ region, functionName: fun.functionName });
        output.update('Deleted!\n');
    }
};
exports.functionsRmallCommand = functionsRmallCommand;
