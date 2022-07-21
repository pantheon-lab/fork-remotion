"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackOverride = void 0;
const path_1 = __importDefault(require("path"));
const WEBPACK_OR_ESBUILD = 'esbuild';
const webpackOverride = (currentConfiguration) => {
    var _a, _b;
    const replaced = (() => {
        if (WEBPACK_OR_ESBUILD === 'webpack') {
            const { replaceLoadersWithBabel } = require(path_1.default.join(__dirname, '..', '..', 'example', 'node_modules', '@remotion/babel-loader'));
            return replaceLoadersWithBabel(currentConfiguration);
        }
        return currentConfiguration;
    })();
    return {
        ...replaced,
        module: {
            ...replaced.module,
            rules: [
                ...((_b = (_a = replaced.module) === null || _a === void 0 ? void 0 : _a.rules) !== null && _b !== void 0 ? _b : []),
                {
                    test: /\.mdx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    [
                                        '@babel/preset-react',
                                        {
                                            runtime: 'automatic',
                                        },
                                    ],
                                ],
                            },
                        },
                        'mdx-loader',
                    ],
                },
            ],
        },
        resolve: {
            ...replaced.resolve,
            alias: {
                ...replaced.resolve.alias,
                lib: path_1.default.join(process.cwd(), 'src', 'lib'),
            },
        },
    };
};
exports.webpackOverride = webpackOverride;
