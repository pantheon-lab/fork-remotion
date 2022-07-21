"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GifForDevelopment = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tools_1 = require("@react-gifs/tools");
const lru_map_1 = require("lru_map");
const react_1 = require("react");
const useCurrentGifIndex_1 = require("./useCurrentGifIndex");
const cache = new lru_map_1.LRUMap(30);
exports.GifForDevelopment = (0, react_1.forwardRef)(({ src, width, height, onError, onLoad, fit = 'fill', ...props }, ref) => {
    const resolvedSrc = new URL(src, window.location.origin).href;
    const [state, update] = (0, react_1.useState)(() => {
        const parsedGif = cache.get(resolvedSrc);
        if (parsedGif === undefined) {
            return {
                delays: [],
                frames: [],
                width: 0,
                height: 0,
            };
        }
        return parsedGif;
    });
    // skip loading if frames exist
    (0, tools_1.useWorkerParser)(Boolean(state.frames.length) || resolvedSrc, (info) => {
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
            cache.set(resolvedSrc, info);
            update(info);
        }
    });
    const index = (0, useCurrentGifIndex_1.useCurrentGifIndex)(state.delays);
    return ((0, jsx_runtime_1.jsx)(tools_1.Canvas, { fit: fit, index: index, frames: state.frames, width: width !== null && width !== void 0 ? width : state.width, height: height !== null && height !== void 0 ? height : state.height, ...props, ref: ref }));
});
