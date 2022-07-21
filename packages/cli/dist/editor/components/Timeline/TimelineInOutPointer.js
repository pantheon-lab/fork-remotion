"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineInOutPointer = exports.outMarkerAreaRef = exports.inMarkerAreaRef = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const get_left_of_timeline_slider_1 = require("../../helpers/get-left-of-timeline-slider");
const areaHighlight = {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    bottom: 0,
    top: 0,
};
exports.inMarkerAreaRef = (0, react_1.createRef)();
exports.outMarkerAreaRef = (0, react_1.createRef)();
const TimelineInOutPointer = () => {
    const { inFrame, outFrame } = remotion_1.Internals.Timeline.useTimelineInOutFramePosition();
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const { get, width } = (0, get_left_of_timeline_slider_1.useGetXPositionOfItemInTimeline)();
    if (!videoConfig) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [inFrame !== null && ((0, jsx_runtime_1.jsx)("div", { ref: exports.inMarkerAreaRef, style: {
                    ...areaHighlight,
                    left: 0,
                    width: get(inFrame !== null && inFrame !== void 0 ? inFrame : 0),
                } })), outFrame !== null && ((0, jsx_runtime_1.jsx)("div", { ref: exports.outMarkerAreaRef, style: {
                    ...areaHighlight,
                    left: get(outFrame),
                    width: width - get(outFrame),
                } }))] }));
};
exports.TimelineInOutPointer = TimelineInOutPointer;
