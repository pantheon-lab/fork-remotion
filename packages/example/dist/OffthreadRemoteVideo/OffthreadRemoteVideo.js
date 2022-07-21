"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffthreadRemoteVideo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const OffthreadRemoteVideo = () => {
    return ((0, jsx_runtime_1.jsx)(remotion_1.OffthreadVideo, { volume: (f) => (0, remotion_1.interpolate)(f, [0, 500], [1, 0], { extrapolateRight: 'clamp' }), src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }));
};
exports.OffthreadRemoteVideo = OffthreadRemoteVideo;
