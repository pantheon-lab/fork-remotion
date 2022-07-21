"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaretDown = exports.CaretRight = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const caret = {
    height: 12,
};
const caretDown = {
    width: 10,
};
const CaretRight = () => ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 192 512", style: caret, children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" }) }));
exports.CaretRight = CaretRight;
const CaretDown = () => {
    return ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 320 512", style: caretDown, children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" }) }));
};
exports.CaretDown = CaretDown;