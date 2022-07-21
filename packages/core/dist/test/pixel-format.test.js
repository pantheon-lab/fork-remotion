"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const pixel_format_1 = require("../config/pixel-format");
const expect_to_throw_1 = require("./expect-to-throw");
(0, vitest_1.describe)('pixel-format tests setPixelFormat', () => {
    // input format
    const validPixelFormats = [
        'yuv420p',
        'yuva420p',
        'yuv422p',
        'yuv444p',
        'yuv420p10le',
        'yuv422p10le',
        'yuv444p10le',
    ];
    validPixelFormats.forEach((entry) => (0, vitest_1.test)(`test for ${entry}`, () => {
        (0, pixel_format_1.setPixelFormat)(entry);
        (0, vitest_1.expect)((0, pixel_format_1.getPixelFormat)()).toEqual(entry);
    }));
    // input format
    const invalidPixelFormats = ['abc', '', 3, undefined];
    invalidPixelFormats.forEach((entry) => (0, vitest_1.test)(`test for invalid input ${entry}`, () => (0, expect_to_throw_1.expectToThrow)(
    // @ts-expect-error
    () => (0, pixel_format_1.setPixelFormat)(entry), new RegExp(`Value ${entry} is not valid as a pixel format.`))));
});
(0, vitest_1.describe)('pixel-format tests validateSelectedPixelFormatAndCodecCombination', () => {
    const formats = [
        'yuv420p',
        'yuv422p',
        'yuv444p',
        'yuv420p10le',
        'yuv422p10le',
        'yuv444p10le',
    ];
    const codecs = ['h264', 'h265', 'vp8', 'vp9'];
    for (const format of formats) {
        for (const codec of codecs) {
            (0, vitest_1.test)(`test for valid combination ${format} and ${codec}`, () => {
                (0, vitest_1.expect)(() => (0, pixel_format_1.validateSelectedPixelFormatAndCodecCombination)(format, codec)).not.toThrow();
            });
        }
    }
    const invalidCodecs = ['h264', 'h265'];
    invalidCodecs.forEach((entry) => (0, vitest_1.test)(`test for invalid combination yuva420p and ${entry}`, () => (0, expect_to_throw_1.expectToThrow)(() => (0, pixel_format_1.validateSelectedPixelFormatAndCodecCombination)('yuva420p', entry), /Pixel format was set to 'yuva420p' but codec is not 'vp8' or 'vp9'. To render videos with alpha channel, you must choose a codec that supports it./)));
    const validCodecs = ['vp8', 'vp9'];
    validCodecs.forEach((c) => (0, vitest_1.test)(`test for valid combination yuva420p and ${c}`, () => (0, vitest_1.expect)(() => (0, pixel_format_1.validateSelectedPixelFormatAndCodecCombination)('yuva420p', c)).not.toThrow()));
    const invalidFormats = ['abc', '', 3];
    invalidFormats.forEach((entry) => (0, vitest_1.test)(`test for invalid input "${entry}"`, () => (0, expect_to_throw_1.expectToThrow)(
    // @ts-expect-error
    () => (0, pixel_format_1.validateSelectedPixelFormatAndCodecCombination)(entry, 'h264'), new RegExp(`Value ${entry} is not valid as a pixel format.`))));
});
