"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundle = exports.getConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const util_1 = require("util");
const webpack_1 = __importDefault(require("webpack"));
const copy_dir_1 = require("./copy-dir");
const index_html_1 = require("./index-html");
const webpack_config_1 = require("./webpack-config");
const entry = require.resolve('./renderEntry');
const promisified = (0, util_1.promisify)(webpack_1.default);
const prepareOutDir = async (specified) => {
    if (specified) {
        await fs_1.default.promises.mkdir(specified, { recursive: true });
        return specified;
    }
    return fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'react-motion-graphics'));
};
const trimLeadingSlash = (p) => {
    if (p.startsWith('/')) {
        return trimLeadingSlash(p.substr(1));
    }
    return p;
};
const trimTrailingSlash = (p) => {
    if (p.endsWith('/')) {
        return trimTrailingSlash(p.substr(0, p.length - 1));
    }
    return p;
};
const getConfig = (outDir, entryPoint, onProgressUpdate, options) => {
    var _a, _b;
    return (0, webpack_config_1.webpackConfig)({
        entry,
        userDefinedComponent: entryPoint,
        outDir,
        environment: 'production',
        webpackOverride: (_a = options === null || options === void 0 ? void 0 : options.webpackOverride) !== null && _a !== void 0 ? _a : remotion_1.Internals.defaultOverrideFunction,
        onProgressUpdate,
        enableCaching: (_b = options === null || options === void 0 ? void 0 : options.enableCaching) !== null && _b !== void 0 ? _b : remotion_1.Internals.DEFAULT_WEBPACK_CACHE_ENABLED,
        maxTimelineTracks: 15,
        // For production, the variables are set dynamically
        envVariables: {},
        entryPoints: [],
    });
};
exports.getConfig = getConfig;
const bundle = async (entryPoint, onProgressUpdate, options) => {
    var _a, _b;
    const outDir = await prepareOutDir((_a = options === null || options === void 0 ? void 0 : options.outDir) !== null && _a !== void 0 ? _a : null);
    const [, config] = (0, exports.getConfig)(outDir, entryPoint, onProgressUpdate, options);
    const output = await promisified([config]);
    if (!output) {
        throw new Error('Expected webpack output');
    }
    const { errors } = output.toJson();
    if (errors !== undefined && errors.length > 0) {
        throw new Error(errors[0].message + '\n' + errors[0].details);
    }
    const baseDir = (_b = options === null || options === void 0 ? void 0 : options.publicPath) !== null && _b !== void 0 ? _b : '/';
    const publicDir = '/' +
        [trimTrailingSlash(trimLeadingSlash(baseDir)), 'public']
            .filter(Boolean)
            .join('/');
    const from = path_1.default.join(process.cwd(), 'public');
    const to = path_1.default.join(outDir, 'public');
    if (fs_1.default.existsSync(from)) {
        await (0, copy_dir_1.copyDir)(from, to);
    }
    const html = (0, index_html_1.indexHtml)(publicDir, baseDir, null, null);
    fs_1.default.writeFileSync(path_1.default.join(outDir, 'index.html'), html);
    return outDir;
};
exports.bundle = bundle;
