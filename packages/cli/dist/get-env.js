"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariables = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
function getProcessEnv() {
    const env = {};
    const validKeys = Object.keys(process.env).filter((key) => key.startsWith('REMOTION_'));
    for (const key of validKeys) {
        env[key] = process.env[key];
    }
    return env;
}
const getEnvForEnvFile = async (processEnv, envFile) => {
    try {
        const envFileData = await fs_1.default.promises.readFile(envFile);
        return {
            ...processEnv,
            ...dotenv_1.default.parse(envFileData),
        };
    }
    catch (err) {
        log_1.Log.error(`Your .env file at ${envFile} could not not be parsed.`);
        log_1.Log.error(err);
        process.exit(1);
    }
};
const getEnvironmentVariables = () => {
    const processEnv = getProcessEnv();
    if (parse_command_line_1.parsedCli['env-file']) {
        const envFile = path_1.default.resolve(process.cwd(), parse_command_line_1.parsedCli['env-file']);
        if (!fs_1.default.existsSync(envFile)) {
            log_1.Log.error('You passed a --env-file but it could not be found.');
            log_1.Log.error('We looked for the file at:', envFile);
            log_1.Log.error('Check that your path is correct and try again.');
            process.exit(1);
        }
        return getEnvForEnvFile(processEnv, envFile);
    }
    const configFileSetting = remotion_1.Internals.getDotEnvLocation();
    if (configFileSetting) {
        const envFile = path_1.default.resolve(process.cwd(), configFileSetting);
        if (!fs_1.default.existsSync(envFile)) {
            log_1.Log.error('You specifed a custom .env file using `Config.Rendering.setDotEnvLocation()` in the config file but it could not be found');
            log_1.Log.error('We looked for the file at:', envFile);
            log_1.Log.error('Check that your path is correct and try again.');
            process.exit(1);
        }
        return getEnvForEnvFile(processEnv, envFile);
    }
    const defaultEnvFile = path_1.default.resolve(process.cwd(), '.env');
    if (!fs_1.default.existsSync(defaultEnvFile)) {
        return Promise.resolve(processEnv);
    }
    return getEnvForEnvFile(processEnv, defaultEnvFile);
};
exports.getEnvironmentVariables = getEnvironmentVariables;
