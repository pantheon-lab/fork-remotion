"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineSlider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const get_left_of_timeline_slider_1 = require("../../helpers/get-left-of-timeline-slider");
const TimelineSliderHandle_1 = require("./TimelineSliderHandle");
const container = {
    position: 'absolute',
    bottom: 0,
    top: 0,
    pointerEvents: 'none',
};
const line = {
    height: '100%',
    width: 1,
    position: 'fixed',
    backgroundColor: '#f02c00',
};
const TimelineSlider = () => {
    const timelinePosition = remotion_1.Internals.Timeline.useTimelinePosition();
    const { get } = (0, get_left_of_timeline_slider_1.useGetXPositionOfItemInTimeline)();
    const style = (0, react_1.useMemo)(() => {
        const left = get(timelinePosition);
        return {
            ...container,
            transform: `translateX(${left}px)`,
        };
    }, [timelinePosition, get]);
    return ((0, jsx_runtime_1.jsx)("div", { style: style, children: (0, jsx_runtime_1.jsx)("div", { style: line, children: (0, jsx_runtime_1.jsx)(TimelineSliderHandle_1.TimelineSliderHandle, {}) }) }));
};
exports.TimelineSlider = TimelineSlider;
