"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const calculate_ffmpeg_filters_1 = require("../calculate-ffmpeg-filters");
const src = '/var/folders/hl/p8pg9kw15dbg3l7dbpn0scc80000gn/T/react-motion-graphicsh871Pk/1fe4a495500e1658167982183be07231.mp4';
const asset = {
    type: 'video',
    src,
    duration: 20,
    startInVideo: 0,
    trimLeft: 0,
    volume: 1,
    id: '1',
    playbackRate: 1,
};
(0, vitest_1.test)('Should create a basic filter correctly', () => {
    (0, vitest_1.expect)((0, calculate_ffmpeg_filters_1.calculateFfmpegFilter)({
        fps: 30,
        asset: {
            ...asset,
            duration: 200,
        },
        durationInFrames: 100,
        channels: 1,
        assetDuration: 10,
    })).toBe('[0:a]aformat=sample_fmts=s32:sample_rates=48000,atrim=0.000000:6.666667[a0]');
});
(0, vitest_1.test)('Trim the end', () => {
    (0, vitest_1.expect)((0, calculate_ffmpeg_filters_1.calculateFfmpegFilter)({
        fps: 30,
        asset,
        durationInFrames: 100,
        channels: 1,
        assetDuration: 10,
    })).toBe('[0:a]aformat=sample_fmts=s32:sample_rates=48000,atrim=0.000000:0.666667,apad=pad_len=128000[a0]');
});
(0, vitest_1.test)('Should handle trim correctly', () => {
    (0, vitest_1.expect)((0, calculate_ffmpeg_filters_1.calculateFfmpegFilter)({
        fps: 30,
        asset: {
            ...asset,
            trimLeft: 10,
        },
        durationInFrames: 100,
        channels: 1,
        assetDuration: 10,
    })).toBe('[0:a]aformat=sample_fmts=s32:sample_rates=48000,atrim=0.333333:1.000000,apad=pad_len=128000[a0]');
});
(0, vitest_1.test)('Should add padding if audio is too short', () => {
    (0, vitest_1.expect)((0, calculate_ffmpeg_filters_1.calculateFfmpegFilter)({
        fps: 30,
        asset: {
            ...asset,
            trimLeft: 10,
        },
        durationInFrames: 100,
        channels: 1,
        assetDuration: 1,
    })).toBe('[0:a]aformat=sample_fmts=s32:sample_rates=48000,atrim=0.333333:1.000000,apad=pad_len=128000[a0]');
});
(0, vitest_1.test)('Should handle delay correctly', () => {
    (0, vitest_1.expect)((0, calculate_ffmpeg_filters_1.calculateFfmpegFilter)({
        fps: 30,
        asset: {
            ...asset,
            trimLeft: 10,
            startInVideo: 80,
        },
        durationInFrames: 100,
        channels: 1,
        assetDuration: 1,
    })).toBe('[0:a]aformat=sample_fmts=s32:sample_rates=48000,atrim=0.333333:1.000000,adelay=2667|2667[a0]');
});
(0, vitest_1.test)('Should offset multiple channels', () => {
    (0, vitest_1.expect)((0, calculate_ffmpeg_filters_1.calculateFfmpegFilter)({
        fps: 30,
        asset: {
            ...asset,
            trimLeft: 10,
            startInVideo: 80,
        },
        durationInFrames: 100,
        channels: 3,
        assetDuration: 1,
    })).toBe('[0:a]aformat=sample_fmts=s32:sample_rates=48000,atrim=0.333333:1.000000,adelay=2667|2667|2667|2667[a0]');
});
