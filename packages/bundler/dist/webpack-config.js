"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackConfig = void 0;
const crypto_1 = require("crypto");
const react_dom_1 = __importDefault(require("react-dom"));
const remotion_1 = require("remotion");
const webpack_1 = __importStar(require("webpack"));
const fast_refresh_1 = require("./fast-refresh");
const webpack_cache_1 = require("./webpack-cache");
const esbuild = require("esbuild");
if (!react_dom_1.default || !react_dom_1.default.version) {
    throw new Error('Could not find "react-dom" package. Did you install it?');
}
const reactDomVersion = react_dom_1.default.version.split('.')[0];
if (reactDomVersion === '0') {
    throw new Error(`Version ${reactDomVersion} of "react-dom" is not supported by Remotion`);
}
const shouldUseReactDomClient = parseInt(reactDomVersion, 10) >= 18;
const esbuildLoaderOptions = {
    target: 'chrome85',
    loader: 'tsx',
    implementation: esbuild,
};
function truthy(value) {
    return Boolean(value);
}
const webpackConfig = ({ entry, userDefinedComponent, outDir, environment, webpackOverride = (f) => f, onProgressUpdate, enableCaching = remotion_1.Internals.DEFAULT_WEBPACK_CACHE_ENABLED, envVariables, maxTimelineTracks, entryPoints, }) => {
    const conf = webpackOverride({
        optimization: {
            minimize: false,
        },
        experiments: {
            lazyCompilation: environment === 'production'
                ? false
                : {
                    entries: false,
                },
        },
        watchOptions: {
            aggregateTimeout: 0,
            ignored: ['**/.git/**', '**/node_modules/**'],
        },
        devtool: environment === 'development'
            ? 'cheap-module-source-map'
            : 'cheap-module-source-map',
        entry: [
            // Fast Refresh must come first,
            // because setup-environment imports ReactDOM.
            // If React DOM is imported before Fast Refresh, Fast Refresh does not work
            environment === 'development'
                ? require.resolve('./fast-refresh/runtime.js')
                : null,
            require.resolve('./setup-environment'),
            ...entryPoints,
            userDefinedComponent,
            require.resolve('../react-shim.js'),
            entry,
        ].filter(Boolean),
        mode: environment,
        plugins: environment === 'development'
            ? [
                new fast_refresh_1.ReactFreshWebpackPlugin(),
                new webpack_1.default.HotModuleReplacementPlugin(),
                new webpack_1.default.DefinePlugin({
                    'process.env.MAX_TIMELINE_TRACKS': maxTimelineTracks,
                    [`process.env.${remotion_1.Internals.ENV_VARIABLES_ENV_NAME}`]: JSON.stringify(envVariables),
                }),
            ]
            : [
                new webpack_1.ProgressPlugin((p) => {
                    if (onProgressUpdate) {
                        onProgressUpdate(Number((p * 100).toFixed(2)));
                    }
                }),
            ],
        output: {
            hashFunction: 'xxhash64',
            globalObject: 'this',
            filename: 'bundle.js',
            devtoolModuleFilenameTemplate: '[resource-path]',
            assetModuleFilename: environment === 'development' ? '[path][name][ext]' : '[hash][ext]',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                // Only one version of react
                'react/jsx-runtime': require.resolve('react/jsx-runtime'),
                react: require.resolve('react'),
                'react-dom/client': shouldUseReactDomClient
                    ? require.resolve('react-dom/client')
                    : require.resolve('react-dom'),
                remotion: require.resolve('remotion'),
                'react-native$': 'react-native-web',
            },
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [require.resolve('style-loader'), require.resolve('css-loader')],
                    type: 'javascript/auto',
                },
                {
                    test: /\.(png|svg|jpg|jpeg|webp|gif|bmp|webm|mp4|mov|mp3|m4a|wav|aac)$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: require.resolve('./esbuild-loader/index.js'),
                            options: esbuildLoaderOptions,
                        },
                        // Keep the order to match babel-loader
                        environment === 'development'
                            ? {
                                loader: require.resolve('./fast-refresh/loader.js'),
                            }
                            : null,
                    ].filter(truthy),
                },
                {
                    test: /\.(woff(2)?|otf|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: require.resolve('./esbuild-loader/index.js'),
                            options: esbuildLoaderOptions,
                        },
                        environment === 'development'
                            ? {
                                loader: require.resolve('./fast-refresh/loader.js'),
                            }
                            : null,
                    ].filter(truthy),
                },
            ],
        },
    });
    const hash = (0, crypto_1.createHash)('md5').update(JSON.stringify(conf)).digest('hex');
    return [
        hash,
        {
            ...conf,
            cache: enableCaching
                ? {
                    type: 'filesystem',
                    name: (0, webpack_cache_1.getWebpackCacheName)(environment, hash),
                    version: hash,
                }
                : false,
            output: {
                ...conf.output,
                path: outDir,
            },
        },
    ];
};
exports.webpackConfig = webpackConfig;
