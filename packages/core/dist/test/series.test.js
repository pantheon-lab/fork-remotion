"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @vitest-environment jsdom
 */
/* eslint-disable react/jsx-no-constructed-context-values */
const react_1 = require("@testing-library/react");
const vitest_1 = require("vitest");
const CanUseRemotionHooks_1 = require("../CanUseRemotionHooks");
const index_1 = require("../index");
const timeline_position_state_1 = require("../timeline-position-state");
const use_current_frame_1 = require("../use-current-frame");
const First = () => {
    const frame = (0, use_current_frame_1.useCurrentFrame)();
    return (0, jsx_runtime_1.jsx)("div", { children: 'first ' + frame });
};
const Second = () => {
    const frame = (0, use_current_frame_1.useCurrentFrame)();
    return (0, jsx_runtime_1.jsx)("div", { children: 'second ' + frame });
};
const Third = () => {
    const frame = (0, use_current_frame_1.useCurrentFrame)();
    return (0, jsx_runtime_1.jsx)("div", { children: 'third ' + frame });
};
const renderForFrame = (frame, markup) => {
    return (0, react_1.render)((0, jsx_runtime_1.jsx)(CanUseRemotionHooks_1.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: {
                rootId: '',
                frame,
                playing: false,
                imperativePlaying: {
                    current: false,
                },
                playbackRate: 1,
                setPlaybackRate: () => {
                    throw new Error('playback rate');
                },
                audioAndVideoTags: { current: [] },
            }, children: markup }) }));
};
(0, vitest_1.test)('Basic series test', () => {
    const { queryByText } = renderForFrame(10, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(First, {}) }), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}) }), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Third, {}) })] }));
    (0, vitest_1.expect)(queryByText(/^third\s0$/)).not.toBe(null);
});
(0, vitest_1.test)('Should support fragments', () => {
    const { container } = renderForFrame(10, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(First, {}) }), (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}) }, "0"), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Third, {}) }, "1")] })] }));
    (0, vitest_1.expect)(container.outerHTML).not.toBe(null);
});
(0, vitest_1.test)('Should not allow foreign elements', () => {
    (0, vitest_1.expect)(() => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(First, {}) }));
    }).toThrow(/only accepts a/);
});
(0, vitest_1.test)('Should allow layout prop', () => {
    const { container } = renderForFrame(0, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 1, children: (0, jsx_runtime_1.jsx)(First, {}) }) }));
    (0, vitest_1.expect)(container.outerHTML).toBe('<div><div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; width: 100%; height: 100%; display: flex;"><div>first 0</div></div></div>');
    const { container: withoutLayoutContainer } = renderForFrame(0, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 1, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}) }) }));
    (0, vitest_1.expect)(withoutLayoutContainer.outerHTML).toBe('<div><div>first 0</div></div>');
});
(0, vitest_1.test)('Should render nothing after the end', () => {
    const { container } = renderForFrame(10, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 1, children: (0, jsx_runtime_1.jsx)(First, {}) }) }));
    (0, vitest_1.expect)(container.outerHTML).toBe('<div></div>');
});
(0, vitest_1.test)('Should throw if invalid or no duration provided', () => {
    (0, vitest_1.expect)(() => {
        renderForFrame(10, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: NaN, children: (0, jsx_runtime_1.jsx)(First, {}) }) }));
    }).toThrow(/The "durationInFrames" prop of a <Series.Sequence \/> component must be an integer, but got NaN./);
    (0, vitest_1.expect)(() => {
        renderForFrame(10, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { children: (0, jsx_runtime_1.jsx)(First, {}) }) }));
    }).toThrow(/The "durationInFrames" prop of a <Series.Sequence \/> component must be a number, but you passed a value of type undefined/);
});
(0, vitest_1.test)('Should allow whitespace', () => {
    const { queryByText } = renderForFrame(11, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 10, children: (0, jsx_runtime_1.jsx)(First, {}) }), ' ', (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 10, children: (0, jsx_runtime_1.jsx)(Second, {}) })] }));
    (0, vitest_1.expect)(queryByText(/^second\s1$/g)).not.toBe(null);
});
(0, vitest_1.test)('Handle empty Series.Sequence', () => {
    (0, vitest_1.expect)(() => renderForFrame(11, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 10, children: (0, jsx_runtime_1.jsx)(First, {}) }), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 10 })] }))).toThrow(/A <Series.Sequence \/> component \(index = 1, duration = 10\) was detected to not have any children\. Delete it to fix this error\./);
});
(0, vitest_1.test)('Should allow negative overlap prop', () => {
    const { container } = renderForFrame(4, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}) }), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: -1, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}) })] }));
    (0, vitest_1.expect)(container.outerHTML).toBe('<div><div>first 4</div><div>second 0</div></div>');
});
(0, vitest_1.test)('Should allow positive overlap prop', () => {
    const { container } = renderForFrame(5, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}) }), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: 1, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}) })] }));
    (0, vitest_1.expect)(container.outerHTML).toBe('<div></div>');
});
(0, vitest_1.test)('Should disallow NaN as offset prop', () => {
    (0, vitest_1.expect)(() => {
        renderForFrame(9, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: NaN, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}) }) }));
    }).toThrow(/The "offset" property of a <Series.Sequence \/> must not be NaN, but got NaN \(index = 0, duration = 5\)\./);
});
(0, vitest_1.test)('Should disallow Infinity as offset prop', () => {
    (0, vitest_1.expect)(() => {
        renderForFrame(9, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: Infinity, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}) }) }));
    }).toThrow(/The "offset" property of a <Series.Sequence \/> must be finite, but got Infinity \(index = 0, duration = 5\)\./);
});
(0, vitest_1.test)('Should disallow non-integer numbers as offset prop', () => {
    (0, vitest_1.expect)(() => {
        renderForFrame(9, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: Math.PI, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}) }) }));
    }).toThrow(/The "offset" property of a <Series.Sequence \/> must be finite, but got 3.141592653589793 \(index = 0, duration = 5\)\./);
});
(0, vitest_1.test)('Should cascade negative offset props', () => {
    const { container } = renderForFrame(9, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}) }), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: -1, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}) }), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Third, {}) })] }));
    (0, vitest_1.expect)(container.outerHTML).toBe('<div><div>third 0</div></div>');
});
(0, vitest_1.test)('Should cascade positive offset props', () => {
    const { container } = renderForFrame(11, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}) }), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: 1, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}) }), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Third, {}) })] }));
    (0, vitest_1.expect)(container.outerHTML).toBe('<div><div>third 0</div></div>');
});
