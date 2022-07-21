"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gif = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const GifForDevelopment_1 = require("./GifForDevelopment");
const GifForRendering_1 = require("./GifForRendering");
const Gif = (props) => {
    if (remotion_1.Internals.getRemotionEnvironment() === 'rendering') {
        return (0, jsx_runtime_1.jsx)(GifForRendering_1.GifForRendering, { ...props });
    }
    return (0, jsx_runtime_1.jsx)(GifForDevelopment_1.GifForDevelopment, { ...props });
};
exports.Gif = Gif;
