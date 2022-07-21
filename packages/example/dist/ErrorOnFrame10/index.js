"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorOnFrame10 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const ErrorOnFrame10 = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    if (frame === 10) {
        const a = new Array(0.5);
        console.log(a);
    }
    return (0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, {});
};
exports.ErrorOnFrame10 = ErrorOnFrame10;
