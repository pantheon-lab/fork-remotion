"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineSequenceFrame = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const render_frame_1 = require("../../state/render-frame");
const relativeFrameStyle = {
    fontSize: 12,
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'white',
    opacity: 0.6,
    marginTop: 2,
    cursor: 'help',
};
const TimelineSequenceFrame = ({ from, duration }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    const relativeFrame = frame - from;
    const isInRange = relativeFrame >= 0 && relativeFrame < duration;
    if (!isInRange) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { title: `
The current time within the sequence.

Call \`useCurrentFrame()\` within the sequence to get the time programmatically.

Call \`const {durationInFrames} = useVideoConfig()\` to get the duration of the sequence.
`.trim(), style: relativeFrameStyle, children: [(0, render_frame_1.renderFrame)(relativeFrame, fps), " (", relativeFrame, ")"] }));
};
exports.TimelineSequenceFrame = TimelineSequenceFrame;
