"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const calculate_atempo_1 = require("../assets/calculate-atempo");
(0, vitest_1.describe)('Calculate atempo', () => {
    (0, vitest_1.test)('Basic atempo', () => {
        (0, vitest_1.expect)((0, calculate_atempo_1.calculateATempo)(0.5)).toBe('atempo=0.50000');
    });
    (0, vitest_1.test)('Below 0.5', () => {
        (0, vitest_1.expect)((0, calculate_atempo_1.calculateATempo)(0.25)).toBe('atempo=0.50000,atempo=0.50000');
    });
    (0, vitest_1.test)('Above 2', () => {
        (0, vitest_1.expect)((0, calculate_atempo_1.calculateATempo)(6)).toBe('atempo=1.56508,atempo=1.56508,atempo=1.56508,atempo=1.56508');
    });
    (0, vitest_1.test)('Extreme value', () => {
        (0, vitest_1.expect)((0, calculate_atempo_1.calculateATempo)(0.0000001)).toBe('atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430,atempo=0.60430');
    });
});
