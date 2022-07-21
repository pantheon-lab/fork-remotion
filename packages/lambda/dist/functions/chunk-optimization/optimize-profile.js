"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeProfileRecursively = exports.optimizeProfile = exports.assignFrameToOther = void 0;
const get_frame_ranges_from_profile_1 = require("./get-frame-ranges-from-profile");
const simulate_frame_ranges_1 = require("./simulate-frame-ranges");
const sort_by_duration_1 = require("./sort-by-duration");
const assignFrameToOther = ({ frameRanges, fromChunk, toChunk, framesToShift, }) => {
    if (fromChunk < toChunk) {
        return frameRanges.map((frameRange, i) => {
            if (i === fromChunk) {
                return [frameRange[0], frameRange[1] - framesToShift];
            }
            if (i === toChunk) {
                return [frameRange[0] - framesToShift, frameRange[1]];
            }
            if (i > fromChunk && i < toChunk) {
                return [frameRange[0] - framesToShift, frameRange[1] - framesToShift];
            }
            return frameRange;
        });
    }
    return frameRanges.map((frameRange, i) => {
        if (i === fromChunk) {
            return [frameRange[0] + framesToShift, frameRange[1]];
        }
        if (i === toChunk) {
            return [frameRange[0], frameRange[1] + framesToShift];
        }
        if (i > toChunk && i < fromChunk) {
            return [frameRange[0] + framesToShift, frameRange[1] + framesToShift];
        }
        return frameRange;
    });
};
exports.assignFrameToOther = assignFrameToOther;
const optimizeProfile = (_profile) => {
    const sortedByStart = _profile
        .slice()
        .sort((a, b) => a.frameRange[0] - b.frameRange[0]);
    const sortedByDuration = (0, sort_by_duration_1.sortProfileByDuration)(sortedByStart);
    const indexOfFastest = sortedByStart.indexOf(sortedByDuration[0]);
    if (indexOfFastest === -1) {
        throw new Error('invalid timing profile: ' + JSON.stringify(_profile));
    }
    const slowest = sortedByDuration[sortedByDuration.length - 1];
    const indexOfSlowest = sortedByStart.indexOf(slowest);
    if (indexOfSlowest === -1) {
        throw new Error('invalid timing profile: ' + JSON.stringify(_profile));
    }
    const frameRanges = (0, get_frame_ranges_from_profile_1.getFrameRangesFromProfile)(sortedByStart);
    if (indexOfFastest === indexOfSlowest) {
        return _profile;
    }
    const newFrameRanges = (0, exports.assignFrameToOther)({
        frameRanges,
        fromChunk: indexOfSlowest,
        toChunk: indexOfFastest,
        framesToShift: Math.max(1, Math.min(2, Math.floor(slowest.timings.length / 3))),
    });
    const simulated = (0, simulate_frame_ranges_1.simulateFrameRanges)({
        profile: sortedByStart,
        newFrameRanges,
    });
    return simulated;
};
exports.optimizeProfile = optimizeProfile;
const optimizeProfileRecursively = (profile, amount) => {
    let optimized = profile;
    for (let i = 0; i < amount; i++) {
        optimized = (0, exports.optimizeProfile)(optimized);
    }
    return optimized;
};
exports.optimizeProfileRecursively = optimizeProfileRecursively;
