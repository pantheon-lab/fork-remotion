"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plan_frame_ranges_1 = require("../../functions/chunk-optimization/plan-frame-ranges");
test('Plan frame ranges should respect everyNthFrame', () => {
    const planned = (0, plan_frame_ranges_1.planFrameRanges)({
        framesPerLambda: 8,
        shouldUseOptimization: false,
        everyNthFrame: 2,
        frameRange: [0, 99],
        optimization: null,
    });
    expect(planned.chunks).toEqual([
        [0, 15],
        [16, 31],
        [32, 47],
        [48, 63],
        [64, 79],
        [80, 95],
        [96, 98],
    ]);
});
test('Should remove ranges that are not going to render', () => {
    const planned = (0, plan_frame_ranges_1.planFrameRanges)({
        framesPerLambda: 11,
        shouldUseOptimization: false,
        everyNthFrame: 1,
        frameRange: [0, 22],
        optimization: null,
    });
    expect(planned.chunks).toEqual([
        [0, 10],
        [11, 21],
        [22, 22],
    ]);
});
