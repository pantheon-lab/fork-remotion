"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipZeroFrame = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
// Try to render using:
// npx remotion render src/index.tsx skip-zero-frame --frames=10-20 skip.mp4
const SkipZeroFrame = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    if (frame === 0 && process.env.NODE_ENV === 'production') {
        throw new Error('should not render frame 0');
    }
    return (0, jsx_runtime_1.jsx)("div", { children: frame });
};
exports.SkipZeroFrame = SkipZeroFrame;
