"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffthreadVideoForRendering = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const absolute_src_1 = require("../absolute-src");
const use_audio_frame_1 = require("../audio/use-audio-frame");
const CompositionManager_1 = require("../CompositionManager");
const default_css_1 = require("../default-css");
const Img_1 = require("../Img");
const internals_1 = require("../internals");
const random_1 = require("../random");
const Sequence_1 = require("../Sequence");
const use_current_frame_1 = require("../use-current-frame");
const use_unsafe_video_config_1 = require("../use-unsafe-video-config");
const volume_prop_1 = require("../volume-prop");
const get_current_time_1 = require("./get-current-time");
const DEFAULT_IMAGE_FORMAT = 'jpeg';
const OffthreadVideoForRendering = ({ onError, volume: volumeProp, playbackRate, src, muted, imageFormat, ...props }) => {
    const absoluteFrame = (0, use_current_frame_1.useAbsoluteCurrentFrame)();
    const frame = (0, use_current_frame_1.useCurrentFrame)();
    const volumePropsFrame = (0, use_audio_frame_1.useFrameForVolumeProp)();
    const videoConfig = (0, use_unsafe_video_config_1.useUnsafeVideoConfig)();
    const sequenceContext = (0, react_1.useContext)(Sequence_1.SequenceContext);
    const mediaStartsAt = (0, use_audio_frame_1.useMediaStartsAt)();
    const { registerAsset, unregisterAsset } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    if (!src) {
        throw new TypeError('No `src` was passed to <OffthreadVideo>.');
    }
    // Generate a string that's as unique as possible for this asset
    // but at the same time the same on all threads
    const id = (0, react_1.useMemo)(() => `video-${(0, random_1.random)(src !== null && src !== void 0 ? src : '')}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}-muted:${muted}`, [
        src,
        muted,
        sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom,
        sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom,
        sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames,
    ]);
    if (!videoConfig) {
        throw new Error('No video config found');
    }
    const volume = (0, volume_prop_1.evaluateVolume)({
        volume: volumeProp,
        frame: volumePropsFrame,
        mediaVolume: 1,
    });
    (0, react_1.useEffect)(() => {
        if (!src) {
            throw new Error('No src passed');
        }
        if (muted) {
            return;
        }
        registerAsset({
            type: 'video',
            src: (0, absolute_src_1.getAbsoluteSrc)(src),
            id,
            frame: absoluteFrame,
            volume,
            mediaFrame: frame,
            playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
        });
        return () => unregisterAsset(id);
    }, [
        muted,
        src,
        registerAsset,
        id,
        unregisterAsset,
        volume,
        frame,
        absoluteFrame,
        playbackRate,
    ]);
    const currentTime = (0, react_1.useMemo)(() => {
        return ((0, get_current_time_1.getExpectedMediaFrameUncorrected)({
            frame,
            playbackRate: playbackRate || 1,
            startFrom: -mediaStartsAt,
        }) / videoConfig.fps);
    }, [frame, mediaStartsAt, playbackRate, videoConfig.fps]);
    const actualSrc = (0, react_1.useMemo)(() => {
        return `http://localhost:${window.remotion_proxyPort}/proxy?src=${encodeURIComponent((0, absolute_src_1.getAbsoluteSrc)(src))}&time=${encodeURIComponent(currentTime)}&imageFormat=${imageFormat !== null && imageFormat !== void 0 ? imageFormat : DEFAULT_IMAGE_FORMAT}`;
    }, [currentTime, imageFormat, src]);
    const onErr = (0, react_1.useCallback)((e) => {
        onError === null || onError === void 0 ? void 0 : onError(e);
    }, [onError]);
    const className = (0, react_1.useMemo)(() => {
        return [default_css_1.OFFTHREAD_VIDEO_CLASS_NAME, props.className]
            .filter(internals_1.Internals.truthy)
            .join(' ');
    }, [props.className]);
    return ((0, jsx_runtime_1.jsx)(Img_1.Img, { src: actualSrc, className: className, ...props, onError: onErr }));
};
exports.OffthreadVideoForRendering = OffthreadVideoForRendering;
