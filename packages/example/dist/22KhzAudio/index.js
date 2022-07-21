"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwentyTwoKHzAudio = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const remotion_2 = require("remotion");
const TwentyTwoKHzAudio = () => {
    const twenty = (0, remotion_2.staticFile)('22khz.wav');
    return ((0, jsx_runtime_1.jsxs)(remotion_2.AbsoluteFill, { children: [(0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 1, durationInFrames: 30, children: (0, jsx_runtime_1.jsx)(remotion_1.Audio, { src: (0, remotion_2.staticFile)('music.mp3') }) }), (0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 31, durationInFrames: 100, children: (0, jsx_runtime_1.jsx)(remotion_1.Audio, { src: twenty }) })] }));
};
exports.TwentyTwoKHzAudio = TwentyTwoKHzAudio;
