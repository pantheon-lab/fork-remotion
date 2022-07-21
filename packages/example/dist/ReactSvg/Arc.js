"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arc = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const svgPathProperties = __importStar(require("svg-path-properties"));
const config_1 = require("./config");
const rx = 170;
const ry = 400;
const arcLength = Math.PI * 2 * Math.sqrt((rx * rx + ry * ry) / 2);
function ellipseToPath(cx, cy) {
    let output = 'M' + (cx - rx).toString() + ',' + cy.toString();
    output +=
        'a' +
            rx.toString() +
            ',' +
            ry.toString() +
            ' 0 1,0 ' +
            (2 * rx).toString() +
            ',0';
    output +=
        'a' +
            rx.toString() +
            ',' +
            ry.toString() +
            ' 0 1,0 ' +
            (-2 * rx).toString() +
            ',0';
    return output;
}
const electronRadius = 6;
const Arc = ({ progress, rotation, rotateProgress, electronProgress, electronOpacity, }) => {
    const config = (0, remotion_1.useVideoConfig)();
    const cx = config.width / 2;
    const cy = config.height / 2;
    const d = ellipseToPath(cx, cy);
    const attributes = new svgPathProperties.svgPathProperties(d).getPropertiesAtLength((electronProgress % 1) * arcLength);
    const move = (orig, x, y) => orig + x * attributes.tangentX + y * attributes.tangentY;
    const leftPointArrow = [
        move(attributes.x, 0, electronRadius),
        move(attributes.y, -electronRadius, 0),
    ];
    const midPoint = [move(attributes.x, 60, 0), move(attributes.y, 0, 60)];
    const rightPointArrow = [
        move(attributes.x, 0, -electronRadius),
        move(attributes.y, electronRadius, 0),
    ];
    return ((0, jsx_runtime_1.jsxs)("svg", { viewBox: `0 0 ${config.width} ${config.height}`, style: {
            position: 'absolute',
            transform: `rotate(${rotation * rotateProgress}deg)`,
            transformOrigin: `${config.width / 2}px ${config.height / 2}px`,
        }, children: [(0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsxs)("linearGradient", { id: "gradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0%", stopColor: config_1.COLOR_1 }), (0, jsx_runtime_1.jsx)("stop", { offset: "100%", stopColor: config_1.COLOR_2 })] }) }), (0, jsx_runtime_1.jsx)("path", { d: d, fill: "none", stroke: "url(#gradient)", strokeDasharray: arcLength, strokeDashoffset: arcLength - arcLength * progress, strokeLinecap: "round", strokeWidth: 30 }), (0, jsx_runtime_1.jsx)("circle", { r: electronRadius, fill: "#fff", cx: attributes.x, cy: attributes.y, style: { opacity: electronOpacity } }), (0, jsx_runtime_1.jsx)("path", { d: `M${leftPointArrow[0]} ${leftPointArrow[1]} ${midPoint[0]} ${midPoint[1]} ${rightPointArrow[0]} ${rightPointArrow[1]} Z`, fill: "white", strokeLinecap: "round", style: { opacity: electronOpacity } })] }));
};
exports.Arc = Arc;
