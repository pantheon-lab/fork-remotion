"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_frame_ranges_from_profile_1 = require("../../functions/chunk-optimization/get-frame-ranges-from-profile");
const get_profile_duration_1 = require("../../functions/chunk-optimization/get-profile-duration");
const optimize_invocation_order_1 = require("../../functions/chunk-optimization/optimize-invocation-order");
const optimize_profile_1 = require("../../functions/chunk-optimization/optimize-profile");
const simulate_frame_ranges_1 = require("../../functions/chunk-optimization/simulate-frame-ranges");
const demo_profile_1 = require("../demo-profile");
const demo_profile_2_1 = require("../demo-profile-2");
test('Should measure demo profile correctly', () => {
    expect((0, get_profile_duration_1.getProfileDuration)(demo_profile_1.demoProfiles)).toEqual(29202);
});
test('Should get correct duration for a frame', () => {
    expect((0, simulate_frame_ranges_1.getTimingForFrame)(demo_profile_1.demoProfiles, 19)).toEqual(demo_profile_1.demoProfiles[0].timings[19] - demo_profile_1.demoProfiles[0].timings[18]);
    expect((0, simulate_frame_ranges_1.getTimingForFrame)(demo_profile_1.demoProfiles, 19)).toEqual(102);
    expect((0, simulate_frame_ranges_1.getTimingForFrame)(demo_profile_1.demoProfiles, 20)).toEqual(demo_profile_1.demoProfiles[1].timings[0]);
    expect((0, simulate_frame_ranges_1.getTimingForFrame)(demo_profile_1.demoProfiles, 20)).toEqual(951);
});
test('Get simulated profile for frame range', () => {
    expect((0, simulate_frame_ranges_1.getSimulatedTimingForFrameRange)(demo_profile_1.demoProfiles, [10, 29])).toEqual([
        83, 166, 250, 333, 433, 518, 600, 683, 784, 886, 1837, 1948, 2049, 2149,
        2264, 2347, 2431, 2531, 2614, 2695,
    ]);
});
test('Parser should not lose precision, same duration after parsing and reconstruction', () => {
    const reconstructed = (0, simulate_frame_ranges_1.simulateFrameRanges)({
        profile: demo_profile_1.demoProfiles,
        newFrameRanges: (0, get_frame_ranges_from_profile_1.getFrameRangesFromProfile)(demo_profile_1.demoProfiles),
    });
    expect((0, get_profile_duration_1.getProfileDuration)(reconstructed)).toEqual(29202);
    expect((0, get_profile_duration_1.getProfileDuration)(reconstructed)).toEqual((0, get_profile_duration_1.getProfileDuration)(demo_profile_1.demoProfiles));
});
describe('Move frame from 1 frame range to another', () => {
    const frameRanges = [
        [0, 19],
        [20, 39],
        [40, 59],
    ];
    test('Case from < to', () => {
        expect((0, optimize_profile_1.assignFrameToOther)({
            frameRanges,
            fromChunk: 0,
            toChunk: 2,
            framesToShift: 1,
        })).toEqual([
            [0, 18],
            [19, 38],
            [39, 59],
        ]);
    });
    test('Case from > to', () => {
        expect((0, optimize_profile_1.assignFrameToOther)({
            frameRanges,
            fromChunk: 2,
            toChunk: 0,
            framesToShift: 1,
        })).toEqual([
            [0, 20],
            [21, 40],
            [41, 59],
        ]);
    });
});
test('Optimize profile', () => {
    const sortedProfile = (0, get_frame_ranges_from_profile_1.sortProfileByFrameRanges)(demo_profile_1.demoProfiles);
    const optimized = (0, optimize_profile_1.optimizeProfileRecursively)(sortedProfile, 400);
    const newDuration = (0, get_profile_duration_1.getProfileDuration)(optimized);
    expect(newDuration).toBeLessThan(10000);
    const optimizedInvocationOrder = (0, get_profile_duration_1.getProfileDuration)((0, optimize_invocation_order_1.optimizeInvocationOrder)(optimized));
    expect(optimizedInvocationOrder).toBeLessThan(9000);
    expect(optimizedInvocationOrder).toBeLessThan(newDuration);
});
test('Optimize profile edge case', () => {
    (0, optimize_profile_1.optimizeProfile)(demo_profile_2_1.demoProfile2);
});
