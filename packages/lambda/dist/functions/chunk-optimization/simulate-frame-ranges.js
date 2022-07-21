"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateFrameRanges = exports.getSimulatedTimingForFrameRange = exports.getTimingForFrame = void 0;
const getTimingForFrame = (profile, frame) => {
    for (const timingInfo of profile) {
        if (timingInfo.frameRange[0] > frame || timingInfo.frameRange[1] < frame) {
            continue;
        }
        let lastTime = timingInfo.startDate;
        for (let i = 0; i < timingInfo.timings.length; i++) {
            const actualFrame = i + timingInfo.frameRange[0];
            const timing = timingInfo.timings[i];
            const absolute = timing + timingInfo.startDate;
            if (actualFrame === frame) {
                return absolute - lastTime;
            }
            lastTime = absolute;
        }
    }
    throw new Error(`Frame ${frame} was not rendered`);
};
exports.getTimingForFrame = getTimingForFrame;
const getSimulatedTimingForFrameRange = (profile, frameRange) => {
    const timings = [];
    let totalDuration = 0;
    for (let i = frameRange[0]; i <= frameRange[1]; i++) {
        const timingForFrame = (0, exports.getTimingForFrame)(profile, i);
        timings.push(timingForFrame + totalDuration);
        totalDuration += timingForFrame;
    }
    return timings;
};
exports.getSimulatedTimingForFrameRange = getSimulatedTimingForFrameRange;
const simulateFrameRanges = ({ profile, newFrameRanges, }) => {
    if (profile.length !== newFrameRanges.length) {
        throw new Error('Expected previous and new frame ranges to be equal');
    }
    return newFrameRanges.map((range, i) => {
        return {
            timings: (0, exports.getSimulatedTimingForFrameRange)(profile, range),
            chunk: i,
            frameRange: range,
            startDate: profile[i].startDate,
        };
    });
};
exports.simulateFrameRanges = simulateFrameRanges;
