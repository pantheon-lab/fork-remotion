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
const vitest_1 = require("vitest");
const internals_1 = require("../internals");
const use_media_in_timeline_1 = require("../use-media-in-timeline");
const useVideoConfigModule = __importStar(require("../use-video-config"));
const render_hook_1 = require("./render-hook");
(0, vitest_1.beforeAll)(() => {
    vitest_1.vitest
        .spyOn(useVideoConfigModule, 'useVideoConfig')
        .mockImplementation(() => ({
        width: 10,
        height: 10,
        fps: 30,
        durationInFrames: 100,
        id: 'hithere',
        defaultProps: () => ({}),
    }));
});
(0, vitest_1.afterAll)(() => {
    vitest_1.vitest.spyOn(useVideoConfigModule, 'useVideoConfig').mockClear();
});
(0, vitest_1.test)('useMediaInTimeline registers and unregisters new sequence', () => {
    const registerSequence = vitest_1.vitest.fn();
    const unregisterSequence = vitest_1.vitest.fn();
    const wrapper = ({ children }) => ((0, jsx_runtime_1.jsx)(internals_1.Internals.CompositionManager.Provider, { value: 
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        {
            registerSequence,
            unregisterSequence,
        }, children: children }));
    const audioRef = {
        current: { volume: 0.5 },
    };
    const { unmount } = (0, render_hook_1.renderHook)(() => (0, use_media_in_timeline_1.useMediaInTimeline)({
        volume: 1,
        src: 'test',
        mediaVolume: 1,
        mediaType: 'audio',
        mediaRef: audioRef,
    }), {
        wrapper,
    });
    (0, vitest_1.expect)(registerSequence).toHaveBeenCalled();
    unmount();
    (0, vitest_1.expect)(unregisterSequence).toHaveBeenCalled();
});
