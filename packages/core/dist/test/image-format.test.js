"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const image_format_1 = require("../config/image-format");
const expect_to_throw_1 = require("./expect-to-throw");
(0, vitest_1.describe)('SetImageFormat with valid inputs', () => {
    const formatInputs = [
        'png',
        'jpeg',
        'none',
        undefined,
    ];
    formatInputs.forEach((entry) => (0, vitest_1.test)(`testing with format "${entry}"`, () => {
        // @ts-expect-error
        (0, image_format_1.setImageFormat)(entry);
        (0, vitest_1.expect)((0, image_format_1.getUserPreferredImageFormat)()).toEqual(entry);
    }));
});
(0, vitest_1.test)('SetImageFormat should throw if image format is not valid', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, image_format_1.setImageFormat)(
    // @ts-expect-error
    'invalidImageFormat'), /Value invalidImageFormat is not valid as an image format./);
});
(0, vitest_1.test)('validateSelectedPixelFormatAndImageFormatCombination should throw if image format is not valid', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, image_format_1.validateSelectedPixelFormatAndImageFormatCombination)('yuv420p', 
    // @ts-expect-error
    'invalidImageFormat'), /Value invalidImageFormat is not valid as an image format./);
});
(0, vitest_1.test)('Special case - invalid combination with pixel ("yuva420p") and image format ("jpeg") should throw', () => {
    (0, expect_to_throw_1.expectToThrow)(() => (0, image_format_1.validateSelectedPixelFormatAndImageFormatCombination)('yuva420p', 'jpeg'), /Pixel format was set to 'yuva420p' but the image format is not PNG. To render transparent videos, you need to set PNG as the image format./);
});
(0, vitest_1.test)('Special case - valid combination with pixel ("yuva420p") and image format ("png") should not throw', () => {
    (0, vitest_1.expect)((0, image_format_1.validateSelectedPixelFormatAndImageFormatCombination)('yuva420p', 'png')).toEqual('valid');
});
(0, vitest_1.test)('Valid combination with pixel and image format ("png") should not throw', () => {
    (0, vitest_1.expect)((0, image_format_1.validateSelectedPixelFormatAndImageFormatCombination)('yuv420p', 'png')).toEqual('valid');
});
(0, vitest_1.test)('Valid combination with pixel and image format ("jpeg") should not throw', () => {
    (0, vitest_1.expect)((0, image_format_1.validateSelectedPixelFormatAndImageFormatCombination)('yuv420p', 'jpeg')).toEqual('valid');
});
(0, vitest_1.test)('"none" as image format should not throw', () => {
    (0, vitest_1.expect)((0, image_format_1.validateSelectedPixelFormatAndImageFormatCombination)('yuv420p', 'none')).toEqual('none');
});
