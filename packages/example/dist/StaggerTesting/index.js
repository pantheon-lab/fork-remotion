"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesTesting = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const ReactSvg_1 = __importDefault(require("../ReactSvg"));
const Tiles_1 = __importDefault(require("../Tiles"));
const SeriesTesting = () => {
    return ((0, jsx_runtime_1.jsxs)(remotion_1.Series, { children: [(0, jsx_runtime_1.jsx)(remotion_1.Series.Sequence, { durationInFrames: 10, children: (0, jsx_runtime_1.jsx)(Tiles_1.default, {}) }), (0, jsx_runtime_1.jsx)(remotion_1.Series.Sequence, { durationInFrames: 50, children: (0, jsx_runtime_1.jsx)(ReactSvg_1.default, { transparent: false }) }), (0, jsx_runtime_1.jsx)(remotion_1.Series.Sequence, { durationInFrames: 80, children: (0, jsx_runtime_1.jsx)(Tiles_1.default, {}) })] }));
};
exports.SeriesTesting = SeriesTesting;
