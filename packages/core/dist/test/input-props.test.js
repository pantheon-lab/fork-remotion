"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @vitest-environment jsdom
 */
const vitest_1 = require("vitest");
const input_props_1 = require("../config/input-props");
(0, vitest_1.describe)('input props', () => {
    const OLD_ENV = process.env;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vitest.resetModules(); // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });
    (0, vitest_1.afterAll)(() => {
        process.env = OLD_ENV; // Restore old environment
    });
    (0, vitest_1.test)('input props in non production env', () => {
        process.env.NODE_ENV = 'development';
        const inputProps = {
            firstProperty: 'firstProperty',
            secondProperty: 'secondProperty',
        };
        window.remotion_inputProps = JSON.stringify(JSON.stringify(inputProps));
        (0, vitest_1.expect)((0, input_props_1.getInputProps)()).toEqual(JSON.stringify(inputProps));
    });
    (0, vitest_1.test)('input props in production env', () => {
        process.env.NODE_ENV = 'production';
        window.remotion_inputProps = JSON.stringify({});
        (0, vitest_1.expect)((0, input_props_1.getInputProps)()).toEqual({});
    });
});
