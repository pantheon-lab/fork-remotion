"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessAudioTrack = void 0;
const execa_1 = __importDefault(require("execa"));
const get_audio_channels_1 = require("./assets/get-audio-channels");
const calculate_ffmpeg_filters_1 = require("./calculate-ffmpeg-filters");
const ffmpeg_filter_file_1 = require("./ffmpeg-filter-file");
const p_limit_1 = require("./p-limit");
const resolve_asset_src_1 = require("./resolve-asset-src");
const preprocessAudioTrackUnlimited = async ({ ffmpegExecutable, ffprobeExecutable, outName, asset, expectedFrames, fps, }) => {
    const { channels, duration } = await (0, get_audio_channels_1.getAudioChannelsAndDuration)((0, resolve_asset_src_1.resolveAssetSrc)(asset.src), ffprobeExecutable);
    const filter = (0, calculate_ffmpeg_filters_1.calculateFfmpegFilter)({
        asset,
        durationInFrames: expectedFrames,
        fps,
        channels,
        assetDuration: duration,
    });
    if (filter === null) {
        return null;
    }
    const { cleanup, file } = await (0, ffmpeg_filter_file_1.makeFfmpegFilterFile)(filter);
    const args = [
        ['-i', (0, resolve_asset_src_1.resolveAssetSrc)(asset.src)],
        ['-ac', '2'],
        ['-filter_script:a', file],
        ['-c:a', 'pcm_s16le'],
        ['-y', outName],
    ].flat(2);
    await (0, execa_1.default)(ffmpegExecutable !== null && ffmpegExecutable !== void 0 ? ffmpegExecutable : 'ffmpeg', args);
    cleanup();
    return outName;
};
const limit = (0, p_limit_1.pLimit)(2);
const preprocessAudioTrack = (options) => {
    return limit(preprocessAudioTrackUnlimited, options);
};
exports.preprocessAudioTrack = preprocessAudioTrack;
