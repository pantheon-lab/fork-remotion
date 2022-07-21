"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const bezier_1 = require("../bezier");
const identity = (x) => {
    return x;
};
const assertClose = (a, b, precision = 3) => {
    (0, vitest_1.expect)(a).toBeCloseTo(b, precision);
};
const allEquals = (be1, be2, samples) => {
    for (let i = 0; i <= samples; ++i) {
        const x = i / samples;
        assertClose(be1(x), be2(x));
    }
};
function repeat(n) {
    return function (f) {
        for (let i = 0; i < n; ++i) {
            f();
        }
    };
}
(0, vitest_1.test)('bezier - should create an object', () => {
    (0, vitest_1.expect)(typeof (0, bezier_1.bezier)(0, 0, 1, 1) === 'function').toBe(true);
});
(0, vitest_1.test)('bezier - fail with wrong params', () => {
    const valuesToTest = [
        [0.5, 0.5, -5, 0.5],
        [0.5, 0.5, 5, 0.5],
        [-2, 0.5, 0.5, 0.5],
        [2, 0.5, 0.5, 0.5],
    ];
    valuesToTest.forEach((entry) => {
        (0, vitest_1.expect)(() => (0, bezier_1.bezier)(entry[0], entry[1], entry[2], entry[3])).toThrow();
    });
});
(0, vitest_1.test)('bezier - linear curves', () => {
    allEquals((0, bezier_1.bezier)(0, 0, 1, 1), (0, bezier_1.bezier)(1, 1, 0, 0), 100);
    allEquals((0, bezier_1.bezier)(0, 0, 1, 1), identity, 100);
});
(0, vitest_1.test)('bezier - right value at extremes', () => {
    repeat(10)(() => {
        const a = Math.random();
        const b = 2 * Math.random() - 0.5;
        const c = Math.random();
        const d = 2 * Math.random() - 0.5;
        const easing = (0, bezier_1.bezier)(a, b, c, d);
        (0, vitest_1.expect)(easing(0)).toBe(0);
        (0, vitest_1.expect)(easing(1)).toBe(1);
    });
});
