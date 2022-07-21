"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewCommand = void 0;
const better_opn_1 = __importDefault(require("better-opn"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const get_env_1 = require("./get-env");
const get_input_props_1 = require("./get-input-props");
const initialize_render_cli_1 = require("./initialize-render-cli");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const start_server_1 = require("./preview-server/start-server");
const noop = () => undefined;
let liveEventsListener = null;
const waiters = [];
const setLiveEventsListener = (listener) => {
    liveEventsListener = listener;
    waiters.forEach((w) => w(listener));
};
const waitForLiveEventsListener = () => {
    if (liveEventsListener) {
        return Promise.resolve(liveEventsListener);
    }
    return new Promise((resolve) => {
        waiters.push((list) => {
            resolve(list);
        });
    });
};
const previewCommand = async () => {
    const file = parse_command_line_1.parsedCli._[1];
    if (!file) {
        log_1.Log.error('The preview command requires you to specify a root file. For example');
        log_1.Log.error('  npx remotion preview src/index.tsx');
        log_1.Log.error('See https://www.remotion.dev/docs/register-root for more information.');
        process.exit(1);
    }
    const { port: desiredPort } = parse_command_line_1.parsedCli;
    const fullPath = path_1.default.join(process.cwd(), file);
    await (0, initialize_render_cli_1.initializeRenderCli)('preview');
    let inputProps = (0, get_input_props_1.getInputProps)((newProps) => {
        waitForLiveEventsListener().then((listener) => {
            inputProps = newProps;
            listener.sendEventToClient({
                type: 'new-input-props',
                newProps,
            });
        });
    });
    const envVariables = await (0, get_env_1.getEnvironmentVariables)();
    const { port, liveEventsServer } = await (0, start_server_1.startServer)(path_1.default.resolve(__dirname, 'previewEntry.js'), fullPath, {
        getCurrentInputProps: () => inputProps,
        envVariables,
        port: desiredPort,
        maxTimelineTracks: remotion_1.Internals.getMaxTimelineTracks(),
    });
    setLiveEventsListener(liveEventsServer);
    (0, better_opn_1.default)(`http://localhost:${port}`);
    await new Promise(noop);
};
exports.previewCommand = previewCommand;
