"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoForDevelopment = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const use_audio_frame_1 = require("../audio/use-audio-frame");
const use_media_in_timeline_1 = require("../use-media-in-timeline");
const use_media_playback_1 = require("../use-media-playback");
const use_media_tag_volume_1 = require("../use-media-tag-volume");
const use_sync_volume_with_media_tag_1 = require("../use-sync-volume-with-media-tag");
const volume_position_state_1 = require("../volume-position-state");
const VideoForDevelopmentRefForwardingFunction = (props, ref) => {
    var _a;
    const videoRef = (0, react_1.useRef)(null);
    const volumePropFrame = (0, use_audio_frame_1.useFrameForVolumeProp)();
    const { volume, muted, playbackRate, onlyWarnForMediaSeekingError, ...nativeProps } = props;
    const actualVolume = (0, use_media_tag_volume_1.useMediaTagVolume)(videoRef);
    const [mediaVolume] = (0, volume_position_state_1.useMediaVolumeState)();
    const [mediaMuted] = (0, volume_position_state_1.useMediaMutedState)();
    (0, use_media_in_timeline_1.useMediaInTimeline)({
        mediaRef: videoRef,
        volume,
        mediaVolume,
        mediaType: 'video',
        src: nativeProps.src,
    });
    (0, use_sync_volume_with_media_tag_1.useSyncVolumeWithMediaTag)({
        volumePropFrame,
        actualVolume,
        volume,
        mediaVolume,
        mediaRef: videoRef,
    });
    (0, use_media_playback_1.useMediaPlayback)({
        mediaRef: videoRef,
        src: nativeProps.src,
        mediaType: 'video',
        playbackRate: (_a = props.playbackRate) !== null && _a !== void 0 ? _a : 1,
        onlyWarnForMediaSeekingError,
    });
    (0, react_1.useImperativeHandle)(ref, () => {
        return videoRef.current;
    });
    return ((0, jsx_runtime_1.jsx)("video", { ref: videoRef, muted: muted || mediaMuted, playsInline: true, ...nativeProps }));
};
exports.VideoForDevelopment = (0, react_1.forwardRef)(VideoForDevelopmentRefForwardingFunction);
