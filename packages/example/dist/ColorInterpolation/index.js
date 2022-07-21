"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorInterpolation = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const ColorInterpolation = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            flex: 1,
            backgroundColor: (0, remotion_1.interpolateColors)(frame, [0, 50, 100], ['red', 'yellow', 'blue']),
        } }));
};
exports.ColorInterpolation = ColorInterpolation;
