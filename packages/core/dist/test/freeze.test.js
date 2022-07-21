"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @vitest-environment jsdom
 */
const react_1 = require("@testing-library/react");
const vitest_1 = require("vitest");
const CanUseRemotionHooks_1 = require("../CanUseRemotionHooks");
const freeze_1 = require("../freeze");
const index_1 = require("../index");
const timeline_position_state_1 = require("../timeline-position-state");
const use_current_frame_1 = require("../use-current-frame");
const expect_to_throw_1 = require("./expect-to-throw");
(0, vitest_1.describe)('Prop validation', () => {
    (0, vitest_1.test)('It should throw if Freeze has string as frame prop value', () => {
        (0, expect_to_throw_1.expectToThrow)(
        // @ts-expect-error
        () => (0, react_1.render)((0, jsx_runtime_1.jsx)(freeze_1.Freeze, { frame: '0' })), /The 'frame' prop of <Freeze \/> must be a number, but is of type string/);
    });
    (0, vitest_1.test)('It should throw if Freeze has undefined as frame prop value', () => {
        (0, expect_to_throw_1.expectToThrow)(
        // @ts-expect-error
        () => (0, react_1.render)((0, jsx_runtime_1.jsx)(freeze_1.Freeze, {})), /The <Freeze \/> component requires a 'frame' prop, but none was passed./);
    });
});
const timelineCtxValue = (frame) => ({
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
});
const renderForFrame = (frame, markup) => {
    return (0, react_1.render)((0, jsx_runtime_1.jsx)(CanUseRemotionHooks_1.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: timelineCtxValue(frame), children: markup }) }));
};
const Basic = () => {
    return ((0, jsx_runtime_1.jsx)(freeze_1.Freeze, { frame: 300, children: (0, jsx_runtime_1.jsx)(TestComponent, {}) }));
};
const WithSequence = () => {
    const SequenceFrom = 200;
    const FreezeFrame = 100;
    return ((0, jsx_runtime_1.jsx)(index_1.Sequence, { from: SequenceFrom, layout: "none", children: (0, jsx_runtime_1.jsx)(freeze_1.Freeze, { frame: FreezeFrame, children: (0, jsx_runtime_1.jsx)(TestComponent, {}) }) }));
};
const TestComponent = () => {
    const frame = (0, use_current_frame_1.useCurrentFrame)();
    return (0, jsx_runtime_1.jsx)("div", { children: frame });
};
(0, vitest_1.describe)('Integration tests', () => {
    (0, vitest_1.test)('Basic test', () => {
        const { container } = renderForFrame(0, (0, jsx_runtime_1.jsx)(Basic, {}));
        (0, vitest_1.expect)(container.innerHTML).toBe('<div>300</div>');
    });
    (0, vitest_1.test)('Should ignore a Sequence', () => {
        const { container } = renderForFrame(300, (0, jsx_runtime_1.jsx)(WithSequence, {}));
        (0, vitest_1.expect)(container.innerHTML).toBe('<div>100</div>');
    });
});
