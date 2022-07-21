"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineTracks = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const timeline_layout_1 = require("../../helpers/timeline-layout");
const is_collapsed_1 = require("./is-collapsed");
const MaxTimelineTracks_1 = require("./MaxTimelineTracks");
const TimelineSequence_1 = require("./TimelineSequence");
const content = {
    paddingLeft: timeline_layout_1.TIMELINE_PADDING,
    paddingRight: timeline_layout_1.TIMELINE_PADDING,
};
const timelineContent = {
    flex: 1,
    backgroundColor: '#111111',
    width: '100%',
};
const TimelineTracks = ({ timeline, fps, viewState, hasBeenCut }) => {
    const inner = (0, react_1.useMemo)(() => {
        return {
            height: timeline_layout_1.TIMELINE_LAYER_HEIGHT + timeline_layout_1.TIMELINE_BORDER * 2,
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { style: timelineContent, children: [(0, jsx_runtime_1.jsx)("div", { style: content, children: timeline.map((track) => {
                    if ((0, is_collapsed_1.isTrackHidden)(track, timeline, viewState)) {
                        return null;
                    }
                    return ((0, jsx_runtime_1.jsx)("div", { style: inner, children: (0, jsx_runtime_1.jsx)(TimelineSequence_1.TimelineSequence, { fps: fps, s: track.sequence }) }, track.sequence.id));
                }) }), hasBeenCut ? (0, jsx_runtime_1.jsx)(MaxTimelineTracks_1.MaxTimelineTracksReached, {}) : null] }));
};
exports.TimelineTracks = TimelineTracks;
