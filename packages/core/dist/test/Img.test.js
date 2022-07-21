"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @vitest-environment jsdom
 */
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const Img_1 = require("../Img");
const ref = react_2.default.createRef();
const testImgUrl = 'https://source.unsplash.com/random/50x50';
(0, vitest_1.beforeEach)(() => {
    (0, react_1.render)((0, jsx_runtime_1.jsx)(Img_1.Img, { ref: ref, src: testImgUrl }));
});
(0, vitest_1.test)('Img component renders img tag', () => {
    var _a;
    (0, vitest_1.expect)((_a = ref.current) === null || _a === void 0 ? void 0 : _a.tagName).toBe('IMG');
});
(0, vitest_1.test)('Src attribute is forwarded to img tag', () => {
    (0, vitest_1.expect)(ref.current).toHaveProperty('src', testImgUrl);
});
