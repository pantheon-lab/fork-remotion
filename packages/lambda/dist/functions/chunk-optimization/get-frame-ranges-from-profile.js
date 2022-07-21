"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortProfileByFrameRanges = exports.getFrameRangesFromProfile = void 0;
const getFrameRangesFromProfile = (profile) => {
    return profile.map((p) => p.frameRange);
};
exports.getFrameRangesFromProfile = getFrameRangesFromProfile;
const sortProfileByFrameRanges = (profile) => {
    return profile.slice().sort((a, b) => a.frameRange[0] - b.frameRange[0]);
};
exports.sortProfileByFrameRanges = sortProfileByFrameRanges;
