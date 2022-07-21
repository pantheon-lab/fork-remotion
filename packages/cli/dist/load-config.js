"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfigFile = void 0;
const bundler_1 = require("@remotion/bundler");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const log_1 = require("./log");
const loadConfigFile = async (configFileName, isJavascript) => {
    const resolved = path_1.default.resolve(process.cwd(), configFileName);
    const tsconfigJson = path_1.default.join(process.cwd(), 'tsconfig.json');
    if (!isJavascript && !fs_1.default.existsSync(tsconfigJson)) {
        log_1.Log.error('Could not find a tsconfig.json file in your project. Did you delete it? Create a tsconfig.json in the root of your project. Copy the default file from https://github.com/remotion-dev/template/blob/main/tsconfig.json.');
        process.exit(1);
    }
    const out = path_1.default.join(await fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'remotion-')), 'bundle.js');
    const result = await bundler_1.BundlerInternals.esbuild.build({
        platform: 'node',
        target: 'node14',
        bundle: true,
        entryPoints: [resolved],
        tsconfig: isJavascript ? undefined : tsconfigJson,
        absWorkingDir: process.cwd(),
        outfile: out,
        external: [
            'remotion',
            // Dependencies of babel-loader that trigger a warning when used
            'react-refresh/babel',
            '@babel/plugin-proposal-class-properties',
            '@babel/preset-typescript',
            '@babel/preset-react',
            'babel-loader',
            '@babel/preset-env',
        ],
    });
    if (result.errors.length > 0) {
        log_1.Log.error('Error in remotion.config.ts file');
        for (const err in result.errors) {
            log_1.Log.error(err);
        }
        process.exit(1);
    }
    const file = await fs_1.default.promises.readFile(out, 'utf8');
    // eslint-disable-next-line no-eval
    eval(file);
    await fs_1.default.promises.unlink(out);
    return resolved;
};
exports.loadConfigFile = loadConfigFile;
