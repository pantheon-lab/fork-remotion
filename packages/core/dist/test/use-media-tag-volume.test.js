"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const use_media_tag_volume_1 = require("../use-media-tag-volume");
const render_hook_1 = require("./render-hook");
(0, vitest_1.describe)('Should update state when volume changes', () => {
    const setState = vitest_1.vitest.fn();
    const useStateSpy = vitest_1.vitest.spyOn(react_1.default, 'useState');
    (0, vitest_1.beforeEach)(() => {
        // @ts-expect-error
        useStateSpy.mockImplementation((init) => [init, setState]);
    });
    (0, vitest_1.afterEach)(() => {
        useStateSpy.mockRestore();
    });
    vitest_1.test.skip('has the volume been set', () => {
        const addEventListener = vitest_1.vitest.fn();
        const removeEventListener = vitest_1.vitest.fn();
        let audioRef = {
            current: { volume: 0.5, addEventListener, removeEventListener },
        };
        const { rerender } = (0, render_hook_1.renderHook)(({ mediaRef }) => (0, use_media_tag_volume_1.useMediaTagVolume)(mediaRef), {
            initialProps: { mediaRef: audioRef },
        });
        (0, vitest_1.expect)(setState).toHaveBeenCalledWith(0.5);
        audioRef = {
            current: { ...audioRef.current, volume: 0.75 },
        };
        rerender({ mediaRef: audioRef });
        (0, vitest_1.expect)(setState).toHaveBeenCalledWith(0.75);
        (0, vitest_1.expect)(addEventListener).toHaveBeenCalledWith('volumechange', vitest_1.expect.anything());
        (0, vitest_1.expect)(removeEventListener).toHaveBeenCalledWith('volumechange', vitest_1.expect.anything());
    });
});
(0, vitest_1.test)('Should listen for volume changes', () => {
    const addEventListener = vitest_1.vitest.fn();
    const removeEventListener = vitest_1.vitest.fn();
    const audioRef = {
        current: { volume: 0.5, addEventListener, removeEventListener },
    };
    (0, render_hook_1.renderHook)(({ mediaRef }) => (0, use_media_tag_volume_1.useMediaTagVolume)(mediaRef), {
        initialProps: { mediaRef: audioRef },
    });
    (0, vitest_1.expect)(addEventListener).toHaveBeenCalledTimes(1);
});
