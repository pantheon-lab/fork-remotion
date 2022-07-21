"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const calculate_sar_dar_pixels_1 = require("../calculate-sar-dar-pixels");
(0, vitest_1.test)('Should parse display dimensions based on SAR and DAR correctly', () => {
    const size = (0, calculate_sar_dar_pixels_1.calculateDisplayVideoSize)({
        x: 1280,
        y: 720,
        darX: 896,
        darY: 1593,
    });
    (0, vitest_1.expect)(size).toEqual({
        width: 720,
        height: 1280,
    });
    const size2 = (0, calculate_sar_dar_pixels_1.calculateDisplayVideoSize)({
        x: 1920,
        y: 1080,
        darX: 16,
        darY: 9,
    });
    (0, vitest_1.expect)(size2).toEqual({
        width: 1920,
        height: 1080,
    });
});
