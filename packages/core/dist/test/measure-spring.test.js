"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const spring_1 = require("../spring");
const expect_to_throw_1 = require("./expect-to-throw");
(0, vitest_1.describe)('Measure spring should work', () => {
    const duration = (0, spring_1.measureSpring)({
        fps: 30,
    });
    (0, vitest_1.test)('test measureSpring()', () => (0, vitest_1.expect)(duration).toBe(28));
    (0, vitest_1.test)('spring should be close to 1', () => (0, vitest_1.expect)((0, spring_1.spring)({
        fps: 30,
        frame: duration,
    })).toBeCloseTo(1));
    (0, vitest_1.test)('spring should not be 1', () => (0, vitest_1.expect)((0, spring_1.spring)({
        fps: 30,
        frame: duration - 1,
    })).not.toBe(1));
});
(0, vitest_1.test)('Higher threshold should lead to faster spring', () => {
    (0, vitest_1.expect)((0, spring_1.measureSpring)({ fps: 30, threshold: 0.05 })).toBeLessThan((0, spring_1.measureSpring)({ fps: 30, threshold: 0.01 }));
});
(0, vitest_1.test)('Lower threshold should lead to slower spring', () => {
    (0, vitest_1.expect)((0, spring_1.measureSpring)({ fps: 30, threshold: 0.001 })).toBeGreaterThan((0, spring_1.measureSpring)({ fps: 30, threshold: 0.01 }));
});
(0, vitest_1.describe)('Threshold edge cases', () => {
    // threshold, expected
    const validEdgeCases = [
        [0, Infinity],
        [1, 0],
    ];
    validEdgeCases.forEach((entry) => (0, vitest_1.test)('', () => (0, vitest_1.expect)((0, spring_1.measureSpring)({ fps: 30, threshold: entry[0] })).toBe(entry[1])));
    // threshold, errMsg
    const errorEdgeCases = [
        [NaN, /Threshold is NaN/],
        [Infinity, /Threshold is not finite/],
        [null, /threshold must be a number, got null of type object/],
    ];
    errorEdgeCases.forEach((entry) => (0, expect_to_throw_1.expectToThrow)(
    // @ts-expect-error
    () => (0, spring_1.measureSpring)({ fps: 30, threshold: entry[0] }), entry[1]));
});
(0, vitest_1.test)('Should throw on invalid FPS', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, spring_1.measureSpring)({ fps: 0 }), /"fps" must be positive, but got 0./);
});
