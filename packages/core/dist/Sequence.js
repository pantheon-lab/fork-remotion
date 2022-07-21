"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequence = exports.SequenceContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AbsoluteFill_1 = require("./AbsoluteFill");
const CompositionManager_1 = require("./CompositionManager");
const get_timeline_clip_name_1 = require("./get-timeline-clip-name");
const nonce_1 = require("./nonce");
const timeline_position_state_1 = require("./timeline-position-state");
const use_current_frame_1 = require("./use-current-frame");
const use_unsafe_video_config_1 = require("./use-unsafe-video-config");
exports.SequenceContext = (0, react_1.createContext)(null);
const Sequence = ({ from, durationInFrames = Infinity, children, name, showInTimeline = true, showLoopTimesInTimeline, ...other }) => {
    const { layout = 'absolute-fill' } = other;
    const [id] = (0, react_1.useState)(() => String(Math.random()));
    const parentSequence = (0, react_1.useContext)(exports.SequenceContext);
    const { rootId } = (0, react_1.useContext)(timeline_position_state_1.TimelineContext);
    const cumulatedFrom = parentSequence
        ? parentSequence.cumulatedFrom + parentSequence.relativeFrom
        : 0;
    const actualFrom = cumulatedFrom + from;
    const nonce = (0, nonce_1.useNonce)();
    if (layout !== 'absolute-fill' && layout !== 'none') {
        throw new TypeError(`The layout prop of <Sequence /> expects either "absolute-fill" or "none", but you passed: ${layout}`);
    }
    // @ts-expect-error
    if (layout === 'none' && typeof other.style !== 'undefined') {
        throw new TypeError('If layout="none", you may not pass a style.');
    }
    if (typeof durationInFrames !== 'number') {
        throw new TypeError(`You passed to durationInFrames an argument of type ${typeof durationInFrames}, but it must be a number.`);
    }
    if (durationInFrames <= 0) {
        throw new TypeError(`durationInFrames must be positive, but got ${durationInFrames}`);
    }
    // Infinity is non-integer but allowed!
    if (durationInFrames % 1 !== 0 && Number.isFinite(durationInFrames)) {
        throw new TypeError(`The "durationInFrames" of a sequence must be an integer, but got ${durationInFrames}.`);
    }
    if (typeof from !== 'number') {
        throw new TypeError(`You passed to the "from" props of your <Sequence> an argument of type ${typeof from}, but it must be a number.`);
    }
    if (from % 1 !== 0) {
        throw new TypeError(`The "from" prop of a sequence must be an integer, but got ${from}.`);
    }
    const absoluteFrame = (0, use_current_frame_1.useAbsoluteCurrentFrame)();
    const unsafeVideoConfig = (0, use_unsafe_video_config_1.useUnsafeVideoConfig)();
    const compositionDuration = unsafeVideoConfig
        ? unsafeVideoConfig.durationInFrames
        : 0;
    const actualDurationInFrames = Math.min(compositionDuration - from, parentSequence
        ? Math.min(parentSequence.durationInFrames +
            (parentSequence.cumulatedFrom + parentSequence.relativeFrom) -
            actualFrom, durationInFrames)
        : durationInFrames);
    const { registerSequence, unregisterSequence } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    const contextValue = (0, react_1.useMemo)(() => {
        var _a;
        return {
            cumulatedFrom,
            relativeFrom: from,
            durationInFrames: actualDurationInFrames,
            parentFrom: (_a = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.relativeFrom) !== null && _a !== void 0 ? _a : 0,
            id,
        };
    }, [
        cumulatedFrom,
        from,
        actualDurationInFrames,
        parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.relativeFrom,
        id,
    ]);
    const timelineClipName = (0, react_1.useMemo)(() => {
        return name !== null && name !== void 0 ? name : (0, get_timeline_clip_name_1.getTimelineClipName)(children);
    }, [children, name]);
    (0, react_1.useEffect)(() => {
        var _a;
        registerSequence({
            from,
            duration: actualDurationInFrames,
            id,
            displayName: timelineClipName,
            parent: (_a = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.id) !== null && _a !== void 0 ? _a : null,
            type: 'sequence',
            rootId,
            showInTimeline,
            nonce,
            showLoopTimesInTimeline,
        });
        return () => {
            unregisterSequence(id);
        };
    }, [
        durationInFrames,
        actualFrom,
        id,
        name,
        registerSequence,
        timelineClipName,
        unregisterSequence,
        parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.id,
        actualDurationInFrames,
        rootId,
        from,
        showInTimeline,
        nonce,
        showLoopTimesInTimeline,
    ]);
    const endThreshold = (() => {
        return actualFrom + durationInFrames - 1;
    })();
    const content = absoluteFrame < actualFrom
        ? null
        : absoluteFrame > endThreshold
            ? null
            : children;
    const styleIfThere = other.layout === 'none' ? undefined : other.style;
    const defaultStyle = (0, react_1.useMemo)(() => {
        return {
            flexDirection: undefined,
            ...(styleIfThere !== null && styleIfThere !== void 0 ? styleIfThere : {}),
        };
    }, [styleIfThere]);
    return ((0, jsx_runtime_1.jsx)(exports.SequenceContext.Provider, { value: contextValue, children: content === null ? null : layout === 'absolute-fill' ? ((0, jsx_runtime_1.jsx)(AbsoluteFill_1.AbsoluteFill, { style: defaultStyle, children: content })) : (content) }));
};
exports.Sequence = Sequence;
