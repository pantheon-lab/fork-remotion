"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetXPositionOfItemInTimeline = void 0;
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const timeline_refs_1 = require("../components/Timeline/timeline-refs");
const timeline_layout_1 = require("./timeline-layout");
const useGetXPositionOfItemInTimeline = () => {
    var _a;
    const size = player_1.PlayerInternals.useElementSize(timeline_refs_1.sliderAreaRef, {
        triggerOnWindowResize: false,
        shouldApplyCssTransforms: true,
    });
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const width = (_a = size === null || size === void 0 ? void 0 : size.width) !== null && _a !== void 0 ? _a : 0;
    const get = (0, react_1.useCallback)((frame) => {
        if (!videoConfig) {
            return 0;
        }
        return ((frame / (videoConfig.durationInFrames - 1)) *
            (width - timeline_layout_1.TIMELINE_PADDING * 2) +
            timeline_layout_1.TIMELINE_PADDING);
    }, [videoConfig, width]);
    return (0, react_1.useMemo)(() => {
        return { get, width };
    }, [get, width]);
};
exports.useGetXPositionOfItemInTimeline = useGetXPositionOfItemInTimeline;
