"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const remotion_1 = require("remotion");
const makeSquircle = (w = 100, h = 100, curvature = 0.5) => {
    const curveWidth = (w / 2) * (1 - curvature);
    const curveHeight = (h / 2) * (1 - curvature);
    return `
        M 0, ${h / 2}
        C 0, ${curveWidth} ${curveHeight}, 0 ${w / 2}, 0
        S ${w}, ${curveHeight} ${w}, ${h / 2}
            ${w - curveWidth}, ${h - 0} ${w / 2}, ${h}
            0, ${w - curveHeight} 0, ${h / 2}
    `;
};
const Circle = ({ size }) => {
    const videoConfig = (0, remotion_1.useVideoConfig)();
    const frame = (0, remotion_1.useCurrentFrame)();
    const progress = (0, remotion_1.spring)({
        config: {
            damping: 1000,
            mass: 0.7,
            stiffness: 10,
            overshootClamping: false,
        },
        fps: videoConfig.fps,
        frame,
        from: 0,
        to: 1,
    });
    const angle = (0, remotion_1.interpolate)(progress, [0, 1], [0, Math.PI * 2]);
    const squircleFactor = (0, remotion_1.interpolate)(progress, [0, 1], [0.5, 1.05]);
    const radius = videoConfig.width / 2;
    const left = videoConfig.width / 2 - size / 2;
    const top = videoConfig.height / 2 - size / 2;
    const x = radius * Math.cos(angle) + radius;
    const y = -radius * Math.sin(angle) + radius;
    const amountToMove = (videoConfig.width - size) * (1 - progress);
    const shade = 1 - Math.min(1, size / videoConfig.width);
    const color = (0, polished_1.mix)(shade * 0.1, '#000', '#fff');
    return ((0, jsx_runtime_1.jsx)("svg", { viewBox: `0 0 ${size} ${size}`, width: size, height: size, style: {
            position: 'absolute',
            left: left + amountToMove * x * 0.0003,
            top: top + amountToMove * y * 0.0003,
            WebkitFilter: 'drop-shadow(0 0 5px #5851db)',
        }, children: (0, jsx_runtime_1.jsx)("path", { d: makeSquircle(size, size, squircleFactor), fill: color }) }));
};
exports.Circle = Circle;
