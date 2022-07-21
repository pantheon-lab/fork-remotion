"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audio = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const get_environment_1 = require("../get-environment");
const Sequence_1 = require("../Sequence");
const validate_media_props_1 = require("../validate-media-props");
const validate_start_from_props_1 = require("../validate-start-from-props");
const AudioForDevelopment_1 = require("./AudioForDevelopment");
const AudioForRendering_1 = require("./AudioForRendering");
const shared_audio_tags_1 = require("./shared-audio-tags");
const AudioRefForwardingFunction = (props, ref) => {
    const audioContext = (0, react_1.useContext)(shared_audio_tags_1.SharedAudioContext);
    const { startFrom, endAt, ...otherProps } = props;
    const onError = (0, react_1.useCallback)((e) => {
        console.log(e.currentTarget.error);
        throw new Error(`Could not play audio with src ${otherProps.src}: ${e.currentTarget.error}`);
    }, [otherProps.src]);
    if (typeof startFrom !== 'undefined' || typeof endAt !== 'undefined') {
        (0, validate_start_from_props_1.validateStartFromProps)(startFrom, endAt);
        const startFromFrameNo = startFrom !== null && startFrom !== void 0 ? startFrom : 0;
        const endAtFrameNo = endAt !== null && endAt !== void 0 ? endAt : Infinity;
        return ((0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { layout: "none", from: 0 - startFromFrameNo, showInTimeline: false, durationInFrames: endAtFrameNo, children: (0, jsx_runtime_1.jsx)(exports.Audio, { ...otherProps, ref: ref }) }));
    }
    (0, validate_media_props_1.validateMediaProps)(props, 'Audio');
    if ((0, get_environment_1.getRemotionEnvironment)() === 'rendering') {
        return (0, jsx_runtime_1.jsx)(AudioForRendering_1.AudioForRendering, { ...props, ref: ref, onError: onError });
    }
    return ((0, jsx_runtime_1.jsx)(AudioForDevelopment_1.AudioForDevelopment, { shouldPreMountAudioTags: audioContext !== null && audioContext.numberOfAudioTags > 0, ...props, ref: ref, onError: onError }));
};
exports.Audio = (0, react_1.forwardRef)(AudioRefForwardingFunction);
