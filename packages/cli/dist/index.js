"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliInternals = exports.cli = void 0;
const renderer_1 = require("@remotion/renderer");
const chalk_1 = require("./chalk");
const check_version_1 = require("./check-version");
const compositions_1 = require("./compositions");
const download_progress_1 = require("./download-progress");
const format_bytes_1 = require("./format-bytes");
const get_cli_options_1 = require("./get-cli-options");
const get_config_file_name_1 = require("./get-config-file-name");
const handle_common_errors_1 = require("./handle-common-errors");
const initialize_render_cli_1 = require("./initialize-render-cli");
const lambda_command_1 = require("./lambda-command");
const load_config_1 = require("./load-config");
const log_1 = require("./log");
const make_progress_bar_1 = require("./make-progress-bar");
const parse_command_line_1 = require("./parse-command-line");
const preview_1 = require("./preview");
const print_help_1 = require("./print-help");
const progress_bar_1 = require("./progress-bar");
const render_1 = require("./render");
const still_1 = require("./still");
const upgrade_1 = require("./upgrade");
const versions_1 = require("./versions");
const cli = async () => {
    const args = process.argv;
    const command = args[2];
    if (parse_command_line_1.parsedCli.help) {
        (0, print_help_1.printHelp)();
        process.exit(0);
    }
    // To check node version and to warn if node version is <12.10.0
    (0, check_version_1.checkNodeVersion)();
    if (command !== versions_1.VERSIONS_COMMAND) {
        await (0, versions_1.validateVersionsBeforeCommand)();
    }
    const errorSymbolicationLock = renderer_1.RenderInternals.registerErrorSymbolicationLock();
    try {
        if (command === 'compositions') {
            await (0, compositions_1.listCompositionsCommand)();
        }
        else if (command === 'preview') {
            await (0, preview_1.previewCommand)();
        }
        else if (command === 'lambda') {
            await (0, lambda_command_1.lambdaCommand)();
        }
        else if (command === 'render') {
            await (0, render_1.render)();
        }
        else if (command === 'still') {
            await (0, still_1.still)();
        }
        else if (command === 'upgrade') {
            await (0, upgrade_1.upgrade)();
        }
        else if (command === versions_1.VERSIONS_COMMAND) {
            await (0, versions_1.versionsCommand)();
        }
        else if (command === 'help') {
            (0, print_help_1.printHelp)();
            process.exit(0);
        }
        else {
            log_1.Log.error(`Command ${command} not found.`);
            (0, print_help_1.printHelp)();
            process.exit(1);
        }
    }
    catch (err) {
        log_1.Log.info();
        await (0, handle_common_errors_1.handleCommonError)(err);
        process.exit(1);
    }
    finally {
        renderer_1.RenderInternals.unlockErrorSymbolicationLock(errorSymbolicationLock);
    }
};
exports.cli = cli;
__exportStar(require("./render"), exports);
exports.CliInternals = {
    createOverwriteableCliOutput: progress_bar_1.createOverwriteableCliOutput,
    chalk: chalk_1.chalk,
    makeProgressBar: make_progress_bar_1.makeProgressBar,
    Log: log_1.Log,
    loadConfigFile: load_config_1.loadConfigFile,
    getCliOptions: get_cli_options_1.getCliOptions,
    parseCommandLine: parse_command_line_1.parseCommandLine,
    loadConfig: get_config_file_name_1.loadConfig,
    initializeRenderCli: initialize_render_cli_1.initializeRenderCli,
    BooleanFlags: parse_command_line_1.BooleanFlags,
    quietFlagProvided: parse_command_line_1.quietFlagProvided,
    parsedCli: parse_command_line_1.parsedCli,
    handleCommonError: handle_common_errors_1.handleCommonError,
    formatBytes: format_bytes_1.formatBytes,
    getFileSizeDownloadBar: download_progress_1.getFileSizeDownloadBar,
};
