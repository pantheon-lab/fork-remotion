"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSelectedPixelFormatAndCodecCombination = exports.getPixelFormat = exports.setPixelFormat = exports.DEFAULT_PIXEL_FORMAT = void 0;
const validOptions = [
    'yuv420p',
    'yuva420p',
    'yuv422p',
    'yuv444p',
    'yuv420p10le',
    'yuv422p10le',
    'yuv444p10le',
    'yuva444p10le',
];
exports.DEFAULT_PIXEL_FORMAT = 'yuv420p';
let currentPixelFormat = exports.DEFAULT_PIXEL_FORMAT;
const setPixelFormat = (format) => {
    if (!validOptions.includes(format)) {
        throw new TypeError(`Value ${format} is not valid as a pixel format.`);
    }
    currentPixelFormat = format;
};
exports.setPixelFormat = setPixelFormat;
const getPixelFormat = () => {
    return currentPixelFormat;
};
exports.getPixelFormat = getPixelFormat;
const validateSelectedPixelFormatAndCodecCombination = (pixelFormat, codec) => {
    if (!validOptions.includes(pixelFormat)) {
        throw new TypeError(`Value ${pixelFormat} is not valid as a pixel format.`);
    }
    if (pixelFormat !== 'yuva420p') {
        return;
    }
    if (codec !== 'vp8' && codec !== 'vp9') {
        throw new TypeError("Pixel format was set to 'yuva420p' but codec is not 'vp8' or 'vp9'. To render videos with alpha channel, you must choose a codec that supports it.");
    }
};
exports.validateSelectedPixelFormatAndCodecCombination = validateSelectedPixelFormatAndCodecCombination;
