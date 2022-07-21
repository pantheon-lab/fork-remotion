"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortProfileByDuration = void 0;
const get_profile_duration_1 = require("./get-profile-duration");
const durationCache = new Map();
const getChunkDuration = (chunk) => {
    const inCache = durationCache.get(chunk);
    if (inCache) {
        return inCache;
    }
    const timestamps = (0, get_profile_duration_1.getTimingEndTimestamps)(chunk);
    const duration = Math.max(...timestamps) - chunk.startDate;
    durationCache.set(chunk, duration);
    return duration;
};
const sortProfileByDuration = (profile) => {
    const sortedByDuration = profile.slice().sort((a, b) => {
        const aDuration = getChunkDuration(a);
        const bDuration = getChunkDuration(b);
        return aDuration - bDuration;
    });
    durationCache.clear();
    return sortedByDuration;
};
exports.sortProfileByDuration = sortProfileByDuration;
