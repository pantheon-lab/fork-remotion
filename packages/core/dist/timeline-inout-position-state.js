"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimelineSetInOutFramePosition = exports.useTimelineInOutFramePosition = exports.SetTimelineInOutContext = exports.TimelineInOutContext = void 0;
const react_1 = require("react");
exports.TimelineInOutContext = (0, react_1.createContext)({
    inFrame: null,
    outFrame: null,
});
exports.SetTimelineInOutContext = (0, react_1.createContext)({
    setInAndOutFrames: () => {
        throw new Error('default');
    },
});
const useTimelineInOutFramePosition = () => {
    const state = (0, react_1.useContext)(exports.TimelineInOutContext);
    return state;
};
exports.useTimelineInOutFramePosition = useTimelineInOutFramePosition;
const useTimelineSetInOutFramePosition = () => {
    const { setInAndOutFrames } = (0, react_1.useContext)(exports.SetTimelineInOutContext);
    return { setInAndOutFrames };
};
exports.useTimelineSetInOutFramePosition = useTimelineSetInOutFramePosition;
