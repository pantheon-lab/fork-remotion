"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrentGifIndex = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
function useCurrentGifIndex(delays) {
    const currentFrame = (0, remotion_1.useCurrentFrame)();
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const duration = (0, react_1.useMemo)(() => {
        if (delays.length !== 0) {
            return delays.reduce((sum, delay) => sum + delay, 0);
        }
        return 1;
    }, [delays]);
    const index = (0, react_1.useMemo)(() => {
        if (videoConfig && delays.length !== 0) {
            let currentTime = ((currentFrame / videoConfig.fps) * 1000) % duration;
            for (const [i, delay] of delays.entries()) {
                if (currentTime < delay)
                    return i;
                currentTime -= delay;
            }
        }
        return 0;
    }, [delays, duration, currentFrame, videoConfig]);
    return index;
}
exports.useCurrentGifIndex = useCurrentGifIndex;
