"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineInOutPointToggle = exports.inOutHandles = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const is_current_selected_still_1 = require("../helpers/is-current-selected-still");
const use_keybinding_1 = require("../helpers/use-keybinding");
const timelineInOutPointer_1 = require("../icons/timelineInOutPointer");
const marks_1 = require("../state/marks");
const ControlButton_1 = require("./ControlButton");
const getTooltipText = (pointType) => `Mark ${pointType}`;
const style = {
    width: 16,
    height: 16,
};
exports.inOutHandles = (0, react_1.createRef)();
const TimelineInOutPointToggle = () => {
    const timelinePosition = remotion_1.Internals.Timeline.useTimelinePosition();
    const { inFrame, outFrame } = remotion_1.Internals.Timeline.useTimelineInOutFramePosition();
    const { setInAndOutFrames } = remotion_1.Internals.Timeline.useTimelineSetInOutFramePosition();
    const { currentComposition } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const isStill = (0, is_current_selected_still_1.useIsStill)();
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const keybindings = (0, use_keybinding_1.useKeybinding)();
    const onInMark = (0, react_1.useCallback)(() => {
        if (!videoConfig) {
            return null;
        }
        setInAndOutFrames((prev) => {
            const biggestPossible = prev.outFrame === null ? Infinity : prev.outFrame - 1;
            const selected = Math.min(timelinePosition, biggestPossible);
            if (selected === 0) {
                return {
                    ...prev,
                    inFrame: null,
                };
            }
            if (prev.inFrame !== null) {
                // Disable if already at this position
                if (prev.inFrame === selected) {
                    return {
                        ...prev,
                        inFrame: null,
                    };
                }
            }
            return {
                ...prev,
                inFrame: selected,
            };
        });
    }, [setInAndOutFrames, timelinePosition, videoConfig]);
    const onOutMark = (0, react_1.useCallback)(() => {
        if (!videoConfig) {
            return null;
        }
        setInAndOutFrames((prev) => {
            const smallestPossible = prev.inFrame === null ? -Infinity : prev.inFrame + 1;
            const selected = Math.max(timelinePosition, smallestPossible);
            if (selected === videoConfig.durationInFrames - 1) {
                return {
                    ...prev,
                    outFrame: null,
                };
            }
            if (prev.outFrame !== null) {
                if (prev.outFrame === selected) {
                    return {
                        ...prev,
                        outFrame: null,
                    };
                }
            }
            return {
                ...prev,
                outFrame: selected,
            };
        });
    }, [setInAndOutFrames, timelinePosition, videoConfig]);
    const onInOutClear = (0, react_1.useCallback)(() => {
        setInAndOutFrames(() => {
            return {
                inFrame: null,
                outFrame: null,
            };
        });
    }, [setInAndOutFrames]);
    (0, react_1.useEffect)(() => {
        const iKey = keybindings.registerKeybinding({
            event: 'keypress',
            key: 'i',
            callback: () => {
                onInMark();
            },
            commandCtrlKey: false,
        });
        const oKey = keybindings.registerKeybinding({
            event: 'keypress',
            key: 'o',
            callback: () => {
                onOutMark();
            },
            commandCtrlKey: false,
        });
        const xKey = keybindings.registerKeybinding({
            event: 'keypress',
            key: 'x',
            callback: () => {
                onInOutClear();
            },
            commandCtrlKey: false,
        });
        return () => {
            oKey.unregister();
            iKey.unregister();
            xKey.unregister();
        };
    }, [keybindings, onInMark, onInOutClear, onOutMark]);
    (0, react_1.useEffect)(() => {
        if (!currentComposition || !videoConfig) {
            return;
        }
        (0, marks_1.persistMarks)(currentComposition, videoConfig.durationInFrames, [
            inFrame,
            outFrame,
        ]);
    }, [currentComposition, inFrame, outFrame, videoConfig]);
    // If duration changes and it goes out of range, we reset
    (0, react_1.useEffect)(() => {
        if (outFrame === null) {
            return;
        }
        if (!videoConfig) {
            return;
        }
        if (outFrame >= videoConfig.durationInFrames - 1) {
            onInOutClear();
        }
    }, [onInOutClear, outFrame, videoConfig]);
    (0, react_1.useEffect)(() => {
        if (inFrame === null) {
            return;
        }
        if (!videoConfig) {
            return;
        }
        if (inFrame >= videoConfig.durationInFrames - 1) {
            onInOutClear();
        }
    }, [onInOutClear, inFrame, videoConfig]);
    (0, react_1.useImperativeHandle)(exports.inOutHandles, () => {
        return {
            clearMarks: onInOutClear,
            inMarkClick: onInMark,
            outMarkClick: onOutMark,
            setMarks: ([newInFrame, newOutFrame]) => {
                setInAndOutFrames({
                    inFrame: newInFrame,
                    outFrame: newOutFrame,
                });
            },
        };
    });
    if (!videoConfig) {
        return null;
    }
    if (isStill) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { title: getTooltipText('In (I)'), "aria-label": getTooltipText('In (I)'), onClick: onInMark, disabled: timelinePosition === 0, children: (0, jsx_runtime_1.jsx)(timelineInOutPointer_1.TimelineInPointer, { color: inFrame === null ? 'white' : 'var(--blue)', style: style }) }), (0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { title: getTooltipText('Out (O)'), "aria-label": getTooltipText('Out (O)'), onClick: onOutMark, disabled: timelinePosition === videoConfig.durationInFrames - 1, children: (0, jsx_runtime_1.jsx)(timelineInOutPointer_1.TimelineOutPointer, { color: outFrame === null ? 'white' : 'var(--blue)', style: style }) })] }));
};
exports.TimelineInOutPointToggle = TimelineInOutPointToggle;
