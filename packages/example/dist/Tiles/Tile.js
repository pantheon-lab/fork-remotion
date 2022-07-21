"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const size = 200;
const Tile = ({ index }) => {
    const videoConfig = (0, remotion_1.useVideoConfig)();
    const frame = (0, remotion_1.useCurrentFrame)();
    const springConfig = {
        damping: 100,
        mass: 0.5,
        stiffness: 10,
        overshootClamping: true,
    };
    const scale = (0, remotion_1.spring)({
        config: springConfig,
        fps: videoConfig.fps,
        frame,
        from: 0,
        to: 1,
    });
    const rotate = (0, remotion_1.spring)({
        config: springConfig,
        fps: videoConfig.fps,
        from: 0,
        frame,
        to: 1,
    });
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            height: size,
            width: size,
            position: 'absolute',
            zIndex: 1000 - index,
            left: videoConfig.width / 2 - size / 2,
            top: videoConfig.height / 2 - size / 2,
            borderRadius: 20,
            background: 'radial-gradient(ellipse at bottom, white, #eee)',
            boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
            transform: ` rotateZ(${index * 8 * rotate}deg) translateY(${index * 15}px) scale(${scale}`,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        } }));
};
exports.Tile = Tile;
