"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileDuration = exports.getTimingEndTimestamps = void 0;
const getTimingEndTimestamps = (chunk) => {
    return chunk.timings.map((timing) => chunk.startDate + timing);
};
exports.getTimingEndTimestamps = getTimingEndTimestamps;
const getProfileTimestamps = (chunks) => {
    return chunks.map((c) => (0, exports.getTimingEndTimestamps)(c));
};
const getProfileDuration = (chunks) => {
    const startTimeStamps = chunks.map((c) => c.startDate).flat(1);
    const endTimestamps = getProfileTimestamps(chunks).flat(1);
    const earliest = Math.min(...startTimeStamps);
    const latest = Math.max(...endTimestamps);
    return latest - earliest;
};
exports.getProfileDuration = getProfileDuration;
