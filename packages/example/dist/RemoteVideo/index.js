"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const RemoteVideo = () => {
    return ((0, jsx_runtime_1.jsx)(remotion_1.Video, { volume: (f) => (0, remotion_1.interpolate)(f, [0, 500], [1, 0], { extrapolateRight: 'clamp' }), src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }));
};
exports.default = RemoteVideo;
