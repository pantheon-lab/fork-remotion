"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayPause = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const is_current_selected_still_1 = require("../helpers/is-current-selected-still");
const use_keybinding_1 = require("../helpers/use-keybinding");
const jump_to_start_1 = require("../icons/jump-to-start");
const pause_1 = require("../icons/pause");
const play_1 = require("../icons/play");
const step_back_1 = require("../icons/step-back");
const step_forward_1 = require("../icons/step-forward");
const ControlButton_1 = require("./ControlButton");
const forwardBackStyle = {
    height: 16,
    color: 'white',
};
const PlayPause = ({ playbackRate, loop }) => {
    var _a;
    const frame = remotion_1.Internals.Timeline.useTimelinePosition();
    const video = remotion_1.Internals.useVideo();
    player_1.PlayerInternals.usePlayback({
        loop,
        playbackRate,
        moveToBeginningWhenEnded: true,
    });
    const { playing, play, pause, pauseAndReturnToPlayStart, frameBack, seek, frameForward, isLastFrame, } = player_1.PlayerInternals.usePlayer();
    const isStill = (0, is_current_selected_still_1.useIsStill)();
    (0, react_1.useEffect)(() => {
        if (isStill) {
            pause();
        }
    }, [isStill, pause]);
    const onSpace = (0, react_1.useCallback)((e) => {
        if (playing) {
            pause();
        }
        else {
            play();
        }
        e.preventDefault();
    }, [pause, play, playing]);
    const onEnter = (0, react_1.useCallback)((e) => {
        if (playing) {
            pauseAndReturnToPlayStart();
        }
        e.preventDefault();
    }, [pauseAndReturnToPlayStart, playing]);
    const videoFps = (_a = video === null || video === void 0 ? void 0 : video.fps) !== null && _a !== void 0 ? _a : null;
    const onArrowLeft = (0, react_1.useCallback)((e) => {
        if (!videoFps) {
            return null;
        }
        e.preventDefault();
        if (e.altKey) {
            seek(0);
        }
        else if (e.shiftKey) {
            frameBack(videoFps);
        }
        else {
            frameBack(1);
        }
    }, [frameBack, seek, videoFps]);
    const onArrowRight = (0, react_1.useCallback)((e) => {
        if (!video) {
            return null;
        }
        if (e.altKey) {
            seek(video.durationInFrames - 1);
        }
        else if (e.shiftKey) {
            frameForward(video.fps);
        }
        else {
            frameForward(1);
        }
        e.preventDefault();
    }, [frameForward, seek, video]);
    const oneFrameBack = (0, react_1.useCallback)(() => {
        frameBack(1);
    }, [frameBack]);
    const oneFrameForward = (0, react_1.useCallback)(() => {
        frameForward(1);
    }, [frameForward]);
    const jumpToStart = (0, react_1.useCallback)(() => {
        seek(0);
    }, [seek]);
    const jumpToEnd = (0, react_1.useCallback)(() => {
        if (!video) {
            return;
        }
        seek(video.durationInFrames - 1);
    }, [seek, video]);
    const keybindings = (0, use_keybinding_1.useKeybinding)();
    (0, react_1.useEffect)(() => {
        const arrowLeft = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'ArrowLeft',
            callback: onArrowLeft,
            commandCtrlKey: false,
        });
        const arrowRight = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'ArrowRight',
            callback: onArrowRight,
            commandCtrlKey: false,
        });
        const space = keybindings.registerKeybinding({
            event: 'keydown',
            key: ' ',
            callback: onSpace,
            commandCtrlKey: false,
        });
        const enter = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'enter',
            callback: onEnter,
            commandCtrlKey: false,
        });
        const a = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'a',
            callback: jumpToStart,
            commandCtrlKey: false,
        });
        const e = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'e',
            callback: jumpToEnd,
            commandCtrlKey: false,
        });
        return () => {
            arrowLeft.unregister();
            arrowRight.unregister();
            space.unregister();
            enter.unregister();
            a.unregister();
            e.unregister();
        };
    }, [
        jumpToEnd,
        jumpToStart,
        keybindings,
        onArrowLeft,
        onArrowRight,
        onEnter,
        onSpace,
    ]);
    if (isStill) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { "aria-label": "Jump to beginning", title: "Jump to beginning", disabled: frame === 0, onClick: jumpToStart, children: (0, jsx_runtime_1.jsx)(jump_to_start_1.JumpToStart, { style: forwardBackStyle }) }), (0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { "aria-label": "Step back one frame", title: "Step back one frame", disabled: frame === 0, onClick: oneFrameBack, children: (0, jsx_runtime_1.jsx)(step_back_1.StepBack, { style: forwardBackStyle }) }), (0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { "aria-label": playing ? 'Pause' : 'Play', title: playing ? 'Pause' : 'Play', disabled: !video, onClick: playing ? pause : play, children: playing ? ((0, jsx_runtime_1.jsx)(pause_1.Pause, { style: {
                        height: 14,
                        width: 14,
                        color: 'white',
                    } })) : ((0, jsx_runtime_1.jsx)(play_1.Play, { style: {
                        height: 14,
                        width: 14,
                        color: 'white',
                    } })) }), (0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { "aria-label": "Step forward one frame", title: "Step forward one frame", disabled: isLastFrame, onClick: oneFrameForward, children: (0, jsx_runtime_1.jsx)(step_forward_1.StepForward, { style: forwardBackStyle }) })] }));
};
exports.PlayPause = PlayPause;
