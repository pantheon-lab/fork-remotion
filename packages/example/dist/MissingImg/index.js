"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingImg = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const MissingImg = () => {
    // eslint-disable-next-line @remotion/no-string-assets
    return (0, jsx_runtime_1.jsx)(remotion_1.Img, { src: "doesnotexist" });
};
exports.MissingImg = MissingImg;
