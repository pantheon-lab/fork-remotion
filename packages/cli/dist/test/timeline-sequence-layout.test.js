"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const get_timeline_sequence_layout_1 = require("../editor/helpers/get-timeline-sequence-layout");
(0, vitest_1.test)('Should test timeline sequence layout without max media duration', () => {
    (0, vitest_1.expect)((0, get_timeline_sequence_layout_1.getTimelineSequenceLayout)({
        durationInFrames: 400,
        startFrom: 2023,
        startFromMedia: 0,
        maxMediaDuration: null,
        video: {
            durationInFrames: 2423,
            fps: 30,
            height: 1080,
            width: 1920,
            id: 'main',
            component: {
                // @ts-expect-error
                _payload: {
                    _status: 1,
                },
            },
            props: {},
            nonce: 16,
        },
        windowWidth: 1414.203125,
    })).toEqual({
        marginLeft: 1154,
        width: 226,
    });
});
(0, vitest_1.test)('Should test timeline sequence layout with max media duration', () => {
    (0, vitest_1.expect)((0, get_timeline_sequence_layout_1.getTimelineSequenceLayout)({
        durationInFrames: 400,
        startFrom: 2023,
        maxMediaDuration: 400,
        startFromMedia: 10,
        video: {
            durationInFrames: 2423,
            fps: 30,
            height: 1080,
            width: 1920,
            id: 'main',
            component: {
                // @ts-expect-error
                _payload: {
                    _status: 1,
                },
            },
            props: {},
            nonce: 16,
        },
        windowWidth: 1414.203125,
    })).toEqual({
        marginLeft: 1154,
        width: 221,
    });
});
