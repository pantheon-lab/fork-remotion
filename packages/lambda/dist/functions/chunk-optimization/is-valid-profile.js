"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidOptimizationProfile = void 0;
const renderer_1 = require("@remotion/renderer");
const isValidOptimizationProfile = (profile) => {
    return profile.every((timing) => {
        const frames = renderer_1.RenderInternals.getFramesToRender(timing.frameRange, 1);
        const values = Object.values(timing.timings);
        return frames.length === values.length && values.every((v) => v > 0);
    });
};
exports.isValidOptimizationProfile = isValidOptimizationProfile;
