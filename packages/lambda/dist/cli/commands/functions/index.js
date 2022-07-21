"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionsCommand = exports.FUNCTIONS_COMMAND = void 0;
const cli_1 = require("@remotion/cli");
const log_1 = require("@remotion/cli/dist/log");
const constants_1 = require("../../../shared/constants");
const quit_1 = require("../../helpers/quit");
const deploy_1 = require("./deploy");
const ls_1 = require("./ls");
const rm_1 = require("./rm");
const rmall_1 = require("./rmall");
exports.FUNCTIONS_COMMAND = 'functions';
const printFunctionsHelp = () => {
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.FUNCTIONS_COMMAND} <subcommand>`);
    log_1.Log.info();
    log_1.Log.info('Available subcommands:');
    log_1.Log.info('');
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.FUNCTIONS_COMMAND} ${ls_1.FUNCTIONS_LS_SUBCOMMAND}`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Lists the functions currently deployed'));
    log_1.Log.info('');
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.FUNCTIONS_COMMAND} ${deploy_1.FUNCTIONS_DEPLOY_SUBCOMMAND}`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Deploy a new Lambda function'));
    log_1.Log.info('');
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.FUNCTIONS_COMMAND} ${rm_1.FUNCTIONS_RM_SUBCOMMAND} <function-name>`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Delete a Lambda function'));
    log_1.Log.info('');
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.FUNCTIONS_COMMAND} ${rmall_1.FUNCTIONS_RMALL_SUBCOMMAND}`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Delete all functions in selected region'));
};
const functionsCommand = (args) => {
    if (args[0] === ls_1.FUNCTIONS_LS_SUBCOMMAND) {
        return (0, ls_1.functionsLsCommand)();
    }
    if (args[0] === rm_1.FUNCTIONS_RM_SUBCOMMAND) {
        return (0, rm_1.functionsRmCommand)(args.slice(1));
    }
    if (args[0] === rmall_1.FUNCTIONS_RMALL_SUBCOMMAND) {
        return (0, rmall_1.functionsRmallCommand)();
    }
    if (args[0] === deploy_1.FUNCTIONS_DEPLOY_SUBCOMMAND) {
        return (0, deploy_1.functionsDeploySubcommand)();
    }
    if (args[0]) {
        log_1.Log.error(`Subcommand ${args[0]} not found.`);
        printFunctionsHelp();
        (0, quit_1.quit)(1);
    }
    printFunctionsHelp();
};
exports.functionsCommand = functionsCommand;
