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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @vitest-environment jsdom
 */
const react_1 = require("@testing-library/react");
const react_2 = __importStar(require("react"));
const vitest_1 = require("vitest");
const audio_1 = require("../audio");
const CanUseRemotionHooks_1 = require("../CanUseRemotionHooks");
const internals_1 = require("../internals");
const Wrapper = ({ children }) => {
    const compositions = (0, react_2.useContext)(internals_1.Internals.CompositionManager);
    return ((0, jsx_runtime_1.jsx)(CanUseRemotionHooks_1.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(internals_1.Internals.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(internals_1.Internals.CompositionManager.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            , { 
                // eslint-disable-next-line react/jsx-no-constructed-context-values
                value: {
                    ...compositions,
                    compositions: [
                        {
                            height: 1080,
                            width: 1080,
                            fps: 30,
                            durationInFrames: 30,
                            id: 'markup',
                            nonce: 0,
                            component: react_2.default.lazy(() => Promise.resolve({
                                default: (() => null),
                            })),
                            defaultProps: undefined,
                            folderName: null,
                            parentFolderName: null,
                        },
                    ],
                    currentComposition: 'markup',
                }, children: children }) }) }));
};
(0, vitest_1.describe)('Render correctly with props', () => {
    (0, vitest_1.test)('It should render Audio without startFrom / endAt props', () => {
        (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(audio_1.Audio, { src: "test", volume: 1 }) }))).not.toThrow();
    });
    (0, vitest_1.test)('It should render Audio with startAt  props', () => {
        (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(audio_1.Audio, { src: "test", volume: 1, startFrom: 10 }) }))).not.toThrow();
    });
    (0, vitest_1.test)('It should render Audio with endAt props', () => {
        (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(audio_1.Audio, { src: "test", volume: 1, endAt: 10 }) }))).not.toThrow();
    });
    (0, vitest_1.test)('It should render Audio with startFrom and endAt props', () => {
        (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(audio_1.Audio, { src: "test", volume: 1, startFrom: 10, endAt: 20 }) }))).not.toThrow();
    });
});
