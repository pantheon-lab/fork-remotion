"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManyAudio = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const ManyAudio = () => {
    return ((0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { children: new Array(32).fill(true).map((_, i) => {
            return (0, jsx_runtime_1.jsx)(remotion_1.Audio, { src: (0, remotion_1.staticFile)('music.mp3?mus=' + i) });
        }) }));
};
exports.ManyAudio = ManyAudio;
