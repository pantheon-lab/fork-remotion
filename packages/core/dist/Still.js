"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Still = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Composition_1 = require("./Composition");
const Still = (props) => {
    return (0, jsx_runtime_1.jsx)(Composition_1.Composition, { fps: 1, durationInFrames: 1, ...props });
};
exports.Still = Still;
