"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const IFrameTest = () => {
    const { width, height } = (0, remotion_1.useVideoConfig)();
    return (0, jsx_runtime_1.jsx)(remotion_1.IFrame, { style: { width, height }, src: "https://remotion.dev" });
};
exports.default = IFrameTest;
