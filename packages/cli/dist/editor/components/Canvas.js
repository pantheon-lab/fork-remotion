"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const Preview_1 = require("./Preview");
const container = {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
};
const Canvas = () => {
    const ref = (0, react_1.useRef)(null);
    const size = player_1.PlayerInternals.useElementSize(ref, {
        triggerOnWindowResize: false,
        shouldApplyCssTransforms: true,
    });
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: container, children: size ? (0, jsx_runtime_1.jsx)(Preview_1.VideoPreview, { canvasSize: size }) : null }));
};
exports.Canvas = Canvas;
