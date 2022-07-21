"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineDragHandler = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const get_left_of_timeline_slider_1 = require("../../helpers/get-left-of-timeline-slider");
const timeline_layout_1 = require("../../helpers/timeline-layout");
const FramePersistor_1 = require("../FramePersistor");
const timeline_refs_1 = require("./timeline-refs");
const TimelineInOutPointer_1 = require("./TimelineInOutPointer");
const TimelineInOutPointerHandle_1 = require("./TimelineInOutPointerHandle");
const inner = {
    overflowY: 'auto',
    overflowX: 'hidden',
};
const container = {
    userSelect: 'none',
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
};
const getFrameFromX = (clientX, durationInFrames, width, extrapolate) => {
    var _a;
    const pos = clientX - timeline_layout_1.TIMELINE_PADDING;
    const frame = Math.round((0, remotion_1.interpolate)(pos, [0, width - timeline_layout_1.TIMELINE_PADDING * 2], [0, (_a = durationInFrames - 1) !== null && _a !== void 0 ? _a : 0], {
        extrapolateLeft: extrapolate,
        extrapolateRight: extrapolate,
    }));
    return frame;
};
const TimelineDragHandler = () => {
    var _a, _b;
    const size = player_1.PlayerInternals.useElementSize(timeline_refs_1.sliderAreaRef, {
        triggerOnWindowResize: true,
        shouldApplyCssTransforms: true,
    });
    const [inOutDragging, setInOutDragging] = (0, react_1.useState)({
        dragging: false,
    });
    const width = (_a = size === null || size === void 0 ? void 0 : size.width) !== null && _a !== void 0 ? _a : 0;
    const left = (_b = size === null || size === void 0 ? void 0 : size.left) !== null && _b !== void 0 ? _b : 0;
    const { inFrame, outFrame } = remotion_1.Internals.Timeline.useTimelineInOutFramePosition();
    const { setInAndOutFrames } = remotion_1.Internals.Timeline.useTimelineSetInOutFramePosition();
    const { get } = (0, get_left_of_timeline_slider_1.useGetXPositionOfItemInTimeline)();
    const [dragging, setDragging] = (0, react_1.useState)({
        dragging: false,
    });
    const { playing, play, pause, seek } = player_1.PlayerInternals.usePlayer();
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const onPointerDown = (0, react_1.useCallback)((e) => {
        if (!videoConfig) {
            return;
        }
        if (e.target === TimelineInOutPointerHandle_1.inPointerHandle.current) {
            if (inFrame === null) {
                throw new Error('expected outframe');
            }
            const inMarker = get(inFrame);
            const outMarker = outFrame === null ? Infinity : get(outFrame - 1);
            setInOutDragging({
                dragging: 'in',
                initialOffset: e.clientX,
                boundaries: [-Infinity, outMarker - inMarker],
            });
            return;
        }
        if (e.target === TimelineInOutPointerHandle_1.outPointerHandle.current) {
            if (outFrame === null) {
                throw new Error('expected outframe');
            }
            const outMarker = get(outFrame);
            const inMarker = inFrame === null ? -Infinity : get(inFrame + 1);
            setInOutDragging({
                dragging: 'out',
                initialOffset: e.clientX,
                boundaries: [inMarker - outMarker, Infinity],
            });
            return;
        }
        const frame = getFrameFromX(e.clientX - left, videoConfig.durationInFrames, width, 'clamp');
        seek(frame);
        setDragging({
            dragging: true,
            wasPlaying: playing,
        });
        pause();
    }, [videoConfig, left, width, seek, playing, pause, outFrame, get, inFrame]);
    const onPointerMoveScrubbing = (0, react_1.useCallback)((e) => {
        if (!videoConfig) {
            return;
        }
        if (!dragging.dragging) {
            return;
        }
        const frame = getFrameFromX(e.clientX - left, videoConfig.durationInFrames, width, 'clamp');
        seek(frame);
    }, [dragging.dragging, seek, left, videoConfig, width]);
    const onPointerMoveInOut = (0, react_1.useCallback)((e) => {
        if (!videoConfig) {
            return;
        }
        if (!inOutDragging.dragging) {
            return;
        }
        const offset = Math.max(inOutDragging.boundaries[0], Math.min(inOutDragging.boundaries[1], e.clientX - inOutDragging.initialOffset));
        if (inOutDragging.dragging === 'in') {
            if (!TimelineInOutPointerHandle_1.inPointerHandle.current) {
                throw new Error('in pointer handle');
            }
            if (!TimelineInOutPointer_1.inMarkerAreaRef.current) {
                throw new Error('expected inMarkerAreaRef');
            }
            if (!inFrame) {
                throw new Error('expected inframes');
            }
            TimelineInOutPointerHandle_1.inPointerHandle.current.style.transform = `translateX(${get(inFrame) + offset}px)`;
            TimelineInOutPointer_1.inMarkerAreaRef.current.style.width =
                String(get(inFrame) + offset) + 'px';
        }
        if (inOutDragging.dragging === 'out') {
            if (!TimelineInOutPointerHandle_1.outPointerHandle.current) {
                throw new Error('in pointer handle');
            }
            if (!TimelineInOutPointer_1.outMarkerAreaRef.current) {
                throw new Error('in outMarkerAreaRef');
            }
            if (!outFrame) {
                throw new Error('expected outframes');
            }
            TimelineInOutPointerHandle_1.outPointerHandle.current.style.transform = `translateX(${get(outFrame) + offset}px)`;
            TimelineInOutPointer_1.outMarkerAreaRef.current.style.left =
                String(get(outFrame) + offset) + 'px';
            TimelineInOutPointer_1.outMarkerAreaRef.current.style.width =
                String(width - get(outFrame) - offset) + 'px';
        }
    }, [get, inFrame, inOutDragging, outFrame, videoConfig, width]);
    const onPointerUpScrubbing = (0, react_1.useCallback)((e) => {
        if (!videoConfig) {
            return;
        }
        if (!dragging.dragging) {
            return;
        }
        setDragging({
            dragging: false,
        });
        const frame = getFrameFromX(e.clientX - left, videoConfig.durationInFrames, width, 'clamp');
        (0, FramePersistor_1.persistCurrentFrame)(frame);
        if (dragging.wasPlaying) {
            play();
        }
    }, [dragging, left, play, videoConfig, width]);
    const onPointerUpInOut = (0, react_1.useCallback)((e) => {
        if (!videoConfig) {
            return;
        }
        if (!inOutDragging.dragging) {
            return;
        }
        setInOutDragging({
            dragging: false,
        });
        const frame = getFrameFromX(e.clientX - left, videoConfig.durationInFrames, width, 'extend');
        if (inOutDragging.dragging === 'in') {
            if (frame < 1) {
                return setInAndOutFrames((prev) => ({
                    ...prev,
                    inFrame: null,
                }));
            }
            const maxFrame = outFrame === null ? Infinity : outFrame - 1;
            setInAndOutFrames((prev) => ({
                ...prev,
                inFrame: Math.min(maxFrame, frame),
            }));
        }
        else {
            if (frame > videoConfig.durationInFrames - 2) {
                return setInAndOutFrames((prev) => ({
                    ...prev,
                    outFrame: null,
                }));
            }
            const minFrame = inFrame === null ? -Infinity : inFrame + 1;
            setInAndOutFrames((prev) => ({
                ...prev,
                outFrame: Math.max(minFrame, frame),
            }));
        }
    }, [
        inFrame,
        inOutDragging.dragging,
        left,
        outFrame,
        setInAndOutFrames,
        videoConfig,
        width,
    ]);
    (0, react_1.useEffect)(() => {
        if (!dragging.dragging) {
            return;
        }
        window.addEventListener('pointermove', onPointerMoveScrubbing);
        window.addEventListener('pointerup', onPointerUpScrubbing);
        return () => {
            window.removeEventListener('pointermove', onPointerMoveScrubbing);
            window.removeEventListener('pointerup', onPointerUpScrubbing);
        };
    }, [dragging.dragging, onPointerMoveScrubbing, onPointerUpScrubbing]);
    (0, react_1.useEffect)(() => {
        if (inOutDragging.dragging === false) {
            return;
        }
        window.addEventListener('pointermove', onPointerMoveInOut);
        window.addEventListener('pointerup', onPointerUpInOut);
        return () => {
            window.removeEventListener('pointermove', onPointerMoveInOut);
            window.removeEventListener('pointerup', onPointerUpInOut);
        };
    }, [inOutDragging.dragging, onPointerMoveInOut, onPointerUpInOut]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: timeline_refs_1.sliderAreaRef, style: container, onPointerDown: onPointerDown, children: [(0, jsx_runtime_1.jsx)("div", { style: inner }), inFrame !== null && ((0, jsx_runtime_1.jsx)(TimelineInOutPointerHandle_1.TimelineInOutPointerHandle, { type: "in", atFrame: inFrame, dragging: inOutDragging.dragging === 'in' })), outFrame !== null && ((0, jsx_runtime_1.jsx)(TimelineInOutPointerHandle_1.TimelineInOutPointerHandle, { type: "out", dragging: inOutDragging.dragging === 'out', atFrame: outFrame }))] }));
};
exports.TimelineDragHandler = TimelineDragHandler;
