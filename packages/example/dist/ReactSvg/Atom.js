"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const config_1 = require("./config");
const Atom = ({ scale }) => {
    const config = (0, remotion_1.useVideoConfig)();
    return ((0, jsx_runtime_1.jsxs)("svg", { viewBox: `0 0 ${config.width} ${config.height}`, style: {
            position: 'absolute',
            transform: `scale(${scale})`,
        }, children: [(0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsxs)("linearGradient", { id: "gradient2", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0%", stopColor: config_1.COLOR_1 }), (0, jsx_runtime_1.jsx)("stop", { offset: "100%", stopColor: config_1.COLOR_2 })] }) }), (0, jsx_runtime_1.jsx)("circle", { r: 70, cx: config.width / 2, cy: config.height / 2, fill: "url(#gradient2)" })] }));
};
exports.Atom = Atom;
