"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loop = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const __1 = require("..");
const validate_duration_in_frames_1 = require("../validation/validate-duration-in-frames");
const Loop = ({ durationInFrames, times = Infinity, children, layout, name, }) => {
    const { durationInFrames: compDuration } = (0, __1.useVideoConfig)();
    (0, validate_duration_in_frames_1.validateDurationInFrames)(durationInFrames, 'of the <Loop /> component');
    if (typeof times !== 'number') {
        throw new TypeError(`You passed to "times" an argument of type ${typeof times}, but it must be a number.`);
    }
    if (times !== Infinity && times % 1 !== 0) {
        throw new TypeError(`The "times" prop of a loop must be an integer, but got ${times}.`);
    }
    if (times < 0) {
        throw new TypeError(`The "times" prop of a loop must be at least 0, but got ${times}`);
    }
    const maxTimes = Math.ceil(compDuration / durationInFrames);
    const actualTimes = Math.min(maxTimes, times);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: new Array(actualTimes).fill(true).map((_, i) => {
            return ((0, jsx_runtime_1.jsx)(__1.Sequence
            // eslint-disable-next-line react/no-array-index-key
            , { durationInFrames: durationInFrames, from: i * durationInFrames, layout: layout, name: name, showLoopTimesInTimeline: actualTimes, showInTimeline: i === 0, children: children }, `loop-${i}`));
        }) }));
};
exports.Loop = Loop;
