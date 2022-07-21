"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GifForRendering = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tools_1 = require("@react-gifs/tools");
const react_1 = require("react");
const remotion_1 = require("remotion");
const useCurrentGifIndex_1 = require("./useCurrentGifIndex");
exports.GifForRendering = (0, react_1.forwardRef)(({ src, width, height, onLoad, onError, fit = 'fill', ...props }, ref) => {
    const resolvedSrc = new URL(src, window.location.origin).href;
    const [state, update] = (0, react_1.useState)({
        delays: [],
        frames: [],
        width: 0,
        height: 0,
    });
    const [id] = (0, react_1.useState)(() => (0, remotion_1.delayRender)(`Rendering <Gif/> with src="${resolvedSrc}"`));
    const index = (0, useCurrentGifIndex_1.useCurrentGifIndex)(state.delays);
    (0, tools_1.useParser)(resolvedSrc, (info) => {
        if ('error' in info) {
            if (onError) {
                onError(info.error);
            }
            else {
                console.error('Error loading GIF:', info.error, 'Handle the event using the onError() prop to make this message disappear.');
            }
        }
        else {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(info);
            update(info);
        }
        (0, remotion_1.continueRender)(id);
    });
    return ((0, jsx_runtime_1.jsx)(tools_1.Canvas, { fit: fit, index: index, frames: state.frames, width: width !== null && width !== void 0 ? width : state.width, height: height !== null && height !== void 0 ? height : state.height, ...props, ref: ref }));
});
