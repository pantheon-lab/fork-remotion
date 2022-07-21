"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const Arc_1 = require("./Arc");
const Atom_1 = require("./Atom");
const Black_1 = require("./Black");
const DotGrid_1 = require("./DotGrid");
const ReactSvg = ({ transparent }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const videoConfig = (0, remotion_1.useVideoConfig)();
    const start = 0;
    const developDuration = 60;
    const development = (0, remotion_1.interpolate)(frame, [start, developDuration + start], [0, 1], {
        easing: remotion_1.Easing.bezier(0.12, 1, 1, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const rotateStart = developDuration + 5;
    const rotateDuration = 40;
    const rotationDevelopment = (0, remotion_1.interpolate)(frame, [rotateStart, rotateStart + rotateDuration], [0, 1], {
        easing: remotion_1.Easing.bezier(0.12, 1, 1, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const electronStart = 0;
    const electronDuration = 1000;
    const electronDevelopment = (0, remotion_1.interpolate)(frame, [electronStart, electronStart + electronDuration], [0, 10]);
    const electronOpacity = (0, remotion_1.interpolate)(frame, [rotateStart, rotateStart + 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const scaleOutStart = 220;
    const scaleOutEnd = scaleOutStart + 50;
    const scaleIn = (0, remotion_1.interpolate)(frame, [0, 30], [1.2, 1], {
        easing: remotion_1.Easing.ease,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const scaleOut = (0, remotion_1.interpolate)(frame, [scaleOutStart, scaleOutEnd], [1, 70], {
        easing: remotion_1.Easing.bezier(0.8, 0.22, 0.96, 0.65),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const scaleOutBlackDot = (0, remotion_1.interpolate)(frame, [scaleOutStart, scaleOutStart + 10], [0, 1], {
        easing: remotion_1.Easing.bezier(0.8, 0.22, 0.96, 0.65),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const scale = frame < 70 ? scaleIn : scaleOut;
    return ((0, jsx_runtime_1.jsx)("div", { style: { flex: 1, backgroundColor: transparent ? undefined : 'white' }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                position: 'absolute',
                width: videoConfig.width,
                height: videoConfig.height,
                transform: `scale(${scale})`,
            }, children: [transparent ? null : (0, jsx_runtime_1.jsx)(DotGrid_1.DotGrid, {}), (0, jsx_runtime_1.jsx)(Arc_1.Arc, { rotateProgress: rotationDevelopment, progress: development, rotation: 30, electronProgress: electronDevelopment, electronOpacity: electronOpacity }), (0, jsx_runtime_1.jsx)(Arc_1.Arc, { rotateProgress: rotationDevelopment, rotation: 90, progress: frame < rotateStart ? 0 : 1, electronProgress: electronDevelopment * 1.2 + 0.33, electronOpacity: electronOpacity }), (0, jsx_runtime_1.jsx)(Arc_1.Arc, { rotateProgress: rotationDevelopment, rotation: -30, progress: frame < rotateStart ? 0 : 1, electronProgress: electronDevelopment + 0.66, electronOpacity: electronOpacity }), (0, jsx_runtime_1.jsx)(Atom_1.Atom, { scale: rotationDevelopment }), transparent ? null : (0, jsx_runtime_1.jsx)(Black_1.Black, { scale: scaleOutBlackDot })] }) }));
};
exports.default = ReactSvg;
