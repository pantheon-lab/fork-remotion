"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFfmpegMergeFilter = void 0;
const remotion_1 = require("remotion");
const createFfmpegMergeFilter = (inputs) => {
    const leftChannel = new Array(inputs * 2)
        .fill(true)
        .map((_, i) => (i % 2 === 0 ? `c${i}` : null))
        .filter(remotion_1.Internals.truthy)
        .join('+');
    const rightChannel = new Array(inputs * 2)
        .fill(true)
        .map((_, i) => (i % 2 === 1 ? `c${i}` : null))
        .filter(remotion_1.Internals.truthy)
        .join('+');
    return `[0:a][1:a]amerge=inputs=${inputs},pan=stereo|c0=${leftChannel}|c1=${rightChannel}[a]`;
};
exports.createFfmpegMergeFilter = createFfmpegMergeFilter;
