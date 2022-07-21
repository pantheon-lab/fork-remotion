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
const useAudioFrameModule = __importStar(require("../audio/use-audio-frame"));
const use_audio_frame_1 = require("../audio/use-audio-frame");
const Sequence_1 = require("../Sequence");
const useFrameModule = __importStar(require("../use-current-frame"));
const render_hook_1 = require("./render-hook");
vitest_1.test.skip('Media starts at 0 if it is outside a sequence', () => {
    const wrapper = ({ children }) => ((0, jsx_runtime_1.jsx)(Sequence_1.SequenceContext.Provider, { value: null, children: children }));
    const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useMediaStartsAt)(), { wrapper });
    (0, vitest_1.expect)(result.current).toEqual(0);
});
vitest_1.test.skip('Media start is shifted back based on sequence', () => {
    const mockSequence = {
        cumulatedFrom: 0,
        relativeFrom: -100,
        parentFrom: 0,
        durationInFrames: 0,
        id: 'mock',
    };
    const wrapper = ({ children }) => ((0, jsx_runtime_1.jsx)(Sequence_1.SequenceContext.Provider, { value: mockSequence, children: children }));
    const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useMediaStartsAt)(), { wrapper });
    (0, vitest_1.expect)(result.current).toEqual(-100);
});
(0, vitest_1.describe)('useFrameForVolumeProp hook tests', () => {
    (0, vitest_1.beforeAll)(() => {
        vitest_1.vitest
            .spyOn(useAudioFrameModule, 'useMediaStartsAt')
            .mockImplementation(() => -10);
    });
    (0, vitest_1.afterAll)(() => {
        vitest_1.vitest.spyOn(useAudioFrameModule, 'useMediaStartsAt').mockRestore();
    });
    vitest_1.test.skip('Media not mounted', () => {
        vitest_1.vitest.spyOn(useFrameModule, 'useCurrentFrame').mockImplementation(() => 9);
        const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useFrameForVolumeProp)());
        (0, vitest_1.expect)(result.current).toEqual(-1);
    });
    vitest_1.test.skip('Media mounted', () => {
        vitest_1.vitest
            .spyOn(useFrameModule, 'useCurrentFrame')
            .mockImplementation(() => 10);
        const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useFrameForVolumeProp)());
        (0, vitest_1.expect)(result.current).toEqual(0);
    });
    vitest_1.test.skip('Media mounted + 1 frame', () => {
        vitest_1.vitest
            .spyOn(useFrameModule, 'useCurrentFrame')
            .mockImplementation(() => 11);
        const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useFrameForVolumeProp)());
        (0, vitest_1.expect)(result.current).toEqual(1);
    });
});
