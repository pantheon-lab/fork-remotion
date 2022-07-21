"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputProps = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const getInputProps = (onUpdate) => {
    if (!parse_command_line_1.parsedCli.props) {
        return {};
    }
    const jsonFile = path_1.default.resolve(process.cwd(), parse_command_line_1.parsedCli.props);
    try {
        if (fs_1.default.existsSync(jsonFile)) {
            const rawJsonData = fs_1.default.readFileSync(jsonFile, 'utf-8');
            fs_1.default.watchFile(jsonFile, { interval: 100 }, () => {
                try {
                    onUpdate(JSON.parse(fs_1.default.readFileSync(jsonFile, 'utf-8')));
                    log_1.Log.info(`Updated input props from ${jsonFile}.`);
                }
                catch (err) {
                    log_1.Log.error(`${jsonFile} contains invalid JSON. Did not apply new input props.`);
                }
            });
            return JSON.parse(rawJsonData);
        }
        return JSON.parse(parse_command_line_1.parsedCli.props);
    }
    catch (err) {
        log_1.Log.error('You passed --props but it was neither valid JSON nor a file path to a valid JSON file.');
        log_1.Log.info('Got the following value:', parse_command_line_1.parsedCli.props);
        log_1.Log.error('Check that your input is parseable using `JSON.parse` and try again.');
        if (os_1.default.platform() === 'win32') {
            log_1.Log.warn('Note: Windows handles escaping of quotes very weirdly in the command line.');
            log_1.Log.warn('This might have led to you having this problem.');
            log_1.Log.warn('Consider using the alternative API for --props which is to pass');
            log_1.Log.warn('a path to a JSON file:');
            log_1.Log.warn('  --props=path/to/props.json');
        }
        process.exit(1);
    }
};
exports.getInputProps = getInputProps;
