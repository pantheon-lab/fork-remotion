"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRenderCli = void 0;
const get_config_file_name_1 = require("./get-config-file-name");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const initializeRenderCli = async (type) => {
    const appliedName = await (0, get_config_file_name_1.loadConfig)();
    if (appliedName) {
        log_1.Log.verbose(`Applied configuration from ${appliedName}.`);
    }
    else {
        log_1.Log.verbose('No config file loaded.');
    }
    (0, parse_command_line_1.parseCommandLine)(type);
};
exports.initializeRenderCli = initializeRenderCli;
