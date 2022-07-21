"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFrameForVolumeProp = exports.useMediaStartsAt = void 0;
const react_1 = require("react");
const Sequence_1 = require("../Sequence");
const use_current_frame_1 = require("../use-current-frame");
const useMediaStartsAt = () => {
    var _a;
    const parentSequence = (0, react_1.useContext)(Sequence_1.SequenceContext);
    const startsAt = Math.min(0, (_a = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.relativeFrom) !== null && _a !== void 0 ? _a : 0);
    return startsAt;
};
exports.useMediaStartsAt = useMediaStartsAt;
/**
 * When passing a function as the prop for `volume`,
 * we calculate the way more intuitive value for currentFrame
 */
const useFrameForVolumeProp = () => {
    const frame = (0, use_current_frame_1.useCurrentFrame)();
    const startsAt = (0, exports.useMediaStartsAt)();
    return frame + startsAt;
};
exports.useFrameForVolumeProp = useFrameForVolumeProp;