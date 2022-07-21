"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const get_frame_padded_index_1 = require("../get-frame-padded-index");
(0, vitest_1.test)('Get frame padded index', () => {
    (0, vitest_1.expect)((0, get_frame_padded_index_1.getFrameOutputFileName)({
        countType: 'from-zero',
        frame: 0,
        imageFormat: 'jpeg',
        index: 0,
        lastFrame: 100,
        totalFrames: 100,
    })).toBe('element-00.jpeg');
    (0, vitest_1.expect)((0, get_frame_padded_index_1.getFrameOutputFileName)({
        countType: 'from-zero',
        frame: 50,
        imageFormat: 'jpeg',
        index: 50,
        lastFrame: 100,
        totalFrames: 100,
    })).toBe('element-50.jpeg');
    (0, vitest_1.expect)((0, get_frame_padded_index_1.getFrameOutputFileName)({
        countType: 'actual-frames',
        frame: 50,
        imageFormat: 'jpeg',
        index: 50,
        lastFrame: 100,
        totalFrames: 101,
    })).toBe('element-050.jpeg');
    (0, vitest_1.expect)((0, get_frame_padded_index_1.getFrameOutputFileName)({
        countType: 'actual-frames',
        frame: 50,
        imageFormat: 'jpeg',
        index: 50,
        lastFrame: 99,
        totalFrames: 100,
    })).toBe('element-50.jpeg');
});
