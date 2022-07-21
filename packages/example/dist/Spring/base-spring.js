"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpringWithDuration = exports.BaseSpring = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const BaseSpring = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    return ((0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { style: {
            justifyContent: 'center',
            alignItems: 'center',
        }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                height: 200,
                width: 200,
                backgroundColor: 'red',
                borderRadius: 100,
                transform: `scale(${(0, remotion_1.spring)({
                    frame,
                    fps,
                    config: {},
                })})`,
            } }) }));
};
exports.BaseSpring = BaseSpring;
const SpringWithDuration = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    return ((0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { style: {
            justifyContent: 'center',
            alignItems: 'center',
        }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                height: 200,
                width: 200,
                backgroundColor: 'red',
                borderRadius: 100,
                transform: `scale(${(0, remotion_1.spring)({
                    frame,
                    fps,
                    config: {},
                    durationInFrames: 90,
                })})`,
            } }) }));
};
exports.SpringWithDuration = SpringWithDuration;
