"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const vitest_1 = require("vitest");
const guess_extension_for_media_1 = require("../guess-extension-for-media");
(0, vitest_1.test)('Guess extension for media - H264', async () => {
    const extension = await (0, guess_extension_for_media_1.guessExtensionForVideo)(path_1.default.join(__dirname, '..', '..', '..', 'example', 'public', 'framermp4withoutfileextension'));
    (0, vitest_1.expect)(extension).toBe('mp4');
});
(0, vitest_1.test)('Guess extension for media - WebM', async () => {
    const extension = await (0, guess_extension_for_media_1.guessExtensionForVideo)(path_1.default.join(__dirname, '..', '..', '..', 'example', 'public', 'framer.webm'));
    (0, vitest_1.expect)(extension).toBe('webm');
});
(0, vitest_1.test)('Guess extension for media - WAV', async () => {
    const extension = await (0, guess_extension_for_media_1.guessExtensionForVideo)(path_1.default.join(__dirname, '..', '..', '..', 'example', 'public', '22khz.wav'));
    (0, vitest_1.expect)(extension).toBe('wav');
});
