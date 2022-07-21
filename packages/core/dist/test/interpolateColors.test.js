"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const interpolate_colors_1 = require("../interpolate-colors");
const expect_to_throw_1 = require("./expect-to-throw");
(0, vitest_1.test)('Throws if color string is not right', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, interpolate_colors_1.interpolateColors)(1, [0, 1], ['#fabgdf', '#ffaabb']);
    }, /invalid color string #fabgdf provided/);
});
(0, vitest_1.describe)('Throws error for undefined parameters', () => {
    (0, vitest_1.test)('Undefined input', () => {
        (0, expect_to_throw_1.expectToThrow)(() => {
            // @ts-expect-error
            (0, interpolate_colors_1.interpolateColors)(undefined, ['#aaa', '#bbb'], ['#fff', '#000']);
        }, /input can not be undefined/);
    });
    (0, vitest_1.test)('Undefined inputRange', () => {
        (0, expect_to_throw_1.expectToThrow)(() => {
            // @ts-expect-error
            (0, interpolate_colors_1.interpolateColors)(1, undefined, ['#fff', '#000']);
        }, /inputRange can not be undefined/);
    });
    (0, vitest_1.test)('Undefined outputRange', () => {
        (0, expect_to_throw_1.expectToThrow)(() => {
            // @ts-expect-error
            (0, interpolate_colors_1.interpolateColors)(1, ['#fff', '#000'], undefined);
        }, /outputRange can not be undefined/);
    });
});
(0, vitest_1.test)('inputRange and outputRange must be of same length', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, interpolate_colors_1.interpolateColors)(1, [1, 2, 3], ['#ffffff', '#aaaaaa']);
    }, /inputRange \(3 values provided\) and outputRange \(2 values provided\) must have the same length/);
});
(0, vitest_1.test)('Basic interpolate Colors', () => {
    (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(1, [0, 1], ['#ffaadd', '#fabfdf'])).toBe('rgba(250, 191, 223, 1)');
});
(0, vitest_1.test)('Clamp Right', () => {
    (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(2, [0, 1], ['#ffaadd', '#fabfdf'])).toBe('rgba(250, 191, 223, 1)');
});
(0, vitest_1.test)('Clamp Left', () => {
    (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(-1, [0, 1], ['#ffaadd', '#fabfdf'])).toBe('rgba(255, 170, 221, 1)');
});
(0, vitest_1.test)('Color shorthands', () => {
    (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(1, [0, 1], ['#fad', '#fabfdf'])).toBe('rgba(250, 191, 223, 1)');
});
(0, vitest_1.test)('Color names', () => {
    (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(1, [0, 1], ['red', 'blue'])).toBe('rgba(0, 0, 255, 1)');
});
(0, vitest_1.test)('Mix transparency', () => {
    (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(0.5, [0, 1], ['transparent', 'blue'])).toBe('rgba(0, 0, 128, 0.5)');
});
(0, vitest_1.test)('HSV', () => {
    (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(0.5, [0, 1], ['hsla(120, 100%, 25%, 0)', 'blue'])).toBe('rgba(0, 64, 128, 0.5)');
    (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(0.5, [0, 1], ['hsl(120, 50%, 50%)', 'blue'])).toBe('rgba(32, 96, 160, 1)');
});
(0, vitest_1.describe)('RGB', () => {
    (0, vitest_1.test)('standard rgb interpolation', () => (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(0.5, [0, 1], ['rgb(0,0,0)', 'rgb(255,255,255)'])).toBe('rgba(128, 128, 128, 1)'));
    (0, vitest_1.test)('rgb clamping', () => {
        (0, vitest_1.expect)((0, interpolate_colors_1.interpolateColors)(0.5, [0, 1], ['rgb(-1,0,0)', 'rgb(256,255,255)'])).toBe('rgba(128, 128, 128, 1)');
    });
});
