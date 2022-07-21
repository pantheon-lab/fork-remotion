"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const Framer_1 = require("./Framer");
const Index = () => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "framer", component: Framer_1.Framer, width: 1080, height: 1080, fps: 30, durationInFrames: 100 }) }));
};
exports.Index = Index;
