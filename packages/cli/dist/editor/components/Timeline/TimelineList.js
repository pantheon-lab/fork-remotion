"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const is_collapsed_1 = require("./is-collapsed");
const TimelineListItem_1 = require("./TimelineListItem");
const container = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
};
const TimelineList = ({ timeline, viewState, dispatchStateChange }) => {
    return ((0, jsx_runtime_1.jsx)("div", { style: container, children: timeline.map((track, i) => {
            const beforeDepth = i === 0 ? 0 : timeline[i - 1].depth;
            return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(TimelineListItem_1.TimelineListItem, { hash: track.hash, dispatchStateChange: dispatchStateChange, collapsed: (0, is_collapsed_1.isTrackCollapsed)(track.hash, viewState), nestedDepth: track.depth, sequence: track.sequence, beforeDepth: beforeDepth, canCollapse: track.canCollapse }, track.sequence.id) }, track.sequence.id));
        }) }));
};
exports.TimelineList = TimelineList;
