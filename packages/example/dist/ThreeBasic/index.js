"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const three_1 = require("@remotion/three");
const remotion_1 = require("remotion");
const Mesh_1 = require("./Mesh");
const ThreeBasic = () => {
    const { width, height } = (0, remotion_1.useVideoConfig)();
    return ((0, jsx_runtime_1.jsxs)(three_1.ThreeCanvas, { width: width, height: height, style: { backgroundColor: 'white' }, orthographic: false, camera: { fov: 75, position: [0, 0, 470] }, children: [(0, jsx_runtime_1.jsx)("ambientLight", { intensity: 0.15 }), (0, jsx_runtime_1.jsx)("pointLight", { args: [undefined, 0.4], position: [200, 200, 0] }), (0, jsx_runtime_1.jsx)(Mesh_1.Mesh, {})] }));
};
exports.default = ThreeBasic;
