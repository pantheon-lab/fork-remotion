"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policiesCommand = exports.POLICIES_COMMAND = void 0;
const cli_1 = require("@remotion/cli");
const constants_1 = require("../../../shared/constants");
const quit_1 = require("../../helpers/quit");
const log_1 = require("../../log");
const role_1 = require("./role");
const user_1 = require("./user");
const validate_1 = require("./validate");
exports.POLICIES_COMMAND = 'policies';
const printPoliciesHelp = () => {
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.POLICIES_COMMAND} <subcommand>`);
    log_1.Log.info();
    log_1.Log.info('Available subcommands:');
    log_1.Log.info('');
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.POLICIES_COMMAND} ${user_1.USER_SUBCOMMAND}`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Print the suggested policy to be applied to the user that is attached to the access token.'));
    log_1.Log.info();
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.POLICIES_COMMAND} ${role_1.ROLE_SUBCOMMAND}`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Print the suggested policy to be applied to the role that is attached to the lambda function.'));
    log_1.Log.info();
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.POLICIES_COMMAND} ${validate_1.VALIDATE_SUBCOMMAND}`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Validate the current policies setup is correct by running tests using the AWS policy simulator.'));
};
const policiesCommand = (args) => {
    if (args[0] === user_1.USER_SUBCOMMAND) {
        return (0, user_1.userSubcommand)();
    }
    if (args[0] === role_1.ROLE_SUBCOMMAND) {
        return (0, role_1.roleSubcommand)();
    }
    if (args[0] === validate_1.VALIDATE_SUBCOMMAND) {
        return (0, validate_1.validateSubcommand)();
    }
    if (args[0]) {
        log_1.Log.error(`Subcommand ${args[0]} not found.`);
        printPoliciesHelp();
        (0, quit_1.quit)(1);
    }
    printPoliciesHelp();
};
exports.policiesCommand = policiesCommand;
