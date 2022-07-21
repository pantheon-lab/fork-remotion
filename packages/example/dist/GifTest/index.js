"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const gif_1 = require("@remotion/gif");
const remotion_1 = require("remotion");
const GifTest = () => {
    const { width, height } = (0, remotion_1.useVideoConfig)();
    const giphy = (0, remotion_1.staticFile)('giphy.gif');
    return ((0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, backgroundColor: 'black' }, children: [(0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 0, durationInFrames: 50, children: (0, jsx_runtime_1.jsx)(gif_1.Gif, { src: giphy, width: width, height: height, fit: "fill" }) }), (0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 50, durationInFrames: 50, children: (0, jsx_runtime_1.jsx)(gif_1.Gif, { src: "https://media.giphy.com/media/xT0GqH01ZyKwd3aT3G/giphy.gif", width: width, height: height, fit: "cover" }) }), (0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 100, durationInFrames: 50, children: (0, jsx_runtime_1.jsx)(gif_1.Gif, { src: "https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif", width: width, height: height, fit: "contain" }) })] }));
};
exports.default = GifTest;
