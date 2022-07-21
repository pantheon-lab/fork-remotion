"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = exports.defaultConfigFileTypescript = exports.defaultConfigFileJavascript = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const load_config_1 = require("./load-config");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
exports.defaultConfigFileJavascript = 'remotion.config.js';
exports.defaultConfigFileTypescript = 'remotion.config.ts';
const loadConfig = () => {
    if (parse_command_line_1.parsedCli.config) {
        const fullPath = path_1.default.resolve(process.cwd(), parse_command_line_1.parsedCli.config);
        if (!(0, fs_1.existsSync)(fullPath)) {
            log_1.Log.error(`You specified a config file location of "${parse_command_line_1.parsedCli.config}" but no file under ${fullPath} was found.`);
            process.exit(1);
        }
        return (0, load_config_1.loadConfigFile)(parse_command_line_1.parsedCli.config, fullPath.endsWith('.js'));
    }
    if ((0, fs_1.existsSync)(path_1.default.resolve(process.cwd(), exports.defaultConfigFileTypescript))) {
        return (0, load_config_1.loadConfigFile)(exports.defaultConfigFileTypescript, false);
    }
    if ((0, fs_1.existsSync)(path_1.default.resolve(process.cwd(), exports.defaultConfigFileJavascript))) {
        return (0, load_config_1.loadConfigFile)(exports.defaultConfigFileJavascript, true);
    }
    return Promise.resolve(null);
};
exports.loadConfig = loadConfig;
