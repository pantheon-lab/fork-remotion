"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const remotion_1 = require("remotion");
const gradients = [
    ['#845ec2', '#ff5e78'],
    ['rgb(40, 150, 114)', '#e6dd3b'],
    ['#e48900', '#be0000'],
    ['#fff600', '#f48b2a'],
    ['#23689b', '#487e95'],
    ['#9d0391', '#120078'],
];
const DropDots = ({ opacity, volume }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const cycle = 15;
    const iteration = Math.floor(frame / cycle);
    const { height, width } = (0, remotion_1.useVideoConfig)();
    const dots = new Array(process.env.NODE_ENV === 'development' ? 45 : 45)
        .fill(true)
        .map((_x, i) => {
        const startX = (0, remotion_1.random)(`x-${i}-${iteration}`) * width;
        const startY = (0, remotion_1.random)(`y-${i}-${iteration}`) * height;
        const startRotation = (0, remotion_1.random)(`rotation-${i}-${iteration}`) * 360;
        return {
            startX,
            endX: startX +
                (0, remotion_1.interpolate)((0, remotion_1.random)(`x-end-${i}-${iteration}`), [0, 1], [-600, 600]),
            startY,
            endY: startY +
                (0, remotion_1.interpolate)((0, remotion_1.random)(`y-end-${i}-${iteration}`), [0, 1], [-600, 600]),
            startRotation,
            endRotation: startRotation +
                (0, remotion_1.interpolate)((0, remotion_1.random)(`rotatad-${i}`), [0, 1], [-180, 180]),
            size: (0, remotion_1.interpolate)((0, remotion_1.random)(`size-${i}-${iteration}`), [0, 0.9, 0.901, 1], [40, 40, 160, 160]),
            background: gradients[Math.floor((0, remotion_1.random)(`color-${i}-${iteration}`) * gradients.length)],
            opacity: (0, remotion_1.interpolate)((0, remotion_1.random)(`opacity-${i}-${iteration}`), [0, 1], [0.83, 0.95]),
            gradId: (0, remotion_1.random)(`gradient-${i}-${iteration}`),
            hasShine: (0, remotion_1.random)(`shine-${i}`) > 0.6,
            shineOpacity: (0, remotion_1.random)(`shine-opacity-${i}-${iteration}`) * 0.7,
        };
    });
    const progress = (0, remotion_1.interpolate)(frame % cycle, [0, cycle], [0, 1]);
    return ((0, jsx_runtime_1.jsx)("div", { style: { width, height, opacity }, children: dots.map((d) => {
            const left = (0, remotion_1.interpolate)(progress, [0, 1], [d.startX, d.endX]);
            const top = (0, remotion_1.interpolate)(progress, [0, 1], [d.startY, d.endY]);
            const rotate = (0, remotion_1.interpolate)(progress, [0, 1], [d.startRotation, d.endRotation]);
            return ((0, jsx_runtime_1.jsxs)("div", { style: {
                    position: 'absolute',
                    left,
                    top,
                    transform: `rotate(${rotate}deg)`,
                }, children: [(0, jsx_runtime_1.jsxs)("svg", { style: {
                            width: d.size * 2,
                            height: d.size * 40,
                            position: 'absolute',
                            top: 0,
                        }, preserveAspectRatio: "none", viewBox: "0 0 200 4000", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsx)("filter", { id: "f1", x: "0", y: "0", children: (0, jsx_runtime_1.jsx)("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "10" }) }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: `${d.gradId}`, children: [(0, jsx_runtime_1.jsx)("stop", { stopColor: d.background[0], stopOpacity: d.shineOpacity * volume, offset: 0 }), (0, jsx_runtime_1.jsx)("stop", { stopColor: d.background[1], stopOpacity: 0.11 * volume, offset: 1 })] })] }), d.hasShine ? ((0, jsx_runtime_1.jsx)("path", { d: "M 50 50 L 0 4000 L 200 4000 z", fill: `url(#${d.gradId})`, filter: "url(#f1)" })) : null] }), (0, jsx_runtime_1.jsx)("div", { style: {
                            height: d.size,
                            width: d.size,
                            borderRadius: d.size / 2,
                            opacity: d.opacity,
                            zIndex: d.size,
                            ...(0, polished_1.linearGradient)({
                                colorStops: d.background,
                            }),
                            boxShadow: `0 0 60px ${(0, polished_1.linearGradient)({
                                colorStops: d.background,
                            }).backgroundColor}`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(remotion_1.Img, { style: {
                                height: (d.size / 3) * 2,
                                width: (d.size / 3) * 2,
                                marginLeft: d.size * 0.05,
                                opacity: 0.55,
                            }, src: "https://github.com/remotion-dev/logo/blob/main/monochromatic/element-0.png?raw=true" }) })] }));
        }) }));
};
exports.default = DropDots;
