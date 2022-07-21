"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineSequence = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const get_timeline_sequence_layout_1 = require("../../helpers/get-timeline-sequence-layout");
const timeline_layout_1 = require("../../helpers/timeline-layout");
const rich_timeline_1 = require("../../state/rich-timeline");
const AudioWaveform_1 = require("../AudioWaveform");
const Thumbnail_1 = require("../Thumbnail");
const LoopedTimelineIndicators_1 = require("./LoopedTimelineIndicators");
const timeline_refs_1 = require("./timeline-refs");
const TimelineVideoInfo_1 = require("./TimelineVideoInfo");
const SEQUENCE_GRADIENT = 'linear-gradient(to bottom, #3697e1, #348AC7 60%)';
const AUDIO_GRADIENT = 'linear-gradient(rgb(16 171 58), rgb(43 165 63) 60%)';
const VIDEO_GRADIENT = 'linear-gradient(to top, #8e44ad, #9b59b6)';
const TimelineSequence = ({ s, fps }) => {
    var _a, _b;
    const size = player_1.PlayerInternals.useElementSize(timeline_refs_1.sliderAreaRef, {
        triggerOnWindowResize: false,
        shouldApplyCssTransforms: true,
    });
    const { richTimeline } = (0, react_1.useContext)(rich_timeline_1.RichTimelineContext);
    const windowWidth = (_a = size === null || size === void 0 ? void 0 : size.width) !== null && _a !== void 0 ? _a : 0;
    // If a duration is 1, it is essentially a still and it should have width 0
    // Some compositions may not be longer than their media duration,
    // if that is the case, it needs to be asynchronously determined
    const [maxMediaDuration, setMaxMediaDuration] = (0, react_1.useState)(Infinity);
    const video = remotion_1.Internals.useVideo();
    if (!video) {
        throw new TypeError('Expected video config');
    }
    const { marginLeft, width } = (0, get_timeline_sequence_layout_1.getTimelineSequenceLayout)({
        durationInFrames: s.duration * ((_b = s.showLoopTimesInTimeline) !== null && _b !== void 0 ? _b : 1),
        startFrom: s.from,
        startFromMedia: s.type === 'sequence' ? 0 : s.startMediaFrom,
        maxMediaDuration,
        video,
        windowWidth,
    });
    const style = (0, react_1.useMemo)(() => {
        return {
            background: s.type === 'audio'
                ? AUDIO_GRADIENT
                : s.type === 'video'
                    ? VIDEO_GRADIENT
                    : SEQUENCE_GRADIENT,
            border: get_timeline_sequence_layout_1.SEQUENCE_BORDER_WIDTH + 'px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 4,
            position: 'absolute',
            height: timeline_layout_1.TIMELINE_LAYER_HEIGHT,
            marginTop: 1,
            marginLeft,
            width,
            color: 'white',
            overflow: 'hidden',
        };
    }, [marginLeft, s.type, width]);
    const row = (0, react_1.useMemo)(() => {
        return {
            flexDirection: 'row',
            display: 'flex',
            borderRadius: 5,
            overflow: 'hidden',
        };
    }, []);
    const thumbnailWidth = timeline_layout_1.TIMELINE_LAYER_HEIGHT * (video.width / video.height);
    return ((0, jsx_runtime_1.jsxs)("div", { style: style, title: s.displayName, children: [(0, jsx_runtime_1.jsx)("div", { style: row, children: richTimeline && s.type === 'sequence' ? ((0, jsx_runtime_1.jsx)(Thumbnail_1.Thumbnail, { targetHeight: timeline_layout_1.TIMELINE_LAYER_HEIGHT, targetWidth: thumbnailWidth, composition: video, frameToDisplay: Math.floor(s.from + s.duration / 2) })) : null }), s.type === 'audio' ? ((0, jsx_runtime_1.jsx)(AudioWaveform_1.AudioWaveform, { src: s.src, doesVolumeChange: s.doesVolumeChange, visualizationWidth: width, startFrom: s.startMediaFrom, durationInFrames: s.duration, fps: fps, volume: s.volume, setMaxMediaDuration: setMaxMediaDuration })) : null, s.type === 'video' ? (0, jsx_runtime_1.jsx)(TimelineVideoInfo_1.TimelineVideoInfo, { src: s.src }) : null, s.showLoopTimesInTimeline === undefined ? null : ((0, jsx_runtime_1.jsx)(LoopedTimelineIndicators_1.LoopedTimelineIndicator, { loops: s.showLoopTimesInTimeline }))] }, s.id));
};
exports.TimelineSequence = TimelineSequence;
