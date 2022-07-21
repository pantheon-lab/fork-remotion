"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotasCommand = exports.QUOTAS_COMMAND = void 0;
const cli_1 = require("@remotion/cli");
const log_1 = require("@remotion/cli/dist/log");
const defaults_1 = require("../../../defaults");
const increase_1 = require("./increase");
const list_1 = require("./list");
exports.QUOTAS_COMMAND = 'quotas';
const printHelp = () => {
    log_1.Log.info('Available commands:');
    log_1.Log.info();
    log_1.Log.info(`npx ${defaults_1.BINARY_NAME} ${exports.QUOTAS_COMMAND}`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('List relevant AWS Lambda quotas.'));
    log_1.Log.info();
    log_1.Log.info(`npx ${defaults_1.BINARY_NAME} ${exports.QUOTAS_COMMAND} ${increase_1.INCREASE_SUBCOMMAND}`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Increase Lambda quotas.'));
};
const quotasCommand = (args) => {
    if (args.filter(Boolean).length === 0) {
        return (0, list_1.quotasListCommand)();
    }
    if (args[0] === increase_1.INCREASE_SUBCOMMAND) {
        return (0, increase_1.quotasIncreaseCommand)();
    }
    log_1.Log.error('Subcommand ' + args[0] + ' not found.');
    printHelp();
};
exports.quotasCommand = quotasCommand;
