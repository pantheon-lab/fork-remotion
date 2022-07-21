"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const remotion_1 = require("remotion");
const Tile_1 = require("./Tile");
const BRAND_GRADIENT = ['#5851db', '#405de6'];
const solidBrand = (0, polished_1.mix)(0.5, BRAND_GRADIENT[0], BRAND_GRADIENT[1]);
const Tiles = () => {
    const videoConfig = (0, remotion_1.useVideoConfig)();
    const frame = (0, remotion_1.useCurrentFrame)();
    const springConfig = {
        damping: 50,
        mass: 0.1,
        stiffness: 10,
        overshootClamping: false,
    };
    const scale = (0, remotion_1.spring)({
        config: springConfig,
        from: 1,
        to: 3.3,
        fps: videoConfig.fps,
        frame,
    });
    const outerScale = (0, remotion_1.spring)({
        config: springConfig,
        from: 1,
        frame: Math.max(0, frame - 20),
        to: 3,
        fps: videoConfig.fps,
    });
    const rotate = (0, remotion_1.spring)({
        config: springConfig,
        fps: videoConfig.fps,
        frame: Math.max(0, frame - 20),
        from: -100,
        to: 0,
    });
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            backgroundColor: solidBrand,
            flex: 1,
        }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                transform: `scale(${outerScale})`,
                width: videoConfig.width,
                height: videoConfig.height,
            }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                    width: videoConfig.width,
                    height: videoConfig.height,
                }, children: new Array(40)
                    .fill(true)
                    .map((_, i) => i)
                    .map((i) => {
                    return (0, jsx_runtime_1.jsx)(Tile_1.Tile, { index: i }, i);
                }) }) }) }));
};
exports.default = Tiles;
