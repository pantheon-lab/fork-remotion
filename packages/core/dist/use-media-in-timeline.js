"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediaInTimeline = void 0;
const react_1 = require("react");
const use_audio_frame_1 = require("./audio/use-audio-frame");
const CompositionManager_1 = require("./CompositionManager");
const get_asset_file_name_1 = require("./get-asset-file-name");
const nonce_1 = require("./nonce");
const play_and_handle_not_allowed_error_1 = require("./play-and-handle-not-allowed-error");
const Sequence_1 = require("./Sequence");
const timeline_position_state_1 = require("./timeline-position-state");
const use_video_config_1 = require("./use-video-config");
const volume_prop_1 = require("./volume-prop");
const didWarn = {};
const warnOnce = (message) => {
    if (didWarn[message]) {
        return;
    }
    console.warn(message);
    didWarn[message] = true;
};
const useMediaInTimeline = ({ volume, mediaVolume, mediaRef, src, mediaType, }) => {
    const videoConfig = (0, use_video_config_1.useVideoConfig)();
    const { rootId, audioAndVideoTags } = (0, react_1.useContext)(timeline_position_state_1.TimelineContext);
    const parentSequence = (0, react_1.useContext)(Sequence_1.SequenceContext);
    const actualFrom = parentSequence
        ? parentSequence.relativeFrom + parentSequence.cumulatedFrom
        : 0;
    const [playing] = (0, timeline_position_state_1.usePlayingState)();
    const startsAt = (0, use_audio_frame_1.useMediaStartsAt)();
    const { registerSequence, unregisterSequence } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    const [id] = (0, react_1.useState)(() => String(Math.random()));
    const [initialVolume] = (0, react_1.useState)(() => volume);
    const nonce = (0, nonce_1.useNonce)();
    const duration = (() => {
        return parentSequence
            ? Math.min(parentSequence.durationInFrames, videoConfig.durationInFrames)
            : videoConfig.durationInFrames;
    })();
    const doesVolumeChange = typeof volume === 'function';
    const volumes = (0, react_1.useMemo)(() => {
        if (typeof volume === 'number') {
            return volume;
        }
        return new Array(Math.max(0, duration + startsAt))
            .fill(true)
            .map((_, i) => {
            return (0, volume_prop_1.evaluateVolume)({
                frame: i + startsAt,
                volume,
                mediaVolume,
            });
        })
            .join(',');
    }, [duration, startsAt, volume, mediaVolume]);
    (0, react_1.useEffect)(() => {
        if (typeof volume === 'number' && volume !== initialVolume) {
            warnOnce(`Remotion: The ${mediaType} with src ${src} has changed it's volume. Prefer the callback syntax for setting volume to get better timeline display: https://www.remotion.dev/docs/using-audio/#controlling-volume`);
        }
    }, [initialVolume, mediaType, src, volume]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (!mediaRef.current) {
            return;
        }
        if (!src) {
            throw new Error('No src passed');
        }
        registerSequence({
            type: mediaType,
            src,
            id,
            duration,
            from: 0,
            parent: (_a = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.id) !== null && _a !== void 0 ? _a : null,
            displayName: (0, get_asset_file_name_1.getAssetDisplayName)(src),
            rootId,
            volume: volumes,
            showInTimeline: true,
            nonce,
            startMediaFrom: 0 - startsAt,
            doesVolumeChange,
            showLoopTimesInTimeline: undefined,
        });
        return () => {
            unregisterSequence(id);
        };
    }, [
        actualFrom,
        duration,
        id,
        parentSequence,
        src,
        registerSequence,
        rootId,
        unregisterSequence,
        videoConfig,
        volumes,
        doesVolumeChange,
        nonce,
        mediaRef,
        mediaType,
        startsAt,
    ]);
    (0, react_1.useEffect)(() => {
        const tag = {
            id,
            play: () => {
                if (!playing) {
                    // Don't play if for example in a <Freeze> state.
                    return;
                }
                return (0, play_and_handle_not_allowed_error_1.playAndHandleNotAllowedError)(mediaRef, mediaType);
            },
        };
        audioAndVideoTags.current.push(tag);
        return () => {
            audioAndVideoTags.current = audioAndVideoTags.current.filter((a) => a.id !== id);
        };
    }, [audioAndVideoTags, id, mediaRef, mediaType, playing]);
};
exports.useMediaInTimeline = useMediaInTimeline;
