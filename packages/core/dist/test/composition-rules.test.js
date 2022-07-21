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
(0, vitest_1.describe)('Render composition-rules should throw with invalid props', () => {
    (0, vitest_1.test)('It should report invalid component id', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, id: "invalid@id", width: 100 })), /can only contain/);
    });
    (0, vitest_1.test)('It should throw if no id is passed', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)(
        // @ts-expect-error
        (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 100 })), /No id for composition passed./);
    });
    (0, vitest_1.test)('It should throw if multiple components have the same id', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsxs)(RemotionRoot_1.RemotionRoot, { children: [(0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 100, id: "id" }), (0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, width: 100, id: "id" })] })), /Multiple composition with id id/);
    });
});
(0, vitest_1.describe)('Render composition-rules should not with valid props', () => {
    (0, vitest_1.test)('It should validate the component id', () => {
        (0, vitest_1.expect)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.Composition, { lazyComponent: () => Promise.resolve({ default: AnyComp }), durationInFrames: 100, fps: 30, height: 100, id: "valid-id", width: 100 }))).not.toThrow();
    });
});
