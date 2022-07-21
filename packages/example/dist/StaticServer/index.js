"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticDemo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const StaticDemo = () => {
    const [handle1] = (0, react_1.useState)(() => (0, remotion_1.delayRender)('handle1'));
    const [handle2] = (0, react_1.useState)(() => (0, remotion_1.delayRender)('handle2'));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(remotion_1.Img, { src: (0, remotion_1.staticFile)('logo.png'), onLoad: () => (0, remotion_1.continueRender)(handle1) }), (0, jsx_runtime_1.jsx)(remotion_1.Img, { src: (0, remotion_1.staticFile)('/nested/mp4.png'), onLoad: () => (0, remotion_1.continueRender)(handle2) })] }));
};
exports.StaticDemo = StaticDemo;
