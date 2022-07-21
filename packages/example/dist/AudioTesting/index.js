"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const AudioTesting = () => {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 100, durationInFrames: 100, children: (0, jsx_runtime_1.jsx)(remotion_1.Audio, { startFrom: 100, endAt: 200, src: (0, remotion_1.staticFile)('music.mp3'), volume: (f) => (0, remotion_1.interpolate)(f, [0, 50, 100], [0, 1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                }) }) }) }));
};
exports.default = AudioTesting;
