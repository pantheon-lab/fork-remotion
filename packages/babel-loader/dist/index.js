"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceLoadersWithBabel = void 0;
const envPreset = [
    require.resolve('@babel/preset-env'),
    {
        targets: {
            chrome: '85',
        },
    },
];
function truthy(value) {
    return Boolean(value);
}
const replaceLoadersWithBabel = (conf) => {
    var _a, _b;
    return {
        ...conf,
        module: {
            ...conf.module,
            rules: ((_b = (_a = conf.module) === null || _a === void 0 ? void 0 : _a.rules) !== null && _b !== void 0 ? _b : []).map((rule) => {
                var _a, _b;
                if (rule === '...') {
                    return rule;
                }
                // All modules that use require.resolve need to be added to cli/src/load-config -> external array
                if ((_a = rule.test) === null || _a === void 0 ? void 0 : _a.toString().includes('.tsx')) {
                    return {
                        test: /\.tsx?$/,
                        use: [
                            {
                                loader: require.resolve('babel-loader'),
                                options: {
                                    presets: [
                                        envPreset,
                                        [
                                            require.resolve('@babel/preset-react'),
                                            {
                                                runtime: 'automatic',
                                            },
                                        ],
                                        [
                                            require.resolve('@babel/preset-typescript'),
                                            {
                                                runtime: 'automatic',
                                                isTSX: true,
                                                allExtensions: true,
                                            },
                                        ],
                                    ],
                                    plugins: [
                                        require.resolve('@babel/plugin-proposal-class-properties'),
                                        conf.mode === 'development'
                                            ? require.resolve('react-refresh/babel')
                                            : null,
                                    ].filter(truthy),
                                },
                            },
                            rule.use[1],
                        ].filter(truthy),
                    };
                }
                if ((_b = rule.test) === null || _b === void 0 ? void 0 : _b.toString().includes('.jsx')) {
                    return {
                        test: /\.jsx?$/,
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: [
                                envPreset,
                                [
                                    require.resolve('@babel/preset-react'),
                                    {
                                        runtime: 'automatic',
                                    },
                                ],
                            ],
                            plugins: [
                                require.resolve('@babel/plugin-proposal-class-properties'),
                            ],
                        },
                    };
                }
                return rule;
            }),
        },
    };
};
exports.replaceLoadersWithBabel = replaceLoadersWithBabel;
