"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const calculate_timeline_1 = require("../../helpers/calculate-timeline");
const timeline_layout_1 = require("../../helpers/timeline-layout");
const timeline_ref_1 = require("../../state/timeline-ref");
const SplitterContainer_1 = require("../Splitter/SplitterContainer");
const SplitterElement_1 = require("../Splitter/SplitterElement");
const SplitterHandle_1 = require("../Splitter/SplitterHandle");
const is_collapsed_1 = require("./is-collapsed");
const MaxTimelineTracks_1 = require("./MaxTimelineTracks");
const timeline_state_reducer_1 = require("./timeline-state-reducer");
const TimelineDragHandler_1 = require("./TimelineDragHandler");
const TimelineInOutPointer_1 = require("./TimelineInOutPointer");
const TimelineList_1 = require("./TimelineList");
const TimelineSlider_1 = require("./TimelineSlider");
const TimelineTracks_1 = require("./TimelineTracks");
const container = {
    minHeight: '100%',
    flex: 1,
    display: 'flex',
    height: 0,
    overflow: 'auto',
};
const noop = () => undefined;
const Timeline = () => {
    const { sequences } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const [state, dispatch] = (0, react_1.useReducer)(timeline_state_reducer_1.timelineStateReducer, {
        collapsed: {},
    });
    const timeline = (0, react_1.useMemo)(() => {
        if (!videoConfig) {
            return [];
        }
        return (0, calculate_timeline_1.calculateTimeline)({
            sequences,
            sequenceDuration: videoConfig.durationInFrames,
        });
    }, [sequences, videoConfig]);
    (0, react_1.useImperativeHandle)(timeline_ref_1.timelineRef, () => {
        return {
            expandAll: () => {
                dispatch({
                    type: 'expand-all',
                    allHashes: timeline.map((t) => t.hash),
                });
            },
            collapseAll: () => {
                dispatch({
                    type: 'collapse-all',
                    allHashes: timeline.map((t) => t.hash),
                });
            },
        };
    });
    const withoutHidden = (0, react_1.useMemo)(() => {
        return timeline.filter((t) => !(0, is_collapsed_1.isTrackHidden)(t, timeline, state));
    }, [state, timeline]);
    const shown = withoutHidden.slice(0, MaxTimelineTracks_1.MAX_TIMELINE_TRACKS);
    const inner = (0, react_1.useMemo)(() => {
        return {
            height: shown.length * (timeline_layout_1.TIMELINE_LAYER_HEIGHT + timeline_layout_1.TIMELINE_BORDER * 2),
            display: 'flex',
            flex: 1,
            minHeight: '100%',
            overflowX: 'hidden',
        };
    }, [shown.length]);
    if (!videoConfig) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: container, className: "css-reset", children: (0, jsx_runtime_1.jsx)("div", { style: inner, children: (0, jsx_runtime_1.jsxs)(SplitterContainer_1.SplitterContainer, { orientation: "vertical", defaultFlex: 0.2, id: "names-to-timeline", maxFlex: 0.5, minFlex: 0.15, children: [(0, jsx_runtime_1.jsx)(SplitterElement_1.SplitterElement, { type: "flexer", children: (0, jsx_runtime_1.jsx)(TimelineList_1.TimelineList, { dispatchStateChange: dispatch, viewState: state, timeline: shown }) }), (0, jsx_runtime_1.jsx)(SplitterHandle_1.SplitterHandle, { onCollapse: noop, allowToCollapse: false }), (0, jsx_runtime_1.jsxs)(SplitterElement_1.SplitterElement, { type: "anti-flexer", children: [(0, jsx_runtime_1.jsx)(TimelineTracks_1.TimelineTracks, { viewState: state, timeline: shown, fps: videoConfig.fps, hasBeenCut: withoutHidden.length > shown.length }), (0, jsx_runtime_1.jsx)(TimelineInOutPointer_1.TimelineInOutPointer, {}), (0, jsx_runtime_1.jsx)(TimelineDragHandler_1.TimelineDragHandler, {}), (0, jsx_runtime_1.jsx)(TimelineSlider_1.TimelineSlider, {})] })] }) }) }));
};
exports.Timeline = Timeline;
