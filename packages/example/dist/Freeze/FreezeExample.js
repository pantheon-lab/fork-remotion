"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreezeExample = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const FreezeExample = () => {
    const video = (0, remotion_1.staticFile)('./framermp4withoutfileextension');
    return ((0, jsx_runtime_1.jsxs)(remotion_1.Series, { children: [(0, jsx_runtime_1.jsx)(remotion_1.Series.Sequence, { durationInFrames: 25, children: (0, jsx_runtime_1.jsx)(remotion_1.Freeze, { frame: 0, children: (0, jsx_runtime_1.jsx)(remotion_1.Video, { src: video }) }) }), (0, jsx_runtime_1.jsx)(remotion_1.Series.Sequence, { durationInFrames: 50, children: (0, jsx_runtime_1.jsx)(remotion_1.Video, { src: video }) }), (0, jsx_runtime_1.jsx)(remotion_1.Series.Sequence, { durationInFrames: 50, children: (0, jsx_runtime_1.jsx)(remotion_1.Freeze, { frame: 126, children: (0, jsx_runtime_1.jsx)(remotion_1.Video, { src: video }) }) })] }));
};
exports.FreezeExample = FreezeExample;
