"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionsLsCommand = exports.FUNCTIONS_LS_SUBCOMMAND = void 0;
const cli_1 = require("@remotion/cli");
const log_1 = require("@remotion/cli/dist/log");
const get_functions_1 = require("../../../api/get-functions");
const get_aws_region_1 = require("../../get-aws-region");
const NAME_COLS = 70;
const MEMORY_COLS = 15;
const DISK_COLS = 15;
const TIMEOUT_COLS = 15;
const VERSION_COLS = 15;
exports.FUNCTIONS_LS_SUBCOMMAND = 'ls';
const functionsLsCommand = async () => {
    const region = (0, get_aws_region_1.getAwsRegion)();
    const fetchingOutput = cli_1.CliInternals.createOverwriteableCliOutput(cli_1.CliInternals.quietFlagProvided());
    fetchingOutput.update('Getting functions...');
    const functions = await (0, get_functions_1.getFunctions)({
        region,
        compatibleOnly: false,
    });
    if (cli_1.CliInternals.quietFlagProvided()) {
        if (functions.length === 0) {
            log_1.Log.info('()');
            return;
        }
        log_1.Log.info(functions.map((f) => f.functionName).join(' '));
        return;
    }
    fetchingOutput.update('Getting function info...');
    const pluralized = functions.length === 1 ? 'function' : 'functions';
    fetchingOutput.update(`${functions.length} ${pluralized} in the ${region} region`);
    log_1.Log.info();
    log_1.Log.info(cli_1.CliInternals.chalk.gray([
        'Name'.padEnd(NAME_COLS, ' '),
        'Version'.padEnd(VERSION_COLS, ' '),
        'Disk (MB)'.padEnd(MEMORY_COLS, ' '),
        'Memory (MB)'.padEnd(MEMORY_COLS, ' '),
        'Timeout (sec)'.padEnd(TIMEOUT_COLS, ' '),
    ].join('')));
    for (const datapoint of functions) {
        log_1.Log.info([
            datapoint.functionName.padEnd(NAME_COLS, ' '),
            datapoint.version
                ? datapoint.version.padEnd(VERSION_COLS, ' ')
                : 'Error'.padEnd(VERSION_COLS, ' '),
            String(datapoint.diskSizeInMb).padEnd(DISK_COLS, ' '),
            String(datapoint.memorySizeInMb).padEnd(MEMORY_COLS, ' '),
            String(datapoint.timeoutInSeconds).padEnd(TIMEOUT_COLS, ' '),
        ].join(''));
    }
};
exports.functionsLsCommand = functionsLsCommand;
