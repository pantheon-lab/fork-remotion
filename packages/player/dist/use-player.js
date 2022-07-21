"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayer = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const emitter_context_1 = require("./emitter-context");
const usePlayer = () => {
    var _a;
    const [playing, setPlaying, imperativePlaying] = remotion_1.Internals.Timeline.usePlayingState();
    const frame = remotion_1.Internals.Timeline.useTimelinePosition();
    const playStart = (0, react_1.useRef)(0);
    const setFrame = remotion_1.Internals.Timeline.useTimelineSetFrame();
    const setTimelinePosition = remotion_1.Internals.Timeline.useTimelineSetFrame();
    const audioContext = (0, react_1.useContext)(remotion_1.Internals.SharedAudioContext);
    const { audioAndVideoTags } = (0, react_1.useContext)(remotion_1.Internals.Timeline.TimelineContext);
    const frameRef = (0, react_1.useRef)();
    frameRef.current = frame;
    const video = remotion_1.Internals.useVideo();
    const config = remotion_1.Internals.useUnsafeVideoConfig();
    const emitter = (0, react_1.useContext)(emitter_context_1.PlayerEventEmitterContext);
    const lastFrame = ((_a = config === null || config === void 0 ? void 0 : config.durationInFrames) !== null && _a !== void 0 ? _a : 1) - 1;
    const isLastFrame = frame === lastFrame;
    if (!emitter) {
        throw new TypeError('Expected Player event emitter context');
    }
    const seek = (0, react_1.useCallback)((newFrame) => {
        setTimelinePosition(newFrame);
        emitter.dispatchSeek(newFrame);
    }, [emitter, setTimelinePosition]);
    const play = (0, react_1.useCallback)((e) => {
        if (imperativePlaying.current) {
            return;
        }
        if (isLastFrame) {
            seek(0);
        }
        /**
         * Play silent audio tags to warm them up for autoplay
         */
        if (audioContext && audioContext.numberOfAudioTags > 0 && e) {
            audioContext.playAllAudios();
        }
        /**
         * Play audios and videos directly here so they can benefit from
         * being triggered by a click
         */
        audioAndVideoTags.current.forEach((a) => a.play());
        imperativePlaying.current = true;
        setPlaying(true);
        playStart.current = frameRef.current;
        emitter.dispatchPlay();
    }, [
        imperativePlaying,
        isLastFrame,
        audioContext,
        setPlaying,
        emitter,
        seek,
        audioAndVideoTags,
    ]);
    const pause = (0, react_1.useCallback)(() => {
        if (imperativePlaying.current) {
            imperativePlaying.current = false;
            setPlaying(false);
            emitter.dispatchPause();
        }
    }, [emitter, imperativePlaying, setPlaying]);
    const pauseAndReturnToPlayStart = (0, react_1.useCallback)(() => {
        if (imperativePlaying.current) {
            imperativePlaying.current = false;
            setTimelinePosition(playStart.current);
            setPlaying(false);
            emitter.dispatchPause();
        }
    }, [emitter, imperativePlaying, setPlaying, setTimelinePosition]);
    const hasVideo = Boolean(video);
    const frameBack = (0, react_1.useCallback)((frames) => {
        if (!hasVideo) {
            return null;
        }
        if (imperativePlaying.current) {
            return;
        }
        setFrame((f) => {
            return Math.max(0, f - frames);
        });
    }, [hasVideo, imperativePlaying, setFrame]);
    const frameForward = (0, react_1.useCallback)((frames) => {
        if (!hasVideo) {
            return null;
        }
        if (imperativePlaying.current) {
            return;
        }
        setFrame((f) => Math.min(lastFrame, f + frames));
    }, [hasVideo, imperativePlaying, lastFrame, setFrame]);
    const returnValue = (0, react_1.useMemo)(() => {
        return {
            frameBack,
            frameForward,
            isLastFrame,
            emitter,
            playing,
            play,
            pause,
            seek,
            getCurrentFrame: () => frameRef.current,
            isPlaying: () => imperativePlaying.current,
            pauseAndReturnToPlayStart,
        };
    }, [
        emitter,
        frameBack,
        frameForward,
        imperativePlaying,
        isLastFrame,
        pause,
        play,
        playing,
        pauseAndReturnToPlayStart,
        seek,
    ]);
    return returnValue;
};
exports.usePlayer = usePlayer;
