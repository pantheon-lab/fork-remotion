"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @vitest-environment jsdom
 */
const react_1 = require("@testing-library/react");
const vitest_1 = require("vitest");
const Sequence_1 = require("../Sequence");
const expect_to_throw_1 = require("./expect-to-throw");
(0, vitest_1.describe)('Composition-validation render should throw with invalid props', () => {
    (0, vitest_1.describe)('Throw with invalid duration props', () => {
        (0, vitest_1.test)('It should throw if Sequence has non-integer durationInFrames', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { from: 0, durationInFrames: 1.1, children: "hi" })), /The "durationInFrames" of a sequence must be an integer, but got 1.1./);
        });
        (0, vitest_1.test)('It should throw if Sequence has negative duration', () => {
            (0, expect_to_throw_1.expectToThrow)(
            // @ts-expect-error
            () => (0, react_1.render)((0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { from: 0, durationInFrames: -1 })), /durationInFrames must be positive, but got -1/);
        });
    });
    (0, vitest_1.describe)('Throw with invalid from props', () => {
        (0, vitest_1.test)('It should throw if "from" props is not a number', () => {
            (0, expect_to_throw_1.expectToThrow)(
            // @ts-expect-error
            () => (0, react_1.render)((0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { from: '0', durationInFrames: 30 })), /You passed to the "from" props of your <Sequence> an argument of type string, but it must be a number./);
        });
        (0, vitest_1.test)('It should throw if Sequence has non-integer from', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { from: 0.1, durationInFrames: 1, children: "hi" })), /The "from" prop of a sequence must be an integer, but got 0.1./);
        });
    });
    (0, vitest_1.test)('It should throw for invalid layout value', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)(
        // @ts-expect-error
        (0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { from: 0, durationInFrames: 100, layout: 'invalid-value' })), /The layout prop of <Sequence \/> expects either "absolute-fill" or "none", but you passed: invalid-value/);
    });
});
(0, vitest_1.describe)('Composition-validation render should NOT throw with valid props', () => {
    (0, vitest_1.test)('It should allow null as children', () => {
        (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { durationInFrames: 100, from: 0, children: null }))).not.toThrow();
    });
    (0, vitest_1.test)('It should allow undefined as children', () => {
        (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { durationInFrames: 100, from: 0, children: undefined }))).not.toThrow();
    });
});
