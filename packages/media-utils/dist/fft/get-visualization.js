"use strict";
// Adapted from node-fft project by Joshua Wong and Ben Bryan
// https://github.com/vail-systems/node-fft
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisualization = void 0;
const fft_1 = require("./fft");
const mag_1 = require("./mag");
const smoothing_1 = require("./smoothing");
const to_int_16_1 = require("./to-int-16");
const getVisualization = ({ sampleSize, data, sampleRate, frame, fps, maxInt, }) => {
    const isPowerOfTwo = sampleSize > 0 && (sampleSize & (sampleSize - 1)) === 0;
    if (!isPowerOfTwo) {
        throw new TypeError(`The argument "bars" must be a power of two. For example: 64, 128. Got instead: ${sampleSize}`);
    }
    if (!fps) {
        throw new TypeError('The argument "fps" was not provided');
    }
    if (data.length < sampleSize) {
        throw new TypeError('Audio data is not big enough to provide ' + sampleSize + ' bars.');
    }
    const start = Math.floor((frame / fps) * sampleRate);
    const actualStart = Math.max(0, start - sampleSize / 2);
    const ints = new Int16Array({
        length: sampleSize,
    });
    ints.set(data.subarray(actualStart, actualStart + sampleSize).map((x) => (0, to_int_16_1.toInt16)(x)));
    const phasors = (0, fft_1.fft)(ints);
    const magnitudes = (0, mag_1.fftMag)(phasors).map((p) => p);
    return (0, smoothing_1.smoothen)(magnitudes).map((m) => m / (sampleSize / 2) / maxInt);
};
exports.getVisualization = getVisualization;