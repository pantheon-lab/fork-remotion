"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeValue = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const is_current_selected_still_1 = require("../helpers/is-current-selected-still");
const render_frame_1 = require("../state/render-frame");
const text = {
    color: 'white',
    fontSize: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontVariantNumeric: 'tabular-nums',
    lineHeight: 1,
};
const time = {
    display: 'inline-block',
    fontSize: 16,
};
const frameStyle = {
    color: '#ccc',
    fontSize: 10,
    fontWeight: 500,
};
const TimeValue = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const config = remotion_1.Internals.useUnsafeVideoConfig();
    const isStill = (0, is_current_selected_still_1.useIsStill)();
    if (!config) {
        return null;
    }
    if (isStill) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: text, children: [(0, jsx_runtime_1.jsx)("div", { style: time, children: (0, render_frame_1.renderFrame)(frame, config.fps) }), ' ', (0, jsx_runtime_1.jsxs)("div", { style: frameStyle, children: [frame, " ", (0, jsx_runtime_1.jsxs)("span", { style: frameStyle, children: ["(", config.fps, " fps)"] })] })] }));
};
exports.TimeValue = TimeValue;
