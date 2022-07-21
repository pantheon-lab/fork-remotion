"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayback = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const calculate_next_frame_1 = require("./calculate-next-frame");
const use_player_1 = require("./use-player");
const usePlayback = ({ loop, playbackRate, moveToBeginningWhenEnded, }) => {
    const frame = remotion_1.Internals.Timeline.useTimelinePosition();
    const config = remotion_1.Internals.useUnsafeVideoConfig();
    const { playing, pause, emitter } = (0, use_player_1.usePlayer)();
    const setFrame = remotion_1.Internals.Timeline.useTimelineSetFrame();
    const { inFrame, outFrame } = remotion_1.Internals.Timeline.useTimelineInOutFramePosition();
    const frameRef = (0, react_1.useRef)(frame);
    frameRef.current = frame;
    const lastTimeUpdateEvent = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!config) {
            return;
        }
        if (!playing) {
            return;
        }
        let hasBeenStopped = false;
        let reqAnimFrameCall = null;
        const startedTime = performance.now();
        let framesAdvanced = 0;
        const stop = () => {
            hasBeenStopped = true;
            if (reqAnimFrameCall !== null) {
                cancelAnimationFrame(reqAnimFrameCall);
            }
        };
        const callback = () => {
            const time = performance.now() - startedTime;
            const actualLastFrame = outFrame !== null && outFrame !== void 0 ? outFrame : config.durationInFrames - 1;
            const actualFirstFrame = inFrame !== null && inFrame !== void 0 ? inFrame : 0;
            const { nextFrame, framesToAdvance, hasEnded } = (0, calculate_next_frame_1.calculateNextFrame)({
                time,
                currentFrame: frameRef.current,
                playbackSpeed: playbackRate,
                fps: config.fps,
                actualFirstFrame,
                actualLastFrame,
                framesAdvanced,
                shouldLoop: loop,
            });
            framesAdvanced += framesToAdvance;
            if (nextFrame !== frameRef.current &&
                (!hasEnded || moveToBeginningWhenEnded)) {
                setFrame(nextFrame);
            }
            if (hasEnded) {
                stop();
                pause();
                emitter.dispatchEnded();
                return;
            }
            if (!hasBeenStopped) {
                reqAnimFrameCall = requestAnimationFrame(callback);
            }
        };
        reqAnimFrameCall = requestAnimationFrame(callback);
        return () => {
            stop();
        };
    }, [
        config,
        loop,
        pause,
        playing,
        setFrame,
        emitter,
        playbackRate,
        inFrame,
        outFrame,
        moveToBeginningWhenEnded,
    ]);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            if (lastTimeUpdateEvent.current === frameRef.current) {
                return;
            }
            emitter.dispatchTimeUpdate({ frame: frameRef.current });
            lastTimeUpdateEvent.current = frameRef.current;
        }, 250);
        return () => clearInterval(interval);
    }, [emitter]);
};
exports.usePlayback = usePlayback;
