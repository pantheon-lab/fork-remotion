"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const LoopedVideo = () => {
    return ((0, jsx_runtime_1.jsx)(remotion_1.Loop, { durationInFrames: 50, times: 3, name: "MyLoop", children: (0, jsx_runtime_1.jsx)(Child, {}) }));
};
const Child = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            fontSize: 50,
        }, children: frame }));
};
exports.default = LoopedVideo;
