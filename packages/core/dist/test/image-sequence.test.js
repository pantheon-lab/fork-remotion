"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const image_sequence_1 = require("../config/image-sequence");
const expect_to_throw_1 = require("./expect-to-throw");
const invalidImageSequence = 'invalidImageSequence';
let defaultImageSequence;
(0, vitest_1.beforeAll)(() => {
    defaultImageSequence = (0, image_sequence_1.getShouldOutputImageSequence)(null);
});
(0, vitest_1.afterEach)(() => {
    (0, image_sequence_1.setImageSequence)(defaultImageSequence);
});
(0, vitest_1.test)('setImageSequence should throw if image sequence is not a boolean value', () => {
    (0, expect_to_throw_1.expectToThrow)(() => 
    // @ts-expect-error
    (0, image_sequence_1.setImageSequence)(invalidImageSequence), /setImageSequence accepts a Boolean Value/);
});
(0, vitest_1.test)('setImageSequence should NOT throw if image sequence is a boolean value', () => {
    (0, vitest_1.expect)(() => (0, image_sequence_1.setImageSequence)(true)).not.toThrow();
});
(0, vitest_1.test)('getShouldOutputImageSequence should return false by default', () => {
    (0, vitest_1.expect)((0, image_sequence_1.getShouldOutputImageSequence)(null)).toEqual(false);
});
(0, vitest_1.test)('getShouldOutputImageSequence should return true if a single frame number is passed', () => {
    (0, vitest_1.expect)((0, image_sequence_1.getShouldOutputImageSequence)(1)).toEqual(true);
});
(0, vitest_1.test)('getShouldOutputImageSequence should return true', () => {
    (0, image_sequence_1.setImageSequence)(true);
    (0, vitest_1.expect)((0, image_sequence_1.getShouldOutputImageSequence)(null)).toEqual(true);
});
