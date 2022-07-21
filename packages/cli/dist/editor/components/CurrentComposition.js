"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentComposition = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const is_composition_still_1 = require("../helpers/is-composition-still");
const render_frame_1 = require("../state/render-frame");
const rich_timeline_1 = require("../state/rich-timeline");
const layout_1 = require("./layout");
const Thumbnail_1 = require("./Thumbnail");
const container = {
    minHeight: 100,
    display: 'block',
    borderBottom: '1px solid black',
    padding: 16,
    color: 'white',
};
const title = {
    fontWeight: 'bold',
    fontSize: 12,
    whiteSpace: 'nowrap',
    lineHeight: '18px',
};
const subtitle = {
    fontSize: 12,
    opacity: 0.8,
    whiteSpace: 'nowrap',
    lineHeight: '18px',
};
const row = {
    display: 'flex',
    flexDirection: 'row',
    lineHeight: '18px',
};
const targetHeight = 60;
const targetWidth = (targetHeight * 16) / 9;
const CurrentComposition = () => {
    const richTimelineContext = (0, react_1.useContext)(rich_timeline_1.RichTimelineContext);
    const video = remotion_1.Internals.useVideo();
    (0, react_1.useEffect)(() => {
        if (!video) {
            document.title = 'Remotion Preview';
            return;
        }
        document.title = `${video.id} / ${window.remotion_projectName} - Remotion Preview`;
    }, [video]);
    if (!video) {
        return (0, jsx_runtime_1.jsx)("div", { style: container });
    }
    const frameToDisplay = Math.floor(video.durationInFrames / 2);
    return ((0, jsx_runtime_1.jsx)("div", { style: container, children: (0, jsx_runtime_1.jsxs)("div", { style: row, children: [richTimelineContext.richTimeline ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Thumbnail_1.Thumbnail, { composition: video, targetHeight: targetHeight, targetWidth: targetWidth, frameToDisplay: frameToDisplay }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1 })] })) : null, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: title, children: video.id }), (0, jsx_runtime_1.jsxs)("div", { style: subtitle, children: [video.width, "x", video.height, (0, is_composition_still_1.isCompositionStill)(video) ? null : `, ${video.fps} FPS`] }), (0, is_composition_still_1.isCompositionStill)(video) ? ((0, jsx_runtime_1.jsx)("div", { style: subtitle, children: "Still" })) : ((0, jsx_runtime_1.jsxs)("div", { style: subtitle, children: ["Duration ", (0, render_frame_1.renderFrame)(video.durationInFrames, video.fps)] }))] })] }) }));
};
exports.CurrentComposition = CurrentComposition;
