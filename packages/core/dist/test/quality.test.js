"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const quality_1 = require("../config/quality");
const expect_to_throw_1 = require("./expect-to-throw");
(0, vitest_1.describe)('Test valid setQuality inputs', () => {
    (0, vitest_1.test)('Integers within accepted range', () => {
        const validInputes = [1, 50, 100];
        validInputes.forEach((entry) => {
            (0, quality_1.setQuality)(entry);
            (0, vitest_1.expect)((0, quality_1.getQuality)()).toEqual(entry);
        });
    });
    (0, vitest_1.test)('Undefined input', () => {
        (0, quality_1.setQuality)(undefined);
        (0, vitest_1.expect)((0, quality_1.getQuality)()).toEqual(undefined);
    });
    (0, vitest_1.test)('0 input', () => {
        (0, quality_1.setQuality)(0);
        (0, vitest_1.expect)((0, quality_1.getQuality)()).toEqual(undefined);
    });
});
(0, vitest_1.describe)('Test invalid setQuality inputs ', () => {
    (0, vitest_1.test)('invalid input type', () => {
        const invalidInputQuality = ['abc', null];
        invalidInputQuality.forEach((entry) => (0, expect_to_throw_1.expectToThrow)(
        // @ts-expect-error
        () => (0, quality_1.setQuality)(entry), new RegExp(`Quality option must be a number or undefined. Got ${typeof entry}`)));
    });
    (0, vitest_1.test)('out of range inputs', () => {
        const outOfRangeInput = [-1, 101, 150];
        outOfRangeInput.forEach((entry) => (0, expect_to_throw_1.expectToThrow)(() => (0, quality_1.setQuality)(entry), /Quality option must be between 0 and 100./));
    });
});
