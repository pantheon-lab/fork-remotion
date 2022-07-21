"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioForDevelopment = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const use_media_in_timeline_1 = require("../use-media-in-timeline");
const use_media_playback_1 = require("../use-media-playback");
const use_media_tag_volume_1 = require("../use-media-tag-volume");
const use_sync_volume_with_media_tag_1 = require("../use-sync-volume-with-media-tag");
const volume_position_state_1 = require("../volume-position-state");
const shared_audio_tags_1 = require("./shared-audio-tags");
const use_audio_frame_1 = require("./use-audio-frame");
const AudioForDevelopmentForwardRefFunction = (props, ref) => {
    const [initialShouldPreMountAudioElements] = (0, react_1.useState)(props.shouldPreMountAudioTags);
    if (props.shouldPreMountAudioTags !== initialShouldPreMountAudioElements) {
        throw new Error('Cannot change the behavior for pre-mounting audio tags dynamically.');
    }
    const [mediaVolume] = (0, volume_position_state_1.useMediaVolumeState)();
    const [mediaMuted] = (0, volume_position_state_1.useMediaMutedState)();
    const volumePropFrame = (0, use_audio_frame_1.useFrameForVolumeProp)();
    const { volume, muted, playbackRate, shouldPreMountAudioTags, ...nativeProps } = props;
    const propsToPass = (0, react_1.useMemo)(() => {
        return {
            muted: muted || mediaMuted,
            ...nativeProps,
        };
    }, [mediaMuted, muted, nativeProps]);
    const audioRef = (0, shared_audio_tags_1.useSharedAudio)(propsToPass).el;
    const actualVolume = (0, use_media_tag_volume_1.useMediaTagVolume)(audioRef);
    (0, use_sync_volume_with_media_tag_1.useSyncVolumeWithMediaTag)({
        volumePropFrame,
        actualVolume,
        volume,
        mediaVolume,
        mediaRef: audioRef,
    });
    (0, use_media_in_timeline_1.useMediaInTimeline)({
        volume,
        mediaVolume,
        mediaRef: audioRef,
        src: nativeProps.src,
        mediaType: 'audio',
    });
    (0, use_media_playback_1.useMediaPlayback)({
        mediaRef: audioRef,
        src: nativeProps.src,
        mediaType: 'audio',
        playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
        onlyWarnForMediaSeekingError: false,
    });
    (0, react_1.useImperativeHandle)(ref, () => {
        return audioRef.current;
    });
    if (initialShouldPreMountAudioElements) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)("audio", { ref: audioRef, ...propsToPass });
};
exports.AudioForDevelopment = (0, react_1.forwardRef)(AudioForDevelopmentForwardRefFunction);
