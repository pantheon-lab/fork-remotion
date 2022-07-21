"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const log_1 = require("../config/log");
(0, vitest_1.describe)('test loglevel getter and setter', () => {
    (0, vitest_1.test)('default log level', () => {
        (0, vitest_1.expect)((0, log_1.getLogLevel)()).toEqual('info');
    });
    vitest_1.test.each(['verbose', 'warn', 'error', 'info'])('test for %s', (loglevel) => {
        (0, log_1.setLogLevel)(loglevel);
        (0, vitest_1.expect)((0, log_1.getLogLevel)()).toEqual(loglevel);
    });
});
(0, vitest_1.describe)('loglevel validity', () => {
    vitest_1.test.each(['abc', 'aalsadj', ''])('is %s an invalid level', (level) => {
        (0, vitest_1.expect)((0, log_1.isValidLogLevel)(level)).toEqual(false);
    });
    vitest_1.test.each(['verbose', 'info', 'warn', 'error'])('is %s a valid level', (level) => {
        (0, vitest_1.expect)((0, log_1.isValidLogLevel)(level)).toEqual(true);
    });
});
(0, vitest_1.describe)('loglevel comparison', () => {
    vitest_1.test.each([
        ['verbose', 'verbose'],
        ['verbose', 'info'],
        ['verbose', 'warn'],
        ['verbose', 'error'],
        ['info', 'info'],
        ['info', 'warn'],
        ['info', 'error'],
        ['warn', 'warn'],
        ['warn', 'error'],
        ['error', 'error'],
    ])('%s is equal or below %s', (level1, level2) => {
        (0, log_1.setLogLevel)(level1);
        (0, vitest_1.expect)((0, log_1.isEqualOrBelowLogLevel)((0, log_1.getLogLevel)(), level2)).toEqual(true);
    });
    vitest_1.test.each([
        ['info', 'verbose'],
        ['warn', 'verbose'],
        ['error', 'verbose'],
        ['warn', 'info'],
        ['error', 'info'],
        ['error', 'warn'],
    ])('%s is not equal or below %s', (level1, level2) => {
        (0, log_1.setLogLevel)(level1);
        (0, vitest_1.expect)((0, log_1.isEqualOrBelowLogLevel)((0, log_1.getLogLevel)(), level2)).toEqual(false);
    });
});
