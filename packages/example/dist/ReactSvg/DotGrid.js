"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledSvg = styled_components_1.default.svg `
	position: absolute;
`;
const DotGrid = () => {
    const videoConfig = (0, remotion_1.useVideoConfig)();
    const dotSpacing = Math.ceil(videoConfig.width / 50);
    const rows = Math.ceil(videoConfig.height / dotSpacing);
    return ((0, jsx_runtime_1.jsx)(StyledSvg, { viewBox: `0 0 ${videoConfig.width} ${videoConfig.height}`, children: new Array(50).fill(true).map((_, i) => {
            return new Array(rows).fill(true).map((_j, j) => {
                return ((0, jsx_runtime_1.jsx)("circle", { r: 2, cx: i * dotSpacing, cy: j * dotSpacing, fill: "rgba(0, 0, 0, 0.1)" }, j));
            });
        }) }));
};
exports.DotGrid = DotGrid;
