"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizeAudio = void 0;
const get_visualization_1 = require("./fft/get-visualization");
const max_value_cached_1 = require("./fft/max-value-cached");
const cache = {};
const visualizeAudioFrame = ({ audioData: metadata, frame, fps, numberOfSamples, }) => {
    const cacheKey = metadata.resultId + frame + fps + numberOfSamples;
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    const maxInt = (0, max_value_cached_1.getMaxPossibleMagnitude)(metadata);
    return (0, get_visualization_1.getVisualization)({
        sampleSize: numberOfSamples * 2,
        data: metadata.channelWaveforms[0],
        frame,
        fps,
        sampleRate: metadata.sampleRate,
        maxInt,
    });
};
const visualizeAudio = ({ smoothing = true, ...parameters }) => {
    if (!smoothing) {
        return visualizeAudioFrame(parameters);
    }
    const toSmooth = [
        parameters.frame - 1,
        parameters.frame,
        parameters.frame + 1,
    ];
    const all = toSmooth.map((s) => {
        return visualizeAudioFrame({ ...parameters, frame: s });
    });
    return new Array(parameters.numberOfSamples).fill(true).map((_x, i) => {
        return (new Array(toSmooth.length)
            .fill(true)
            .map((_, j) => {
            return all[j][i];
        })
            .reduce((a, b) => a + b, 0) / toSmooth.length);
    });
};
exports.visualizeAudio = visualizeAudio;
