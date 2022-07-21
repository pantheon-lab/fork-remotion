"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxTimelineTracksReached = exports.MAX_TIMELINE_TRACKS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const timeline_layout_1 = require("../../helpers/timeline-layout");
exports.MAX_TIMELINE_TRACKS = typeof process.env.MAX_TIMELINE_TRACKS === 'undefined'
    ? 15
    : Number(process.env.MAX_TIMELINE_TRACKS);
const container = {
    paddingTop: 6,
    paddingBottom: 6,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'sans-serif',
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: timeline_layout_1.TIMELINE_PADDING + 5,
};
const MaxTimelineTracksReached = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: ["Limited display to ", exports.MAX_TIMELINE_TRACKS, " tracks to sustain performance.", '', "You can change this by setting Config.Preview.setMaxTimelineTracks() in your remotion.config.ts file."] }));
};
exports.MaxTimelineTracksReached = MaxTimelineTracksReached;
