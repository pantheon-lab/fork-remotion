"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const create_ffmpeg_merge_filter_1 = require("../create-ffmpeg-merge-filter");
(0, vitest_1.test)('FFMPEG merge filters', () => {
    (0, vitest_1.expect)((0, create_ffmpeg_merge_filter_1.createFfmpegMergeFilter)(2)).toBe('[0:a][1:a]amerge=inputs=2,pan=stereo|c0=c0+c2|c1=c1+c3[a]');
    (0, vitest_1.expect)((0, create_ffmpeg_merge_filter_1.createFfmpegMergeFilter)(3)).toBe('[0:a][1:a]amerge=inputs=3,pan=stereo|c0=c0+c2+c4|c1=c1+c3+c5[a]');
    (0, vitest_1.expect)((0, create_ffmpeg_merge_filter_1.createFfmpegMergeFilter)(4)).toBe('[0:a][1:a]amerge=inputs=4,pan=stereo|c0=c0+c2+c4+c6|c1=c1+c3+c5+c7[a]');
});
