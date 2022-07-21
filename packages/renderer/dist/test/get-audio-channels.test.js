"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const vitest_1 = require("vitest");
const get_audio_channels_1 = require("../assets/get-audio-channels");
(0, vitest_1.test)('Get audio channels for video', async () => {
    const videoWithoutAudio = path_1.default.join(__dirname, '..', '..', '..', 'example', 'src', 'resources', 'framer-music.mp4');
    (0, vitest_1.expect)((0, fs_1.existsSync)(videoWithoutAudio)).toEqual(true);
    const channels = await (0, get_audio_channels_1.getAudioChannelsAndDuration)(videoWithoutAudio, null);
    (0, vitest_1.expect)(channels).toEqual({ channels: 2, duration: 10 });
}, 90000);
(0, vitest_1.test)('Get audio channels for video without music', async () => {
    const videoWithAudio = path_1.default.join(__dirname, '..', '..', '..', 'example', 'src', 'resources', 'framer.mp4');
    (0, vitest_1.expect)((0, fs_1.existsSync)(videoWithAudio)).toEqual(true);
    const channels = await (0, get_audio_channels_1.getAudioChannelsAndDuration)(videoWithAudio, null);
    (0, vitest_1.expect)(channels).toEqual({ channels: 0, duration: 3.334 });
}, 90000);
(0, vitest_1.test)('Get audio channels for video with music', async () => {
    const audio = path_1.default.join(__dirname, '..', '..', '..', 'example', 'src', 'resources', 'sound1.mp3');
    (0, vitest_1.expect)((0, fs_1.existsSync)(audio)).toEqual(true);
    const channels = await (0, get_audio_channels_1.getAudioChannelsAndDuration)(audio, null);
    (0, vitest_1.expect)(channels).toEqual({ channels: 2, duration: 56.529 });
}, 90000);
(0, vitest_1.test)('Throw error if parsing a non video file', () => {
    const tsFile = path_1.default.join(__dirname, '..', 'ffmpeg-flags.ts');
    (0, vitest_1.expect)((0, fs_1.existsSync)(tsFile)).toEqual(true);
    (0, vitest_1.expect)(() => (0, get_audio_channels_1.getAudioChannelsAndDuration)(tsFile, null)).rejects.toThrow(/Invalid data found when processing input/);
});
