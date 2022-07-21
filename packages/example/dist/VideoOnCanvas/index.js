"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoOnCanvas = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const react_1 = require("react");
const remotion_2 = require("remotion");
const VideoOnCanvas = () => {
    const video = (0, react_1.useRef)(null);
    const canvas = (0, react_1.useRef)(null);
    const { width, height } = (0, remotion_1.useVideoConfig)();
    const onVideoFrame = (0, react_1.useCallback)(() => {
        if (!canvas.current ||
            !video.current ||
            !video.current.requestVideoFrameCallback) {
            return;
        }
        const context = canvas.current.getContext('2d');
        if (!context) {
            return;
        }
        context.filter = 'grayscale(100%)';
        context.drawImage(video.current, 0, 0, width, height);
        video.current.requestVideoFrameCallback(() => onVideoFrame());
    }, [height, width]);
    (0, react_1.useEffect)(() => {
        if (!video.current || !video.current.requestVideoFrameCallback) {
            return;
        }
        video.current.requestVideoFrameCallback(() => onVideoFrame());
    }, [onVideoFrame]);
    return ((0, jsx_runtime_1.jsxs)(remotion_2.AbsoluteFill, { children: [(0, jsx_runtime_1.jsx)(remotion_2.AbsoluteFill, { children: (0, jsx_runtime_1.jsx)(remotion_1.Video, { ref: video, style: { opacity: 0 }, startFrom: 300, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }) }), (0, jsx_runtime_1.jsx)(remotion_2.AbsoluteFill, { children: (0, jsx_runtime_1.jsx)("canvas", { ref: canvas, width: width, height: height }) })] }));
};
exports.VideoOnCanvas = VideoOnCanvas;
