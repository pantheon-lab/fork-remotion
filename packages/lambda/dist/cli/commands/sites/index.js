"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitesCommand = exports.SITES_COMMAND = void 0;
const cli_1 = require("@remotion/cli");
const log_1 = require("@remotion/cli/dist/log");
const constants_1 = require("../../../shared/constants");
const quit_1 = require("../../helpers/quit");
const create_1 = require("./create");
const ls_1 = require("./ls");
const rm_1 = require("./rm");
const rmall_1 = require("./rmall");
exports.SITES_COMMAND = 'sites';
const printSitesHelp = () => {
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.SITES_COMMAND} <subcommand>`);
    log_1.Log.info();
    log_1.Log.info('Available subcommands:');
    log_1.Log.info();
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.SITES_COMMAND} ${create_1.SITES_CREATE_SUBCOMMAND} <entry-point>`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Creates a new site based on a Remotion project'));
    log_1.Log.info();
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.SITES_COMMAND} ${ls_1.SITES_LS_SUBCOMMAND}`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Lists the sites currently deployed'));
    log_1.Log.info();
    log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.SITES_COMMAND} ${rm_1.SITES_RM_COMMAND} <site-id>`);
    log_1.Log.info(cli_1.CliInternals.chalk.gray('Remove a site from the S3 bucket.'));
};
const sitesCommand = (args) => {
    if (args[0] === ls_1.SITES_LS_SUBCOMMAND) {
        return (0, ls_1.sitesLsSubcommand)();
    }
    if (args[0] === rm_1.SITES_RM_COMMAND) {
        return (0, rm_1.sitesRmSubcommand)(args.slice(1));
    }
    if (args[0] === rmall_1.SITES_RMALL_COMMAND) {
        return (0, rmall_1.sitesRmallSubcommand)();
    }
    if (args[0] === create_1.SITES_CREATE_SUBCOMMAND) {
        return (0, create_1.sitesCreateSubcommand)(args.slice(1));
    }
    if (args[0]) {
        log_1.Log.error(`Subcommand ${args[0]} not found.`);
        printSitesHelp();
        (0, quit_1.quit)(1);
    }
    printSitesHelp();
};
exports.sitesCommand = sitesCommand;
