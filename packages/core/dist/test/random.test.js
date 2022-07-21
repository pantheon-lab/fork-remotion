"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const random_1 = require("../random");
(0, vitest_1.describe)('Should support negative random numbers', () => {
    (0, vitest_1.test)('test with -1', () => (0, vitest_1.expect)((0, random_1.random)(-1)).toBe((0, random_1.random)(-1)));
    (0, vitest_1.test)('test with -2', () => (0, vitest_1.expect)((0, random_1.random)(-2)).toBe((0, random_1.random)(-2)));
    (0, vitest_1.test)('different seeds should be different randoms', () => (0, vitest_1.expect)((0, random_1.random)(-2)).not.toBe((0, random_1.random)(-1)));
});
(0, vitest_1.test)('Random should be deterministic', () => {
    (0, vitest_1.expect)((0, random_1.random)(1)).toBe((0, random_1.random)(1));
    (0, vitest_1.expect)((0, random_1.random)(2)).toBe((0, random_1.random)(2));
    (0, vitest_1.expect)((0, random_1.random)(2)).not.toBe((0, random_1.random)(1));
    (0, vitest_1.expect)((0, random_1.random)(null)).not.toBe((0, random_1.random)(null));
});
(0, vitest_1.describe)('Random should be uniform', () => {
    const ITEM_COUNT = 100000;
    const mapped = new Array(ITEM_COUNT).fill(true).map((_a, i) => {
        return (0, random_1.random)(i);
    });
    const average = mapped.reduce((a, b) => a + b, 0) / mapped.length;
    (0, vitest_1.test)('test if average is around 0.5', () => {
        (0, vitest_1.expect)(average).toBeLessThan(0.51);
        (0, vitest_1.expect)(average).toBeGreaterThan(0.49);
    });
    const tenPercentSections = [];
    const stepInterval = 0.1;
    let currentStep = 0;
    while (currentStep < 0.999999) {
        const items = mapped.filter((m) => m >= currentStep && m <= currentStep + stepInterval);
        tenPercentSections.push(items);
        currentStep += stepInterval;
    }
    const ACCURACY = 0.005;
    tenPercentSections.forEach((entries, index) => (0, vitest_1.test)(`section ${index} should contain around ${ITEM_COUNT * stepInterval} entries`, () => {
        (0, vitest_1.expect)(entries.length).toBeLessThan(ITEM_COUNT * (stepInterval + ACCURACY));
        (0, vitest_1.expect)(entries.length).toBeGreaterThan(ITEM_COUNT * (stepInterval - ACCURACY));
    }));
    (0, vitest_1.test)('test for average distance', () => {
        const distances = mapped
            .map((_a, i) => {
            if (i === 0) {
                return null;
            }
            return Math.abs(mapped[i] - mapped[i - 1]);
        })
            .filter((f) => f !== null);
        const averageDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
        (0, vitest_1.expect)(averageDistance).toBeGreaterThan(0.3);
    });
});
(0, vitest_1.test)('Random string should be uniform', () => {
    const alphabet = 'abcdefghijlkmnopqrstuvwxyz0123456789';
    const array = new Array(alphabet.length)
        .fill(true)
        .map((_, i) => (0, random_1.random)(alphabet[i]));
    const average = array.reduce((a, b) => a + b, 0) / array.length;
    (0, vitest_1.expect)(average).toBeLessThan(0.55);
    (0, vitest_1.expect)(average).toBeGreaterThan(0.45);
});
