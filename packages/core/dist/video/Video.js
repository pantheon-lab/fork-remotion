"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const get_environment_1 = require("../get-environment");
const Sequence_1 = require("../Sequence");
const validate_media_props_1 = require("../validate-media-props");
const validate_start_from_props_1 = require("../validate-start-from-props");
const VideoForDevelopment_1 = require("./VideoForDevelopment");
const VideoForRendering_1 = require("./VideoForRendering");
const VideoForwardingFunction = (props, ref) => {
    const { startFrom, endAt, ...otherProps } = props;
    if (typeof ref === 'string') {
        throw new Error('string refs are not supported');
    }
    if (typeof startFrom !== 'undefined' || typeof endAt !== 'undefined') {
        (0, validate_start_from_props_1.validateStartFromProps)(startFrom, endAt);
        const startFromFrameNo = startFrom !== null && startFrom !== void 0 ? startFrom : 0;
        const endAtFrameNo = endAt !== null && endAt !== void 0 ? endAt : Infinity;
        return ((0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { layout: "none", from: 0 - startFromFrameNo, showInTimeline: false, durationInFrames: endAtFrameNo, children: (0, jsx_runtime_1.jsx)(exports.Video, { ...otherProps, ref: ref }) }));
    }
    (0, validate_media_props_1.validateMediaProps)(props, 'Video');
    if ((0, get_environment_1.getRemotionEnvironment)() === 'rendering') {
        return (0, jsx_runtime_1.jsx)(VideoForRendering_1.VideoForRendering, { ...otherProps, ref: ref });
    }
    return ((0, jsx_runtime_1.jsx)(VideoForDevelopment_1.VideoForDevelopment, { onlyWarnForMediaSeekingError: false, ...otherProps, ref: ref }));
};
exports.Video = (0, react_1.forwardRef)(VideoForwardingFunction);
