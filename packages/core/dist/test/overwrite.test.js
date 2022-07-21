"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const overwrite_1 = require("../config/overwrite");
const expect_to_throw_1 = require("./expect-to-throw");
const invalidOverwrite = 555;
let defaultOverwriteValue;
(0, vitest_1.beforeAll)(() => {
    defaultOverwriteValue = (0, overwrite_1.getShouldOverwrite)();
});
(0, vitest_1.afterEach)(() => {
    (0, overwrite_1.setOverwriteOutput)(defaultOverwriteValue);
});
(0, vitest_1.test)('setOverwriteOutput should throw if overwrite is not a boolean value', () => {
    (0, expect_to_throw_1.expectToThrow)(
    // @ts-expect-error
    () => (0, overwrite_1.setOverwriteOutput)(invalidOverwrite), /overwriteExisting must be a boolean but got number [(]555[)]/);
});
(0, vitest_1.test)('setOverwriteOutput should NOT throw if image format is a boolean value', () => {
    (0, vitest_1.expect)(() => (0, overwrite_1.setOverwriteOutput)(true)).not.toThrow();
});
(0, vitest_1.test)('getShouldOverwrite should return true by default', () => {
    (0, vitest_1.expect)((0, overwrite_1.getShouldOverwrite)()).toEqual(true);
});
(0, vitest_1.test)('setOverwriteOutput should return a boolean value', () => {
    (0, overwrite_1.setOverwriteOutput)(false);
    (0, vitest_1.expect)((0, overwrite_1.getShouldOverwrite)()).toEqual(false);
});
