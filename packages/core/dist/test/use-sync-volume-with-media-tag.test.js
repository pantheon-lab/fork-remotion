"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const use_sync_volume_with_media_tag_1 = require("../use-sync-volume-with-media-tag");
const render_hook_1 = require("./render-hook");
(0, vitest_1.test)('has the volume been adapted', () => {
    var _a, _b;
    const addEventListener = vitest_1.vitest.fn();
    const removeEventListener = vitest_1.vitest.fn();
    const audioRef = {
        current: { volume: 0.5, addEventListener, removeEventListener },
    };
    const volume = 0.6;
    const volumePropFrame = 1;
    const actualVolume = 0.4;
    const initialProps = {
        volumePropFrame,
        actualVolume,
        volume,
        mediaRef: audioRef,
        mediaVolume: 1,
    };
    const { rerender } = (0, render_hook_1.renderHook)((hookProps) => (0, use_sync_volume_with_media_tag_1.useSyncVolumeWithMediaTag)(hookProps), {
        initialProps,
    });
    (0, vitest_1.expect)((_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.volume).toEqual(initialProps.volume);
    const newVolume = 0.5;
    rerender({
        ...initialProps,
        volume: newVolume,
    });
    (0, vitest_1.expect)((_b = audioRef.current) === null || _b === void 0 ? void 0 : _b.volume).toEqual(newVolume);
});
(0, vitest_1.test)('volume should not be adapted', () => {
    var _a;
    const addEventListener = vitest_1.vitest.fn();
    const removeEventListener = vitest_1.vitest.fn();
    const audioRef = {
        current: { volume: 0.4, addEventListener, removeEventListener },
    };
    const volume = 0.4;
    const volumePropFrame = 1;
    const actualVolume = 0.4;
    const initialProps = {
        volumePropFrame,
        actualVolume,
        volume,
        mediaRef: audioRef,
        mediaVolume: 1,
    };
    (0, render_hook_1.renderHook)((hookProps) => (0, use_sync_volume_with_media_tag_1.useSyncVolumeWithMediaTag)(hookProps), {
        initialProps,
    });
    (0, vitest_1.expect)((_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.volume).toEqual(initialProps.volume);
});
