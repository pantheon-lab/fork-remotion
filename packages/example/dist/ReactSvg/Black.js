"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Black = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const Black = ({ scale }) => {
    const config = (0, remotion_1.useVideoConfig)();
    return ((0, jsx_runtime_1.jsx)("svg", { viewBox: `0 0 ${config.width} ${config.height}`, style: {
            position: 'absolute',
            transform: `scale(${0.8})`,
            opacity: scale,
        }, children: (0, jsx_runtime_1.jsx)("circle", { r: 70, cx: config.width / 2, cy: config.height / 2, fill: "#000" }) }));
};
exports.Black = Black;
