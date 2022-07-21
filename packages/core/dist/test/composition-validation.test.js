"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @vitest-environment jsdom
 */
const react_1 = require("@testing-library/react");
const vitest_1 = require("vitest");
const __1 = require("..");
const RemotionRoot_1 = require("../RemotionRoot");
const expect_to_throw_1 = require("./expect-to-throw");
const AnyComp = () => null;
(0, vitest_1.describe)('Composition-validation render should throw with invalid props', () => {
    (0, vitest_1.test)('It should throw if multiple components have the same id', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, id: "id" }) })), /The "width/);
    });
    (0, vitest_1.describe)('Throw with invalid height props', () => {
        (0, vitest_1.test)('It should throw if height is a negative number', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: -100, width: 100, id: "id" }) })), /The "height" prop of the <Composition\/> component must be positive, but got -100./);
        });
        (0, vitest_1.test)('It should throw if height=0 is boundary off-point', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 0, width: 100, id: "id" }) })), /The "height" prop of the <Composition\/> component must be positive, but got 0./);
        });
        (0, vitest_1.test)('It should throw if height is not a number', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, 
                    // @ts-expect-error
                    height: '100', width: 100, id: "id" }) })), /The "height" prop of the <Composition\/> component must be a number, but you passed a value of type string/);
        });
        (0, vitest_1.test)('It should throw if height is not an integer', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100.01, width: 100, id: "id" }) })), /The "height" prop of the <Composition\/> component must be an integer, but is 100.01/);
        });
    });
    (0, vitest_1.describe)('Throw with invalid width props', () => {
        (0, vitest_1.test)('It should throw if width is a negative number', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: -100, id: "id" }) })), /The "width" prop of the <Composition\/> component must be positive, but got -100./);
        });
        (0, vitest_1.test)('It should throw if width=0 is boundary off-point', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 0, id: "id" }) })), /The "width" prop of the <Composition\/> component must be positive, but got 0./);
        });
        (0, vitest_1.test)('It should throw if width is not a number', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, 
                    // @ts-expect-error
                    width: '100', id: "id" }) })), /The "width" prop of the <Composition\/> component must be a number, but you passed a value of type string/);
        });
    });
    (0, vitest_1.describe)('Throw with invalid durationInFrames', () => {
        (0, vitest_1.test)('It should throw if durationInFrames of a composition is a negative number', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: -100, fps: 30, height: 100, width: 100, id: "id" }) })), /The "durationInFrames" prop of the <Composition\/> component must be positive, but got -100./);
        });
        (0, vitest_1.test)('It should throw if durationInFrames=0 of a composition is boundary off-point', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 0, fps: 30, height: 100, width: 100, id: "id" }) })), /The "durationInFrames" prop of the <Composition\/> component must be positive, but got 0./);
        });
        (0, vitest_1.test)('It should throw if durationInFrames of a composition is not an integer', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 0.11, fps: 30, height: 100, width: 100, id: "id" }) })), /The "durationInFrames" prop of the <Composition\/> component must be an integer, but got 0.11./);
        });
        (0, vitest_1.test)('It should throw if durationInFrames of a composition is not a number', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), 
                    // @ts-expect-error
                    durationInFrames: '100', fps: 30, height: 100, width: 100, id: "id" }) })), /The "durationInFrames" prop of the <Composition\/> component must be a number, but you passed a value of type string/);
        });
    });
    (0, vitest_1.describe)('Throw with invalid fps', () => {
        (0, vitest_1.test)('It should throw if fps is of a composition is negative', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: -30, height: 100, width: 100, id: "id" }) })), /"fps" must be positive, but got -30./);
        });
        (0, vitest_1.test)('It should throw if fps=0 of a composition is boundary off-point', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 0, height: 100, width: 100, id: "id" }) })), /"fps" must be positive, but got 0./);
        });
        (0, vitest_1.test)('It should throw if fps of a composition is not a number', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(RemotionRoot_1.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, 
                    // @ts-expect-error
                    fps: '30', height: 100, width: 100, id: "id" }) })), /"fps" must be a number, but you passed a value of type string/);
        });
    });
});
(0, vitest_1.describe)('Composition-validation render should NOT throw with valid props', () => {
    (0, vitest_1.describe)('Not throw with valid height props', () => {
        (0, vitest_1.test)('It should not throw if height is a positive number', () => {
            (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 100, id: "id" }))).not.toThrow();
        });
        (0, vitest_1.test)('It should not throw if height=1 is boundary on-point', () => {
            (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 1, width: 100, id: "id" }))).not.toThrow();
        });
    });
    (0, vitest_1.describe)('Not throw with valid width props', () => {
        (0, vitest_1.test)('It should not throw if width is a positive number', () => {
            (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 100, id: "id" }))).not.toThrow();
        });
        (0, vitest_1.test)('It should not throw if width=1 is boundary on-point', () => {
            (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 1, id: "id" }))).not.toThrow();
        });
    });
    (0, vitest_1.test)('It should not throw if durationInFrames=1 of a composition is boundary on-point', () => {
        (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 1, fps: 30, height: 100, width: 100, id: "id" }))).not.toThrow();
    });
    (0, vitest_1.test)('It should not throw if fps=1 of a composition is boundary on-point', () => {
        (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 1, height: 100, width: 100, id: "id" }))).not.toThrow();
    });
});
