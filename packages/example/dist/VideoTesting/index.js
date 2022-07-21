"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoTesting = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const VideoTesting = ({ codec, offthread }) => {
    const { durationInFrames } = (0, remotion_1.useVideoConfig)();
    const videoMp4 = (0, remotion_1.staticFile)('./framermp4withoutfileextension');
    const videoWebm = (0, remotion_1.staticFile)('./framer.webm');
    const Comp = offthread ? remotion_1.OffthreadVideo : remotion_1.Video;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 0, durationInFrames: durationInFrames, children: (0, jsx_runtime_1.jsx)(Comp, { src: codec === 'mp4' ? videoMp4 : videoWebm }) }) }));
};
exports.VideoTesting = VideoTesting;
