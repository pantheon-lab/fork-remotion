"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbScene = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const three_1 = require("@remotion/three");
const Orb_1 = require("./Orb");
const OrbScene = () => {
    return ((0, jsx_runtime_1.jsxs)(three_1.ThreeCanvas, { width: 2000, height: 2000, gl: {
            alpha: false,
            antialias: false,
            stencil: false,
            depth: false,
        }, onCreated: (state) => state.gl.setClearColor('white'), children: [(0, jsx_runtime_1.jsx)("ambientLight", { intensity: 1.5, color: 0xffffff }), (0, jsx_runtime_1.jsx)("pointLight", { position: [10, 10, 0] }), (0, jsx_runtime_1.jsx)(Orb_1.Orb, {})] }));
};
exports.OrbScene = OrbScene;
