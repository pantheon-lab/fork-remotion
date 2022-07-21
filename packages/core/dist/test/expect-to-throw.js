"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectToThrow = void 0;
const vitest_1 = require("vitest");
const expectToThrow = (func, err) => {
    // Even though the error is caught, it still gets printed to the console
    // so we mock that out to avoid the wall of red text.
    vitest_1.vitest.spyOn(console, 'error');
    // @ts-expect-error
    console.error.mockImplementation(() => undefined);
    (0, vitest_1.expect)(func).toThrow(err);
    // @ts-expect-error
    console.error.mockRestore();
};
exports.expectToThrow = expectToThrow;
