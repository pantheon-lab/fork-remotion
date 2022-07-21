"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPassedOutputLocation = void 0;
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const getUserPassedOutputLocation = () => {
    if (!parse_command_line_1.parsedCli._[3]) {
        log_1.Log.error('Pass an extra argument <output-filename>.');
        process.exit(1);
    }
    const filename = parse_command_line_1.parsedCli._[3];
    return filename;
};
exports.getUserPassedOutputLocation = getUserPassedOutputLocation;
