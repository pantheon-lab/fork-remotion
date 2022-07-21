"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoForRendering = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const absolute_src_1 = require("../absolute-src");
const use_audio_frame_1 = require("../audio/use-audio-frame");
const CompositionManager_1 = require("../CompositionManager");
const delay_render_1 = require("../delay-render");
const is_approximately_the_same_1 = require("../is-approximately-the-same");
const random_1 = require("../random");
const Sequence_1 = require("../Sequence");
const use_current_frame_1 = require("../use-current-frame");
const use_unsafe_video_config_1 = require("../use-unsafe-video-config");
const volume_prop_1 = require("../volume-prop");
const warn_about_non_seekable_media_1 = require("../warn-about-non-seekable-media");
const get_current_time_1 = require("./get-current-time");
const VideoForRenderingForwardFunction = ({ onError, volume: volumeProp, playbackRate, ...props }, ref) => {
    const absoluteFrame = (0, use_current_frame_1.useAbsoluteCurrentFrame)();
    const frame = (0, use_current_frame_1.useCurrentFrame)();
    const volumePropsFrame = (0, use_audio_frame_1.useFrameForVolumeProp)();
    const videoConfig = (0, use_unsafe_video_config_1.useUnsafeVideoConfig)();
    const videoRef = (0, react_1.useRef)(null);
    const sequenceContext = (0, react_1.useContext)(Sequence_1.SequenceContext);
    const mediaStartsAt = (0, use_audio_frame_1.useMediaStartsAt)();
    const { registerAsset, unregisterAsset } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    // Generate a string that's as unique as possible for this asset
    // but at the same time the same on all threads
    const id = (0, react_1.useMemo)(() => {
        var _a;
        return `video-${(0, random_1.random)((_a = props.src) !== null && _a !== void 0 ? _a : '')}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}-muted:${props.muted}`;
    }, [
        props.src,
        props.muted,
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
        if (!props.src) {
            throw new Error('No src passed');
        }
        if (props.muted) {
            return;
        }
        registerAsset({
            type: 'video',
            src: (0, absolute_src_1.getAbsoluteSrc)(props.src),
            id,
            frame: absoluteFrame,
            volume,
            mediaFrame: frame,
            playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
        });
        return () => unregisterAsset(id);
    }, [
        props.muted,
        props.src,
        registerAsset,
        id,
        unregisterAsset,
        volume,
        frame,
        absoluteFrame,
        playbackRate,
    ]);
    (0, react_1.useImperativeHandle)(ref, () => {
        return videoRef.current;
    });
    (0, react_1.useEffect)(() => {
        if (!videoRef.current) {
            return;
        }
        const currentTime = (() => {
            return (0, get_current_time_1.getMediaTime)({
                fps: videoConfig.fps,
                frame,
                src: props.src,
                playbackRate: playbackRate || 1,
                startFrom: -mediaStartsAt,
                mediaType: 'video',
            });
        })();
        const handle = (0, delay_render_1.delayRender)(`Rendering <Video /> with src="${props.src}"`);
        if (process.env.NODE_ENV === 'test') {
            (0, delay_render_1.continueRender)(handle);
            return;
        }
        if ((0, is_approximately_the_same_1.isApproximatelyTheSame)(videoRef.current.currentTime, currentTime)) {
            if (videoRef.current.readyState >= 2) {
                (0, delay_render_1.continueRender)(handle);
                return;
            }
            videoRef.current.addEventListener('loadeddata', () => {
                (0, delay_render_1.continueRender)(handle);
            }, { once: true });
            return;
        }
        videoRef.current.currentTime = currentTime;
        videoRef.current.addEventListener('seeked', () => {
            (0, warn_about_non_seekable_media_1.warnAboutNonSeekableMedia)(videoRef.current, 'exception');
            if (window.navigator.platform.startsWith('Mac')) {
                // Improve me: This is ensures frame perfectness but slows down render.
                // Please see this issue for context: https://github.com/remotion-dev/remotion/issues/200
                // Only affects macOS since it uses VideoToolbox decoding.
                setTimeout(() => {
                    (0, delay_render_1.continueRender)(handle);
                }, 100);
            }
            else {
                (0, delay_render_1.continueRender)(handle);
            }
        }, { once: true });
        videoRef.current.addEventListener('ended', () => {
            (0, delay_render_1.continueRender)(handle);
        }, { once: true });
        videoRef.current.addEventListener('error', () => {
            var _a, _b, _c, _d;
            if ((_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.error) {
                console.error('Error occurred in video', (_b = videoRef.current) === null || _b === void 0 ? void 0 : _b.error);
                throw new Error(`The browser threw an error while playing the video: ${(_d = (_c = videoRef.current) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message}`);
            }
            else {
                throw new Error('The browser threw an error');
            }
        }, { once: true });
        // If video skips to another frame or unmounts, we clear the created handle
        return () => {
            (0, delay_render_1.continueRender)(handle);
        };
    }, [
        volumePropsFrame,
        props.src,
        playbackRate,
        videoConfig.fps,
        frame,
        mediaStartsAt,
    ]);
    return (0, jsx_runtime_1.jsx)("video", { ref: videoRef, ...props, onError: onError });
};
exports.VideoForRendering = (0, react_1.forwardRef)(VideoForRenderingForwardFunction);
