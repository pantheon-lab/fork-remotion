"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @vitest-environment jsdom
 */
const vitest_1 = require("vitest");
const absolute_src_1 = require("../absolute-src");
(0, vitest_1.describe)('Absolute src should behave as expected', () => {
    (0, vitest_1.test)('Get localhost:8080', () => {
        (0, vitest_1.expect)((0, absolute_src_1.getAbsoluteSrc)('http://localhost:8080')).toBe('http://localhost:8080/');
    });
    (0, vitest_1.test)('Get localhost/hi', () => {
        (0, vitest_1.expect)((0, absolute_src_1.getAbsoluteSrc)('/hi')).toBe('http://localhost:3000/hi');
    });
    (0, vitest_1.test)('Get data:base64', () => {
        (0, vitest_1.expect)((0, absolute_src_1.getAbsoluteSrc)('data:base64,image/png,abc')).toBe('data:base64,image/png,abc');
    });
});
