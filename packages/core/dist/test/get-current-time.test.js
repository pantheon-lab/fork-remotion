"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const get_current_time_1 = require("../video/get-current-time");
(0, vitest_1.describe)('correctly calculate media time of video element', () => {
    const mp4Precision = 0.04;
    const webmPrecision = 0.02;
    (0, vitest_1.describe)('src mp4', () => {
        (0, vitest_1.test)('mp4 - Should correctly calculate the media time of a video element', () => {
            (0, vitest_1.expect)((0, get_current_time_1.getMediaTime)({
                fps: 30,
                frame: 30,
                playbackRate: 1,
                src: 'video.mp4',
                startFrom: 0,
                mediaType: 'video',
            })).toBeCloseTo(1, mp4Precision);
        });
        (0, vitest_1.test)('mp4 - Should correctly calculate the media time of a video element with faster framerate', () => {
            (0, vitest_1.expect)((0, get_current_time_1.getMediaTime)({
                fps: 30,
                frame: 30,
                playbackRate: 2,
                src: 'video.mp4',
                startFrom: 0,
                mediaType: 'video',
            })).toBeCloseTo(2, mp4Precision);
        });
        (0, vitest_1.test)('mp4 - Should correctly calculate the media time of a video element with faster framerate and a startFrom', () => {
            // If playbackrate is 2, but the video only starts after 1 second, at 2sec, the video position should be 3sec
            (0, vitest_1.expect)((0, get_current_time_1.getMediaTime)({
                fps: 30,
                frame: 60,
                playbackRate: 2,
                src: 'video.mp4',
                startFrom: 30,
                mediaType: 'video',
            })).toBeCloseTo(3, mp4Precision);
        });
    });
    (0, vitest_1.describe)('src webm', () => {
        (0, vitest_1.test)('webm - Should correctly calculate the media time of a video element', () => {
            (0, vitest_1.expect)((0, get_current_time_1.getMediaTime)({
                fps: 30,
                frame: 30,
                playbackRate: 1,
                src: 'video.webm',
                startFrom: 0,
                mediaType: 'video',
            })).toBeCloseTo(1, webmPrecision);
        });
        (0, vitest_1.test)('webm - Should correctly calculate the media time of a video element with faster framerate', () => {
            (0, vitest_1.expect)((0, get_current_time_1.getMediaTime)({
                fps: 30,
                frame: 30,
                playbackRate: 2,
                src: 'video.webm',
                startFrom: 0,
                mediaType: 'video',
            })).toBeCloseTo(2, webmPrecision);
        });
        (0, vitest_1.test)('webm - Should correctly calculate the media time of a video element with faster framerate and a startFrom', () => {
            // If playbackrate is 2, but the video only starts after 1 second, at 2sec, the video position should be 3sec
            (0, vitest_1.expect)((0, get_current_time_1.getMediaTime)({
                fps: 30,
                frame: 60,
                playbackRate: 2,
                src: 'video.webm',
                startFrom: 30,
                mediaType: 'video',
            })).toBeCloseTo(3, webmPrecision);
        });
    });
});
