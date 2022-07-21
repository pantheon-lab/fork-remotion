"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const render_frames_1 = require("../render-frames");
(0, vitest_1.describe)('Should validate invalid data passed to renderFrames', () => {
    (0, vitest_1.test)('Invalid FPS', () => {
        return (0, vitest_1.expect)(() => 
        // @ts-expect-error
        (0, render_frames_1.renderFrames)({
            composition: {
                durationInFrames: 100,
                fps: -1,
                height: 1000,
                width: 1000,
                id: 'hithere',
            },
        })).to.throw(/"fps" must be positive, but got -1 in the `config` object of `renderFrames\(\)`/);
    });
    (0, vitest_1.test)('Invalid durationInFrames', () => {
        return (0, vitest_1.expect)(() => 
        // @ts-expect-error
        (0, render_frames_1.renderFrames)({
            composition: {
                durationInFrames: 0.5,
                fps: 30,
                height: 1000,
                width: 1000,
                id: 'hithere',
            },
        })).toThrow(/The "durationInFrames" prop in the `config` object passed to `renderFrames\(\)` must be an integer, but got 0.5./);
    });
    (0, vitest_1.test)('Invalid height', () => {
        return (0, vitest_1.expect)(() => 
        // @ts-expect-error
        (0, render_frames_1.renderFrames)({
            config: {
                durationInFrames: 1,
                fps: 30,
                height: 1000.5,
                width: 1000,
                id: 'hithere',
            },
        })).toThrow(/The "height" prop in the `config` object passed to `renderFrames\(\)` must be an integer, but is 1000.5./);
    });
    (0, vitest_1.test)('Invalid width', () => {
        return (0, vitest_1.expect)(() => 
        // @ts-expect-error
        (0, render_frames_1.renderFrames)({
            config: {
                durationInFrames: 1,
                fps: 30,
                width: 1000.5,
                height: 1000,
                id: 'hithere',
            },
        })).toThrow(/The "width" prop in the `config` object passed to `renderFrames\(\)` must be an integer, but is 1000.5./);
    });
});
