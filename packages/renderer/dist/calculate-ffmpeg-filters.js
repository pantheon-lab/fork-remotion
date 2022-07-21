"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFfmpegFilter = void 0;
const flatten_volume_array_1 = require("./assets/flatten-volume-array");
const stringify_ffmpeg_filter_1 = require("./stringify-ffmpeg-filter");
const calculateFfmpegFilter = ({ asset, fps, durationInFrames, channels, assetDuration, }) => {
    if (channels === 0) {
        return null;
    }
    const assetTrimLeft = (asset.trimLeft * asset.playbackRate) / fps;
    const assetTrimRight = assetTrimLeft + (asset.duration * asset.playbackRate) / fps;
    return (0, stringify_ffmpeg_filter_1.stringifyFfmpegFilter)({
        channels,
        startInVideo: asset.startInVideo,
        trimLeft: assetTrimLeft,
        trimRight: assetTrimRight,
        volume: (0, flatten_volume_array_1.flattenVolumeArray)(asset.volume),
        fps,
        playbackRate: asset.playbackRate,
        durationInFrames,
        assetDuration,
    });
};
exports.calculateFfmpegFilter = calculateFfmpegFilter;
