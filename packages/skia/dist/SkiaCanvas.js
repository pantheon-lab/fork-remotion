"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkiaCanvas = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_skia_1 = require("@shopify/react-native-skia");
const react_1 = require("react");
const remotion_1 = require("remotion");
const SkiaCanvas = ({ children, height, width, ...otherProps }) => {
    const contexts = remotion_1.Internals.useRemotionContexts();
    const style = (0, react_1.useMemo)(() => {
        return {
            width,
            height,
        };
    }, [height, width]);
    return ((0, jsx_runtime_1.jsx)(react_native_skia_1.Canvas, { ...otherProps, style: style, mode: "continuous", children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.RemotionContextProvider, { contexts: contexts, children: children }) }));
};
exports.SkiaCanvas = SkiaCanvas;
