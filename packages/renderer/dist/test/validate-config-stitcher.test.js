"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const stitch_frames_to_video_1 = require("../stitch-frames-to-video");
(0, vitest_1.describe)('Should validate invalid data passed to stitchFramesToVideo', () => {
    (0, vitest_1.test)('Invalid FPS', () => {
        return (0, vitest_1.expect)(() => 
        // @ts-expect-error
        (0, stitch_frames_to_video_1.stitchFramesToVideo)({
            fps: -1,
            height: 1000,
            width: 1000,
        })).rejects.toThrow(/"fps" must be positive, but got -1 in `stitchFramesToVideo\(\)`/);
    });
    (0, vitest_1.test)('Invalid height', () => {
        return (0, vitest_1.expect)(
        // @ts-expect-error
        (0, stitch_frames_to_video_1.stitchFramesToVideo)({
            fps: 30,
            height: 1000.5,
            width: 1000,
        })).rejects.toThrow(/The "height" prop passed to `stitchFramesToVideo\(\)` must be an integer, but is 1000.5./);
    });
    (0, vitest_1.test)('Invalid width', () => {
        return (0, vitest_1.expect)(
        // @ts-expect-error
        (0, stitch_frames_to_video_1.stitchFramesToVideo)({
            fps: 30,
            width: 1000.5,
            height: 1000,
        })).rejects.toThrow(/The "width" prop passed to `stitchFramesToVideo\(\)` must be an integer, but is 1000.5./);
    });
});
