"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mesh = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const Mesh = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    return ((0, jsx_runtime_1.jsxs)("mesh", { position: [0, 0, 0], rotation: [frame * 0.06 * 0.5, frame * 0.07 * 0.5, frame * 0.08 * 0.5], scale: (0, remotion_1.interpolate)(Math.sin(frame / 10), [-1, 1], [0.8, 1.2]), children: [(0, jsx_runtime_1.jsx)("boxGeometry", { args: [100, 100, 100] }), (0, jsx_runtime_1.jsx)("meshStandardMaterial", { color: [
                    Math.sin(frame * 0.12) * 0.5 + 0.5,
                    Math.cos(frame * 0.11) * 0.5 + 0.5,
                    Math.sin(frame * 0.08) * 0.5 + 0.5,
                ] })] }));
};
exports.Mesh = Mesh;
