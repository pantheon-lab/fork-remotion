"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const media_utils_1 = require("@remotion/media-utils");
const polished_1 = require("polished");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const DropDots_1 = __importDefault(require("../DropDots/DropDots"));
const sound1_mp3_1 = __importDefault(require("../resources/sound1.mp3"));
const Background = (0, styled_components_1.default)(remotion_1.Img) `
	height: 100%;
	width: 120%;
	margin-left: -15%;
`;
const Blur = (0, styled_components_1.default)(remotion_1.AbsoluteFill) `
	backdrop-filter: blur(5px);
`;
const FullSize = (0, styled_components_1.default)(remotion_1.AbsoluteFill) `
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Orb = styled_components_1.default.div `
	height: 400px;
	width: 400px;
	border-radius: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 70px;
	font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-weight: bold;
	text-transform: lowercase;
	flex-direction: column;
`;
const Text = ({ color, transform, blur }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const cool = (offset) => Math.sin((frame + offset) / 10);
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { style: {
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color,
            transform,
            filter: `blur(${blur}px)`,
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    transform: `translateY(${cool(0) * 8}px)`,
                }, children: "Remotion" }), (0, jsx_runtime_1.jsx)("div", { style: {
                    transform: `translateY(${cool(5) * 8}px)`,
                }, children: "Nation" })] }));
};
const AudioVisualization = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { width, height, fps } = (0, remotion_1.useVideoConfig)();
    const audioData = (0, media_utils_1.useAudioData)(sound1_mp3_1.default);
    if (!audioData) {
        return null;
    }
    const visualization = (0, media_utils_1.visualizeAudio)({
        fps,
        frame,
        audioData,
        numberOfSamples: 32,
    });
    const scale = 1 +
        (0, remotion_1.interpolate)(visualization[1], [0.14, 1], [0, 0.6], {
            extrapolateLeft: 'clamp',
        });
    const backgroundScale = 1 + (0, remotion_1.interpolate)(visualization[visualization.length - 1], [0, 0.7], [0, 1]);
    const circlesOut = visualization.slice(4);
    const rgbEffect = (0, remotion_1.interpolate)(visualization[Math.floor(visualization.length / 3)], [0, 0.5], [0, 30]);
    const dropStart = 1989;
    const dropEnd = 3310;
    const dayInterpolation = [dropStart - 5, dropStart, dropEnd, dropEnd + 5];
    const day = (0, remotion_1.interpolate)(frame, dayInterpolation, [1, 0, 0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const night = (0, remotion_1.interpolate)(frame, dayInterpolation, [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const orbRgb = Math.round((0, remotion_1.interpolate)(day, [0, 1], [30, 255]));
    const textRgb = Math.round((0, remotion_1.interpolate)(night, [0, 1], [0, 255]));
    const orbBackground = `rgb(${orbRgb}, ${orbRgb}, ${orbRgb})`;
    const textColor = `rgba(${textRgb}, ${textRgb}, ${textRgb}, 0.8)`;
    const onlySeconds = circlesOut.filter((_x, i) => i % 2 === 0);
    const circlesToUse = [...onlySeconds, ...onlySeconds];
    return ((0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { children: [(0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { children: (0, jsx_runtime_1.jsx)(Background, { style: { transform: `scale(${backgroundScale})`, opacity: night }, src: "https://fast-cdn.dynamicwallpaper.club/wallpapers%2Feq8ggec3apr%2Fthumbs%2F800%2F0.jpg?generation=1614257969409557&alt=media" }) }), (0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { children: (0, jsx_runtime_1.jsx)(Background, { style: { transform: `scale(${backgroundScale})`, opacity: day }, src: "https://fast-cdn.dynamicwallpaper.club/wallpapers%2Feq8ggec3apr%2Fthumbs%2F800%2F4.jpg?generation=1614257969529252&alt=media" }) })] }), (0, jsx_runtime_1.jsx)(Blur, {}), (0, jsx_runtime_1.jsx)(DropDots_1.default, { opacity: night, volume: (0, remotion_1.interpolate)(visualization[1], [0, 0.24], [0, 1], {
                    extrapolateLeft: 'clamp',
                }) }), (0, jsx_runtime_1.jsx)(remotion_1.Audio, { src: sound1_mp3_1.default }), (0, jsx_runtime_1.jsxs)(FullSize, { children: [circlesToUse.map((v, i) => {
                        const leftNeighbour = i === circlesToUse.length - 1
                            ? circlesToUse[0]
                            : circlesToUse[i + 1];
                        const rightNeighbour = i === 0
                            ? circlesToUse[circlesToUse.length - 1]
                            : circlesToUse[i - 1];
                        const a = (i / circlesToUse.length) * Math.PI * 2;
                        const offset = (300 +
                            Math.log((0, remotion_1.interpolate)((v + leftNeighbour + rightNeighbour) / 3, [0.0, 1], [0, 1], {
                                extrapolateLeft: 'clamp',
                            }) * 600) *
                                6) *
                            day;
                        const x = Math.sin(a) * offset;
                        const y = Math.cos(a) * offset;
                        return ((0, jsx_runtime_1.jsx)("div", { style: {
                                backgroundColor: 'white',
                                height: 20,
                                width: 20,
                                borderRadius: 10,
                                position: 'absolute',
                                left: x + width / 2,
                                top: y + height / 2,
                            } }));
                    }), (0, jsx_runtime_1.jsxs)(Orb, { style: {
                            transform: `scale(${scale})`,
                            backgroundColor: orbBackground,
                            boxShadow: `0 0 50px ${(0, polished_1.transparentize)(0.5, textColor)}`,
                        }, children: [(0, jsx_runtime_1.jsx)(Text, { blur: 2, color: "rgba(255, 0, 0, 0.3)", transform: `translateY(${-rgbEffect}px) translateX(${rgbEffect * 2}px)` }), (0, jsx_runtime_1.jsx)(Text, { blur: 2, color: "rgba(0, 255, 0, 0.3)", transform: `translateX(${rgbEffect * 3}px) translateY(${rgbEffect * 3}px)` }), (0, jsx_runtime_1.jsx)(Text, { blur: 2, color: "rgba(0, 0, 255, 0.3)", transform: `translateX(${-rgbEffect * 3}px)` }), (0, jsx_runtime_1.jsx)(Text, { blur: 0, color: textColor, transform: `translateY(${rgbEffect}px)` })] })] })] }));
};
exports.default = AudioVisualization;
