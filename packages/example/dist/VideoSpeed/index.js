"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoSpeed = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const framer_music_mp4_1 = __importDefault(require("../resources/framer-music.mp4"));
const VideoSpeed = () => {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        }, children: (0, jsx_runtime_1.jsx)(remotion_1.Video, { src: framer_music_mp4_1.default, playbackRate: 2, startFrom: 20 }) }));
};
exports.VideoSpeed = VideoSpeed;
