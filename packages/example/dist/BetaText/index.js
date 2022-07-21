"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const BRAND_GRADIENT = ['#5851db', '#405de6'];
const solidBrand = (0, polished_1.mix)(0.5, BRAND_GRADIENT[0], BRAND_GRADIENT[1]);
const Label = styled_components_1.default.span `
	font-size: 120px;
	font-family: ${(props) => props.outline ? 'Altero Outline' : 'Altero-Regular'};
	text-align: center;
	transform: scaleX(1);
	line-height: 1em;
	margin-left: 10px;
	margin-right: 10px;
	display: inline-block;
`;
const lines = 7;
const Row = ({ videoWidth, i, text, zoom }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const videoConfig = (0, remotion_1.useVideoConfig)();
    const progress = (0, remotion_1.spring)({
        config: {
            damping: 30,
            mass: 1,
            stiffness: 40,
            overshootClamping: false,
        },
        fps: videoConfig.fps,
        from: 0,
        to: 1,
        frame,
    });
    const posX = (0, remotion_1.interpolate)(progress, [0, 1], [1, 0]);
    const dir = i % 2 === 0 ? -1 : 1;
    const color = (0, polished_1.mix)(Math.min(1, (lines - i - 1) / lines), BRAND_GRADIENT[0], BRAND_GRADIENT[1]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            whiteSpace: 'nowrap',
            width: 10000,
            marginLeft: -(10000 - videoWidth) / 2 + posX * 1000 * dir,
            textAlign: 'center',
            color,
            opacity: 1 - zoom,
        }, children: [(0, jsx_runtime_1.jsx)(Label, { outline: true, style: { transform: `scale(${progress})` }, children: text }), (0, jsx_runtime_1.jsx)(Label, { outline: true, style: { transform: `scale(${progress})` }, children: text }), (0, jsx_runtime_1.jsx)(Label, { outline: true, style: { transform: `scale(${progress})` }, children: text }), (0, jsx_runtime_1.jsx)(Label, { outline: true, style: { transform: `scale(${progress})` }, children: text }), (0, jsx_runtime_1.jsx)(Label, { outline: false, style: { transform: `scale(${progress})` }, children: text }), (0, jsx_runtime_1.jsx)(Label, { outline: true, style: { transform: `scale(${progress})` }, children: text }), (0, jsx_runtime_1.jsx)(Label, { outline: true, style: { transform: `scale(${progress})` }, children: text }), (0, jsx_runtime_1.jsx)(Label, { outline: true, style: { transform: `scale(${progress})` }, children: text }), (0, jsx_runtime_1.jsx)(Label, { outline: true, style: { transform: `scale(${progress})` }, children: text })] }));
};
const BetaText = ({ word1 }) => {
    const videoConfig = (0, remotion_1.useVideoConfig)();
    const frame = (0, remotion_1.useCurrentFrame)();
    const progress = (0, remotion_1.spring)({
        config: {
            damping: 30,
            mass: 1,
            stiffness: 40,
            overshootClamping: false,
        },
        fps: videoConfig.fps,
        from: 0,
        to: 1,
        frame: Math.max(0, frame - 70),
    });
    const scale = (0, remotion_1.interpolate)(progress, [0, 0.4], [1, 10]);
    const backgroundColor = (0, polished_1.mix)(1 - progress, '#fff', solidBrand);
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            width: videoConfig.width,
            height: videoConfig.height,
            display: 'flex',
            transform: `scale(${scale})`,
        }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                backgroundColor,
                flex: 1,
            }, children: new Array(17)
                .fill(true)
                .map((_, i) => i)
                .map((key) => {
                return ((0, jsx_runtime_1.jsx)(Row, { zoom: progress, text: key === 7
                        ? 'CET'
                        : key === 5
                            ? '5pm'
                            : key === 3
                                ? word1 !== null && word1 !== void 0 ? word1 : 'TOMORROW'
                                : key === 1
                                    ? 'ANYSTICKER'
                                    : 'BETA', i: key, videoWidth: videoConfig.width }, key));
            }) }) }));
};
exports.default = BetaText;
