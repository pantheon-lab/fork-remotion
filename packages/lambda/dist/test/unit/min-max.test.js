"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const min_max_1 = require("../../functions/helpers/min-max");
const expect_to_throw_1 = require("../helpers/expect-to-throw");
describe('min() and max()', () => {
    test('Implemented min() functions correctly', () => {
        expect((0, min_max_1.min)([0, -30, 90, -120, 0])).toBe(-120);
    });
    test('Implemented max() functions correctly', () => {
        expect((0, min_max_1.max)([0, -30, 90, -120, 0])).toBe(90);
    });
    test('min() should throw on empty arr', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, min_max_1.min)([]), /Array of 0 length/);
    });
    test('max() should throw on empty arr', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, min_max_1.min)([]), /Array of 0 length/);
    });
    const bigArray = new Array(300000).fill(true).map((_, i) => {
        return i;
    });
    test('Regular Math.max() should throw', () => {
        (0, expect_to_throw_1.expectToThrow)(() => Math.max(...bigArray), /Maximum call stack size exceeded/);
    });
    test('Custom max() should not throw', () => {
        expect((0, min_max_1.max)(bigArray)).toBe(299999);
    });
});
