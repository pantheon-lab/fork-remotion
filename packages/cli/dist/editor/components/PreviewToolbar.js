"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const timeline_layout_1 = require("../helpers/timeline-layout");
const loop_1 = require("../state/loop");
const CheckboardToggle_1 = require("./CheckboardToggle");
const FpsCounter_1 = require("./FpsCounter");
const layout_1 = require("./layout");
const LoopToggle_1 = require("./LoopToggle");
const MuteToggle_1 = require("./MuteToggle");
const PlaybackKeyboardShortcutsManager_1 = require("./PlaybackKeyboardShortcutsManager");
const PlaybackRatePersistor_1 = require("./PlaybackRatePersistor");
const PlaybackRateSelector_1 = require("./PlaybackRateSelector");
const PlayPause_1 = require("./PlayPause");
const RichTimelineToggle_1 = require("./RichTimelineToggle");
const SizeSelector_1 = require("./SizeSelector");
const TimelineInOutToggle_1 = require("./TimelineInOutToggle");
const TimeValue_1 = require("./TimeValue");
const container = {
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px solid rgba(0, 0, 0, 0.5)',
    paddingTop: 2,
    paddingBottom: 2,
    alignItems: 'center',
    flexDirection: 'row',
};
const sideContainer = {
    width: 300,
    height: 38,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};
const padding = {
    width: timeline_layout_1.TIMELINE_PADDING,
};
const PreviewToolbar = () => {
    const { playbackRate, setPlaybackRate } = (0, react_1.useContext)(remotion_1.Internals.Timeline.TimelineContext);
    const { mediaMuted } = (0, react_1.useContext)(remotion_1.Internals.MediaVolumeContext);
    const { setMediaMuted } = (0, react_1.useContext)(remotion_1.Internals.SetMediaVolumeContext);
    const [loop, setLoop] = (0, react_1.useState)((0, loop_1.loadLoopOption)());
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, className: "css-reset", children: [(0, jsx_runtime_1.jsxs)("div", { style: sideContainer, children: [(0, jsx_runtime_1.jsx)("div", { style: padding }), (0, jsx_runtime_1.jsx)(TimeValue_1.TimeValue, {})] }), (0, jsx_runtime_1.jsx)(layout_1.Flex, {}), (0, jsx_runtime_1.jsx)(SizeSelector_1.SizeSelector, {}), (0, jsx_runtime_1.jsx)(PlaybackRateSelector_1.PlaybackRateSelector, { setPlaybackRate: setPlaybackRate, playbackRate: playbackRate }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 2 }), (0, jsx_runtime_1.jsx)(PlayPause_1.PlayPause, { loop: loop, playbackRate: playbackRate }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 2 }), (0, jsx_runtime_1.jsx)(LoopToggle_1.LoopToggle, { loop: loop, setLoop: setLoop }), (0, jsx_runtime_1.jsx)(CheckboardToggle_1.CheckboardToggle, {}), (0, jsx_runtime_1.jsx)(RichTimelineToggle_1.RichTimelineToggle, {}), (0, jsx_runtime_1.jsx)(TimelineInOutToggle_1.TimelineInOutPointToggle, {}), (0, jsx_runtime_1.jsx)(MuteToggle_1.MuteToggle, { muted: mediaMuted, setMuted: setMediaMuted }), (0, jsx_runtime_1.jsx)(layout_1.Flex, {}), (0, jsx_runtime_1.jsxs)("div", { style: sideContainer, children: [(0, jsx_runtime_1.jsx)(layout_1.Flex, {}), (0, jsx_runtime_1.jsx)(FpsCounter_1.FpsCounter, { playbackSpeed: playbackRate }), (0, jsx_runtime_1.jsx)("div", { style: padding })] }), (0, jsx_runtime_1.jsx)(PlaybackKeyboardShortcutsManager_1.PlaybackKeyboardShortcutsManager, { setPlaybackRate: setPlaybackRate }), (0, jsx_runtime_1.jsx)(PlaybackRatePersistor_1.PlaybackRatePersistor, {})] }));
};
exports.PreviewToolbar = PreviewToolbar;
