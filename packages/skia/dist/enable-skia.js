"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableSkia = void 0;
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const enableSkia = (currentConfiguration) => {
    var _a, _b;
    return {
        ...currentConfiguration,
        plugins: [
            ...((_a = currentConfiguration.plugins) !== null && _a !== void 0 ? _a : []),
            new copy_webpack_plugin_1.default({
                patterns: [
                    { from: 'node_modules/canvaskit-wasm/bin/full/canvaskit.wasm' },
                ],
            }),
        ],
        resolve: {
            ...currentConfiguration.resolve,
            // FIXME: To fix missing modules in browser when using webassembly
            fallback: {
                fs: false,
                path: false,
            },
            extensions: [
                '.web.js',
                '.web.ts',
                '.web.tsx',
                '.js',
                '.ts',
                '.tsx',
                '...',
            ],
        },
        externals: {
            ...((_b = currentConfiguration.externals) !== null && _b !== void 0 ? _b : {}),
            'react-native-reanimated': "require('react-native-reanimated')",
            'react-native-reanimated/lib/reanimated2/core': "require('react-native-reanimated/lib/reanimated2/core')",
        },
    };
};
exports.enableSkia = enableSkia;
