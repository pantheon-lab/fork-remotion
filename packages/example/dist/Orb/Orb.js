"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orb = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const drei_1 = require("@react-three/drei");
const Orb = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("ambientLight", { intensity: 2.5 }), (0, jsx_runtime_1.jsx)("pointLight", { "position-z": -15, intensity: 1, color: "#F8C069" }), (0, jsx_runtime_1.jsxs)("mesh", { children: [(0, jsx_runtime_1.jsx)("sphereBufferGeometry", { args: [1, 64, 64] }), (0, jsx_runtime_1.jsx)(drei_1.MeshDistortMaterial, { color: "black", envMapIntensity: 1, clearcoat: 1, clearcoatRoughness: 0, metalness: 0.1, 
                        // @ts-expect-error wrong types
                        mass: 2, tenstion: 1000, friction: 10 })] }), (0, jsx_runtime_1.jsx)(drei_1.ContactShadows, { rotation: [Math.PI / 2, 0, 0], position: [0, -1.6, 0], opacity: 0.8, width: 15, height: 15, blur: 2.5, far: 1.6 })] }));
};
exports.Orb = Orb;
