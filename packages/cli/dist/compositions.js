"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCompositionsCommand = void 0;
const renderer_1 = require("@remotion/renderer");
const path_1 = __importDefault(require("path"));
const get_cli_options_1 = require("./get-cli-options");
const get_config_file_name_1 = require("./get-config-file-name");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const setup_cache_1 = require("./setup-cache");
const max = (arr) => {
    if (arr.length === 0) {
        throw new Error('Array of 0 length');
    }
    let biggest = arr[0];
    for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];
        if (elem > biggest) {
            biggest = elem;
        }
    }
    return biggest;
};
const listCompositionsCommand = async () => {
    const file = parse_command_line_1.parsedCli._[1];
    if (!file) {
        log_1.Log.error('The `compositions` command requires you to specify a root file. For example');
        log_1.Log.error('  npx remotion compositions src/index.tsx');
        log_1.Log.error('See https://www.remotion.dev/docs/register-root for more information.');
        process.exit(1);
    }
    const fullPath = path_1.default.join(process.cwd(), file);
    await (0, get_config_file_name_1.loadConfig)();
    const { browserExecutable, ffmpegExecutable, ffprobeExecutable, chromiumOptions, envVariables, inputProps, puppeteerTimeout, port, } = await (0, get_cli_options_1.getCliOptions)({ isLambda: false, type: 'get-compositions' });
    const bundled = await (0, setup_cache_1.bundleOnCli)({ fullPath, steps: ['bundling'] });
    const compositions = await (0, renderer_1.getCompositions)(bundled, {
        browserExecutable,
        ffmpegExecutable,
        ffprobeExecutable,
        chromiumOptions,
        envVariables,
        inputProps,
        timeoutInMilliseconds: puppeteerTimeout,
        port,
    });
    if (!(0, parse_command_line_1.quietFlagProvided)()) {
        log_1.Log.info();
        log_1.Log.info('The following compositions are available:');
        log_1.Log.info();
    }
    const firstColumnLength = max(compositions.map(({ id }) => id.length)) + 4;
    const secondColumnLength = 8;
    const thirdColumnLength = 15;
    if ((0, parse_command_line_1.quietFlagProvided)()) {
        log_1.Log.info(compositions.map((c) => c.id).join(' '));
        return;
    }
    log_1.Log.info(`${'Composition'.padEnd(firstColumnLength, ' ')}${'FPS'.padEnd(secondColumnLength)}${'Dimensions'.padEnd(thirdColumnLength, ' ')}Duration`);
    log_1.Log.info(compositions
        .map((comp) => {
        const isStill = comp.durationInFrames === 1;
        const dimensions = `${comp.width}x${comp.height}`;
        const fps = isStill ? '' : comp.fps.toString();
        const durationInSeconds = (comp.durationInFrames / comp.fps).toFixed(2);
        const formattedDuration = isStill
            ? 'Still'
            : `${comp.durationInFrames} (${durationInSeconds} sec)`;
        return [
            comp.id.padEnd(firstColumnLength, ' '),
            fps.padEnd(secondColumnLength, ' '),
            dimensions.padEnd(thirdColumnLength, ' '),
            formattedDuration,
        ].join('');
    })
        .join('\n'));
};
exports.listCompositionsCommand = listCompositionsCommand;
