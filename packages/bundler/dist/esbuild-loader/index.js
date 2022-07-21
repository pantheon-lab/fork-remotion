"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const esbuild_1 = require("esbuild");
const path_1 = __importDefault(require("path"));
const tsConfigPath = path_1.default.join(process.cwd(), 'tsconfig.json');
const isTsExtensionPtrn = /\.ts$/i;
const isTypescriptInstalled = () => {
    try {
        require.resolve('typescript');
        return true;
    }
    catch (err) {
        return false;
    }
};
async function ESBuildLoader(source) {
    var _a, _b, _c;
    const done = this.async();
    this.getOptions();
    const options = this.getOptions();
    const { implementation, ...esbuildTransformOptions } = options;
    if (implementation && typeof implementation.transform !== 'function') {
        done(new TypeError(`esbuild-loader: options.implementation.transform must be an ESBuild transform function. Received ${typeof implementation.transform}`));
        return;
    }
    const transform = (_a = implementation === null || implementation === void 0 ? void 0 : implementation.transform) !== null && _a !== void 0 ? _a : esbuild_1.transform;
    const transformOptions = {
        ...esbuildTransformOptions,
        target: (_b = options.target) !== null && _b !== void 0 ? _b : 'es2015',
        loader: (_c = options.loader) !== null && _c !== void 0 ? _c : 'js',
        sourcemap: this.sourceMap,
        sourcefile: this.resourcePath,
    };
    if (!('tsconfigRaw' in transformOptions) && isTypescriptInstalled()) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-imports
        const typescript = require('typescript');
        const tsConfig = typescript.readConfigFile(tsConfigPath, typescript.sys.readFile);
        transformOptions.tsconfigRaw = tsConfig.config;
    }
    // https://github.com/privatenumber/esbuild-loader/pull/107
    if (transformOptions.loader === 'tsx' &&
        isTsExtensionPtrn.test(this.resourcePath)) {
        transformOptions.loader = 'ts';
    }
    try {
        const { code, map } = await transform(source, transformOptions);
        done(null, code, map && JSON.parse(map));
    }
    catch (error) {
        done(error);
    }
}
exports.default = ESBuildLoader;
