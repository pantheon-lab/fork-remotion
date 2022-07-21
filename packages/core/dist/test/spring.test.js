"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const is_approximately_the_same_1 = require("../is-approximately-the-same");
const spring_1 = require("../spring");
(0, vitest_1.test)('Basic spring to equal 0', () => {
    (0, vitest_1.expect)((0, spring_1.spring)({
        fps: 30,
        frame: 0,
    })).toEqual(0);
});
(0, vitest_1.test)('Basic spring to equal 1', () => {
    (0, vitest_1.expect)((0, spring_1.spring)({
        fps: 30,
        frame: 0,
        from: 1,
        to: 0,
    })).toEqual(1);
});
(0, vitest_1.test)('Should be approxmiately the same', () => {
    (0, vitest_1.expect)((0, is_approximately_the_same_1.isApproximatelyTheSame)((0, spring_1.spring)({
        fps: 30,
        frame: 1,
    }), 0.04941510804510185)).toBe(true);
});
(0, vitest_1.test)('Should be close to 1', () => {
    (0, vitest_1.expect)((0, spring_1.spring)({
        fps: 30,
        frame: 100,
    })).toBeCloseTo(1);
});
(0, vitest_1.test)('Should be able to set duration for spring', () => {
    (0, vitest_1.expect)((0, spring_1.spring)({
        fps: 30,
        frame: 5,
        durationInFrames: 5,
    })).toBeCloseTo(1);
});
