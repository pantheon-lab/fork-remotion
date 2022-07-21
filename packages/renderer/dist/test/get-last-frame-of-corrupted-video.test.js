"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const vitest_1 = require("vitest");
const extract_frame_from_video_1 = require("../extract-frame-from-video");
(0, vitest_1.test)('Get last frame of corrupted video', async () => {
    await (0, extract_frame_from_video_1.getLastFrameOfVideo)({
        ffmpegExecutable: null,
        ffprobeExecutable: null,
        offset: 0,
        src: path_1.default.join(__dirname, '..', '..', '..', 'example', 'public', 'corrupted.mp4'),
        imageFormat: 'png',
        specialVCodecForTransparency: 'none',
        needsResize: null,
    });
}, 90000);
