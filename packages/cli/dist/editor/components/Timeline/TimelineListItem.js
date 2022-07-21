"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineListItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const timeline_layout_1 = require("../../helpers/timeline-layout");
const z_index_1 = require("../../state/z-index");
const TimelineCollapseToggle_1 = require("./TimelineCollapseToggle");
const TimelineSequenceFrame_1 = require("./TimelineSequenceFrame");
const HOOK_WIDTH = 7;
const BORDER_BOTTOM_LEFT_RADIUS = 2;
const SPACING = 5;
const textStyle = {
    fontSize: 13,
};
const outer = {
    height: timeline_layout_1.TIMELINE_LAYER_HEIGHT + timeline_layout_1.TIMELINE_BORDER * 2,
    color: 'white',
    fontFamily: 'Arial, Helvetica, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: timeline_layout_1.TIMELINE_PADDING,
    wordBreak: 'break-all',
};
const hookContainer = {
    height: timeline_layout_1.TIMELINE_LAYER_HEIGHT,
    width: HOOK_WIDTH,
    position: 'relative',
};
const hook = {
    borderLeft: '1px solid #555',
    borderBottom: '1px solid #555',
    borderBottomLeftRadius: BORDER_BOTTOM_LEFT_RADIUS,
    width: HOOK_WIDTH,
    position: 'absolute',
    bottom: timeline_layout_1.TIMELINE_LAYER_HEIGHT / 2 - 1,
};
const space = {
    width: SPACING,
};
const smallSpace = {
    width: SPACING * 0.5,
};
const collapser = {
    width: 8,
    userSelect: 'none',
    marginRight: 10,
};
const collapserButton = {
    ...collapser,
    border: 'none',
    background: 'none',
};
const TimelineListItem = ({ nestedDepth, sequence, collapsed, beforeDepth, dispatchStateChange, hash, canCollapse, }) => {
    const { tabIndex } = (0, z_index_1.useZIndex)();
    const leftOffset = HOOK_WIDTH + SPACING * 1.5;
    const hookStyle = (0, react_1.useMemo)(() => {
        return {
            ...hook,
            height: timeline_layout_1.TIMELINE_LAYER_HEIGHT +
                BORDER_BOTTOM_LEFT_RADIUS / 2 -
                (beforeDepth === nestedDepth ? 2 : 12),
        };
    }, [beforeDepth, nestedDepth]);
    const padder = (0, react_1.useMemo)(() => {
        return {
            width: leftOffset * nestedDepth,
        };
    }, [leftOffset, nestedDepth]);
    const toggleCollapse = (0, react_1.useCallback)(() => {
        if (collapsed) {
            dispatchStateChange({
                type: 'expand',
                hash,
            });
        }
        else {
            dispatchStateChange({
                type: 'collapse',
                hash,
            });
        }
    }, [collapsed, dispatchStateChange, hash]);
    const text = sequence.displayName.length > 80
        ? sequence.displayName.slice(0, 80) + '...'
        : sequence.displayName;
    return ((0, jsx_runtime_1.jsxs)("div", { style: outer, children: [(0, jsx_runtime_1.jsx)("div", { style: padder }), canCollapse ? ((0, jsx_runtime_1.jsx)("button", { tabIndex: tabIndex, type: "button", style: collapserButton, onClick: toggleCollapse, children: (0, jsx_runtime_1.jsx)(TimelineCollapseToggle_1.TimelineCollapseToggle, { collapsed: collapsed }) })) : ((0, jsx_runtime_1.jsx)("div", { style: collapser })), sequence.parent && nestedDepth > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: smallSpace }), (0, jsx_runtime_1.jsx)("div", { style: hookContainer, children: (0, jsx_runtime_1.jsx)("div", { style: hookStyle }) }), (0, jsx_runtime_1.jsx)("div", { style: space })] })) : null, (0, jsx_runtime_1.jsxs)("div", { style: textStyle, children: [text || 'Untitled', (0, jsx_runtime_1.jsx)(TimelineSequenceFrame_1.TimelineSequenceFrame, { duration: sequence.duration, from: sequence.from })] })] }));
};
exports.TimelineListItem = TimelineListItem;
