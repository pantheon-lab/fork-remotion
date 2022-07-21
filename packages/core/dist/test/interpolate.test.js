"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const easing_1 = require("../easing");
const interpolate_1 = require("../interpolate");
const expect_to_throw_1 = require("./expect-to-throw");
(0, vitest_1.describe)('Basic interpolations', () => {
    (0, vitest_1.test)('Input and output range strictly monotonically increasing', () => {
        (0, vitest_1.expect)((0, interpolate_1.interpolate)(1, [0, 1], [0, 2])).toEqual(2);
    });
    (0, vitest_1.test)('Input range strictly monotonically increasing, Output range non-increasing', () => {
        (0, vitest_1.expect)((0, interpolate_1.interpolate)(1, [0, 1], [2, 2])).toEqual(2);
    });
    (0, vitest_1.test)('Interpolate with 4 values, output non-increasing', () => {
        (0, vitest_1.expect)((0, interpolate_1.interpolate)(Math.PI, [0, 1, 4, 9], [0, 2, 1000, -1000])).toEqual(714.4364894275378);
    });
    (0, vitest_1.test)('Interpolate Infinity: output range increasing', () => {
        (0, vitest_1.expect)((0, interpolate_1.interpolate)(Infinity, [0, 1], [0, 2])).toEqual(Infinity);
    });
    (0, vitest_1.test)('Interpolate Infinity: output range decreasing', () => {
        (0, vitest_1.expect)((0, interpolate_1.interpolate)(Infinity, [0, 1], [1, 0])).toEqual(-Infinity);
    });
});
(0, vitest_1.test)('Must be the same length', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, interpolate_1.interpolate)(1, [0, 2], [0, 1, 2]);
    }, /inputRange \(2\) and outputRange \(3\) must have the same length/);
});
(0, vitest_1.test)('Must pass at least 2 elements for input range', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, interpolate_1.interpolate)(1, [0], [9]);
    }, /inputRange must have at least 2 elements/);
});
(0, vitest_1.test)('Input range must be strictly monotonically non-decreasing', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, interpolate_1.interpolate)(1, [0, 1, 0.5], [0, 2, 0.2]);
    }, /inputRange must be strictly monotonically non-decreasing/);
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, interpolate_1.interpolate)(0.75, [0, 1, 1], [0, 2, 0]);
    }, /inputRange must be strictly monotonically non-decreasing/);
});
(0, vitest_1.test)('Output range can be non-monotonic', () => {
    (0, vitest_1.expect)((0, interpolate_1.interpolate)(0.75, [0, 0.5, 1], [0, 2, 0])).toEqual(1);
});
(0, vitest_1.test)('Output range monotonically decreasing', () => {
    (0, vitest_1.expect)((0, interpolate_1.interpolate)(0.75, [0, 0.5, 1], [0, 2, 2])).toEqual(2);
});
(0, vitest_1.test)('Cannot have Infinity in input range', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, interpolate_1.interpolate)(1, [-Infinity, 0], [0, 2]);
    }, /inputRange must contain only finite numbers, but got \[-Infinity,0\]/);
});
(0, vitest_1.test)('Cannot have Infinity in output Range', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, interpolate_1.interpolate)(1, [0, 1], [Infinity, 2]), /outputRange must contain only finite numbers, but got \[Infinity,2\]/);
});
(0, vitest_1.test)('Should throw if passing 2x infinity input range', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, interpolate_1.interpolate)(1, [Infinity, Infinity], [0, 2]), /inputRange must contain only finite numbers, but got \[Infinity,Infinity\]/);
});
(0, vitest_1.test)('Should throw if passing 2x infinity output range', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, interpolate_1.interpolate)(1, [0, 1], [-Infinity, Infinity]), /outputRange must contain only finite numbers, but got \[-Infinity,Infinity\]/);
});
(0, vitest_1.test)('Should throw on Infinity as third argument', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, interpolate_1.interpolate)(1, [0, 1, Infinity], [0, 2, 3]), /inputRange must contain only finite numbers, but got \[0,1,Infinity\]/);
});
(0, vitest_1.test)('Should throw on Infinity as third argument', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, interpolate_1.interpolate)(1, [0, 1, Infinity], [0, 2, 3]), /inputRange must contain only finite numbers, but got \[0,1,Infinity\]/);
});
(0, vitest_1.test)('Easing test', () => {
    (0, vitest_1.expect)((0, interpolate_1.interpolate)(0.5, [0, 1], [0, 1], {
        easing: easing_1.Easing.sin,
    })).toEqual(1 - Math.cos((0.5 * Math.PI) / 2));
});
(0, vitest_1.test)('Extrapolation left test', () => {
    const testValues = ['extend', undefined];
    testValues.forEach((entry) => {
        (0, vitest_1.expect)((0, interpolate_1.interpolate)(-3, [0, 1, 2], [0, 0.5, 1], {
            extrapolateRight: entry,
        })).toEqual(-1.5);
    });
});
(0, vitest_1.test)('Extrapolation right test', () => {
    const testValues = ['extend', undefined];
    testValues.forEach((entry) => {
        (0, vitest_1.expect)((0, interpolate_1.interpolate)(3, [0, 1, 2], [0, 0.5, 1], {
            extrapolateRight: entry,
        })).toEqual(1.5);
    });
});
(0, vitest_1.test)('Extrapolation identity', () => {
    const testValues = [
        [1000, { extrapolateRight: 'identity' }],
        [-1000, { extrapolateLeft: 'identity' }],
    ];
    testValues.forEach((entry) => {
        (0, vitest_1.expect)((0, interpolate_1.interpolate)(entry[0], [0, 1, 2], [0, 2, 4], entry[1])).toBe(entry[0]);
    });
});
(0, vitest_1.test)('Clamp right test', () => {
    (0, vitest_1.expect)((0, interpolate_1.interpolate)(2000, [0, 1, 1000], [0, 1, -1000], {
        extrapolateRight: 'clamp',
    })).toEqual(-1000);
});
(0, vitest_1.test)('Clamp left test', () => {
    (0, vitest_1.expect)((0, interpolate_1.interpolate)(-2000, [0, 1, 1000], [Math.PI, 1, -1000], {
        extrapolateLeft: 'clamp',
    })).toEqual(Math.PI);
});
(0, vitest_1.test)('Zig-zag test', () => {
    const testValues = [
        [3.5, -500],
        [4, -1000],
        [6, 3000],
        [-0.1, -1100],
    ];
    testValues.forEach((entry) => {
        (0, vitest_1.expect)((0, interpolate_1.interpolate)(entry[0], [1, 2, 3, 4, 5], [0, 1000, 0, -1000, 1000])).toBe(entry[1]);
    });
});
(0, vitest_1.test)('Handle bad types', () => {
    // @ts-expect-error
    (0, vitest_1.expect)(() => (0, interpolate_1.interpolate)(undefined, [0, 1], [1, 0])).toThrowError(/input can not be undefined/);
    // @ts-expect-error
    (0, vitest_1.expect)(() => (0, interpolate_1.interpolate)(1, undefined, [1, 0])).toThrowError(/inputRange can not be undefined/);
    // @ts-expect-error
    (0, vitest_1.expect)(() => (0, interpolate_1.interpolate)(1, [1, 0], undefined)).toThrowError(/outputRange can not be undefined/);
    // @ts-expect-error
    (0, vitest_1.expect)(() => (0, interpolate_1.interpolate)(1)).toThrowError(/inputRange can not be undefined/);
    // @ts-expect-error
    (0, vitest_1.expect)(() => (0, interpolate_1.interpolate)('1', [0, 1], [1, 0])).toThrowError(/Cannot interpolate an input which is not a number/);
    // @ts-expect-error
    (0, vitest_1.expect)(() => (0, interpolate_1.interpolate)(1, 'string', 'string')).toThrowError(/inputRange must contain only numbers/);
    // @ts-expect-error
    (0, vitest_1.expect)(() => (0, interpolate_1.interpolate)(1, [1, 2, 3], 'str')).toThrowError(/outputRange must contain only numbers/);
    // @ts-expect-error
    (0, vitest_1.expect)(() => (0, interpolate_1.interpolate)(1, undefined, 'string')).toThrowError(/inputRange can not be undefined/);
    // @ts-expect-error
    (0, vitest_1.expect)(() => (0, interpolate_1.interpolate)([1, 2], undefined, 'string')).toThrowError(/inputRange can not be undefined/);
});
