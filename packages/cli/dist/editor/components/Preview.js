"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPreview = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const checkerboard_background_1 = require("../helpers/checkerboard-background");
const checkerboard_1 = require("../state/checkerboard");
const preview_size_1 = require("../state/preview-size");
const checkerboardSize = 49;
const containerStyle = (options) => {
    return {
        transform: `scale(${options.scale})`,
        marginLeft: options.xCorrection,
        marginTop: options.yCorrection,
        width: options.width,
        height: options.height,
        display: 'flex',
        position: 'absolute',
        backgroundColor: (0, checkerboard_background_1.checkerboardBackgroundColor)(options.checkerboard),
        backgroundImage: (0, checkerboard_background_1.checkerboardBackgroundImage)(options.checkerboard),
        backgroundSize: (0, checkerboard_background_1.getCheckerboardBackgroundSize)(checkerboardSize) /* Must be a square */,
        backgroundPosition: (0, checkerboard_background_1.getCheckerboardBackgroundPos)(checkerboardSize) /* Must be half of one side of the square */,
    };
};
const Inner = ({ canvasSize }) => {
    const { size: previewSize } = (0, react_1.useContext)(preview_size_1.PreviewSizeContext);
    const portalContainer = (0, react_1.useRef)(null);
    const config = (0, remotion_1.useVideoConfig)();
    const { checkerboard } = (0, react_1.useContext)(checkerboard_1.CheckerboardContext);
    const { centerX, centerY, yCorrection, xCorrection, scale } = player_1.PlayerInternals.calculateScale({
        canvasSize,
        compositionHeight: config.height,
        compositionWidth: config.width,
        previewSize,
    });
    const outer = (0, react_1.useMemo)(() => {
        return {
            width: config.width * scale,
            height: config.height * scale,
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: centerX,
            top: centerY,
            overflow: 'hidden',
        };
    }, [centerX, centerY, config.height, config.width, scale]);
    const style = (0, react_1.useMemo)(() => {
        return containerStyle({
            checkerboard,
            scale,
            xCorrection,
            yCorrection,
            width: config.width,
            height: config.height,
        });
    }, [
        checkerboard,
        config.height,
        config.width,
        scale,
        xCorrection,
        yCorrection,
    ]);
    (0, react_1.useEffect)(() => {
        const { current } = portalContainer;
        current === null || current === void 0 ? void 0 : current.appendChild(remotion_1.Internals.portalNode());
        return () => {
            current === null || current === void 0 ? void 0 : current.removeChild(remotion_1.Internals.portalNode());
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { style: outer, children: (0, jsx_runtime_1.jsx)("div", { ref: portalContainer, style: style }) }));
};
const VideoPreview = ({ canvasSize }) => {
    const config = remotion_1.Internals.useUnsafeVideoConfig();
    if (!config) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(Inner, { canvasSize: canvasSize });
};
exports.VideoPreview = VideoPreview;
