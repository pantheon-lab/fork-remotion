"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const vitest_1 = require("vitest");
const extract_frame_from_video_1 = require("../extract-frame-from-video");
const src = path_1.default.join(__dirname, '..', '..', '..', 'example', 'public', 'framermp4withoutfileextension');
(0, vitest_1.test)('Should be able to extract a frame from a video', async () => {
    const str = await (0, extract_frame_from_video_1.extractFrameFromVideo)({
        ffmpegExecutable: null,
        ffprobeExecutable: null,
        src,
        time: 1,
        imageFormat: 'jpeg',
    });
    (0, vitest_1.expect)(str.length).toBeGreaterThan(10000);
});
(0, vitest_1.test)('Should be able to extract a frame from a video as PNG', async () => {
    const str = await (0, extract_frame_from_video_1.extractFrameFromVideo)({
        ffmpegExecutable: null,
        ffprobeExecutable: null,
        src,
        time: 1,
        imageFormat: 'png',
    });
    (0, vitest_1.expect)(str.length).toBeGreaterThan(10000);
});
(0, vitest_1.test)('Should get the last frame if out of range', async () => {
    const str = await (0, extract_frame_from_video_1.extractFrameFromVideo)({
        ffmpegExecutable: null,
        ffprobeExecutable: null,
        src,
        time: 100,
        imageFormat: 'jpeg',
    });
    (0, vitest_1.expect)(str.length).toBeGreaterThan(10000);
});
