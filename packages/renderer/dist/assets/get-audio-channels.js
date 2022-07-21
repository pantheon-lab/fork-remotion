"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAudioChannelsAndDuration = void 0;
const execa_1 = __importDefault(require("execa"));
const p_limit_1 = require("../p-limit");
const durationOfAssetCache = {};
const limit = (0, p_limit_1.pLimit)(1);
async function getAudioChannelsAndDurationUnlimited(src, ffprobeExecutable) {
    if (durationOfAssetCache[src]) {
        return durationOfAssetCache[src];
    }
    const args = [
        ['-v', 'error'],
        ['-show_entries', 'stream=channels:format=duration'],
        ['-of', 'default=nw=1'],
        [src],
    ]
        .reduce((acc, val) => acc.concat(val), [])
        .filter(Boolean);
    const task = await (0, execa_1.default)(ffprobeExecutable !== null && ffprobeExecutable !== void 0 ? ffprobeExecutable : 'ffprobe', args);
    const channels = task.stdout.match(/channels=([0-9]+)/);
    const duration = task.stdout.match(/duration=([0-9.]+)/);
    const result = {
        channels: channels ? parseInt(channels[1], 10) : 0,
        duration: duration ? parseFloat(duration[1]) : null,
    };
    durationOfAssetCache[src] = result;
    return result;
}
const getAudioChannelsAndDuration = (src, ffprobeExecutable) => {
    return limit(() => getAudioChannelsAndDurationUnlimited(src, ffprobeExecutable));
};
exports.getAudioChannelsAndDuration = getAudioChannelsAndDuration;
