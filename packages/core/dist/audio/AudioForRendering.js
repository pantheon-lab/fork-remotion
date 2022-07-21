"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioForRendering = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const absolute_src_1 = require("../absolute-src");
const CompositionManager_1 = require("../CompositionManager");
const random_1 = require("../random");
const Sequence_1 = require("../Sequence");
const use_current_frame_1 = require("../use-current-frame");
const volume_prop_1 = require("../volume-prop");
const use_audio_frame_1 = require("./use-audio-frame");
const AudioForRenderingRefForwardingFunction = (props, ref) => {
    const audioRef = (0, react_1.useRef)(null);
    const absoluteFrame = (0, use_current_frame_1.useAbsoluteCurrentFrame)();
    const volumePropFrame = (0, use_audio_frame_1.useFrameForVolumeProp)();
    const frame = (0, use_current_frame_1.useCurrentFrame)();
    const sequenceContext = (0, react_1.useContext)(Sequence_1.SequenceContext);
    const { registerAsset, unregisterAsset } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    // Generate a string that's as unique as possible for this asset
    // but at the same time the same on all threads
    const id = (0, react_1.useMemo)(() => {
        var _a;
        return `audio-${(0, random_1.random)((_a = props.src) !== null && _a !== void 0 ? _a : '')}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}-muted:${props.muted}`;
    }, [props.muted, props.src, sequenceContext]);
    const { volume: volumeProp, playbackRate, ...nativeProps } = props;
    const volume = (0, volume_prop_1.evaluateVolume)({
        volume: volumeProp,
        frame: volumePropFrame,
        mediaVolume: 1,
    });
    (0, react_1.useImperativeHandle)(ref, () => {
        return audioRef.current;
    });
    (0, react_1.useEffect)(() => {
        var _a;
        if (!props.src) {
            throw new Error('No src passed');
        }
        if (props.muted) {
            return;
        }
        registerAsset({
            type: 'audio',
            src: (0, absolute_src_1.getAbsoluteSrc)(props.src),
            id,
            frame: absoluteFrame,
            volume,
            mediaFrame: frame,
            playbackRate: (_a = props.playbackRate) !== null && _a !== void 0 ? _a : 1,
        });
        return () => unregisterAsset(id);
    }, [
        props.muted,
        props.src,
        registerAsset,
        absoluteFrame,
        id,
        unregisterAsset,
        volume,
        volumePropFrame,
        frame,
        playbackRate,
        props.playbackRate,
    ]);
    return (0, jsx_runtime_1.jsx)("audio", { ref: audioRef, ...nativeProps });
};
exports.AudioForRendering = (0, react_1.forwardRef)(AudioForRenderingRefForwardingFunction);
