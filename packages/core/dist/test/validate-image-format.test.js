"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const validate_image_format_1 = require("../validation/validate-image-format");
(0, vitest_1.test)('"none" is not a valid image format', () => {
    (0, vitest_1.expect)(() => (0, validate_image_format_1.validateNonNullImageFormat)('jpeg')).not.toThrow();
    (0, vitest_1.expect)(() => (0, validate_image_format_1.validateNonNullImageFormat)('png')).not.toThrow();
    (0, vitest_1.expect)(() => (0, validate_image_format_1.validateNonNullImageFormat)('none')).toThrow(/Image format should be either "png" or "jpeg"/);
});
