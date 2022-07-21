"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyFfmpegFilter = void 0;
const remotion_1 = require("remotion");
const calculate_atempo_1 = require("./assets/calculate-atempo");
const ffmpeg_volume_expression_1 = require("./assets/ffmpeg-volume-expression");
const sample_rate_1 = require("./sample-rate");
const stringifyFfmpegFilter = ({ trimLeft, trimRight, channels, startInVideo, volume, fps, playbackRate, durationInFrames, assetDuration, }) => {
    const startInVideoSeconds = startInVideo / fps;
    if (assetDuration && trimLeft >= assetDuration) {
        return null;
    }
    const volumeFilter = (0, ffmpeg_volume_expression_1.ffmpegVolumeExpression)({
        volume,
        fps,
        trimLeft,
    });
    // Avoid setting filters if possible, as combining them can create noise
    const chunkLength = durationInFrames / fps;
    const actualTrimRight = assetDuration
        ? Math.min(trimRight, assetDuration)
        : trimRight;
    const padAtEnd = chunkLength - (actualTrimRight - trimLeft) - startInVideoSeconds;
    return (`[0:a]` +
        [
            `aformat=sample_fmts=s32:sample_rates=${sample_rate_1.DEFAULT_SAMPLE_RATE}`,
            // Order matters! First trim the audio
            `atrim=${trimLeft.toFixed(6)}:${actualTrimRight.toFixed(6)}`,
            // then set the tempo
            (0, calculate_atempo_1.calculateATempo)(playbackRate),
            // set the volume if needed
            // The timings for volume must include whatever is in atrim, unless the volume
            // filter gets applied before atrim
            volumeFilter.value === '1'
                ? null
                : `volume=${volumeFilter.value}:eval=${volumeFilter.eval}`,
            // For n channels, we delay n + 1 channels.
            // This is because `ffprobe` for some audio files reports the wrong amount
            // of channels.
            // This should be fine because FFMPEG documentation states:
            // "Unused delays will be silently ignored."
            // https://ffmpeg.org/ffmpeg-filters.html#adelay
            startInVideoSeconds === 0
                ? null
                : `adelay=${new Array(channels + 1)
                    .fill((startInVideoSeconds * 1000).toFixed(0))
                    .join('|')}`,
            // Only in the end, we pad to the full length.
            padAtEnd > 0.0000001
                ? 'apad=pad_len=' + Math.round(padAtEnd * sample_rate_1.DEFAULT_SAMPLE_RATE)
                : null,
        ]
            .filter(remotion_1.Internals.truthy)
            .join(',') +
        `[a0]`);
};
exports.stringifyFfmpegFilter = stringifyFfmpegFilter;
