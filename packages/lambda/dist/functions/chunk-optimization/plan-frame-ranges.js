"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planFrameRanges = void 0;
const renderer_1 = require("@remotion/renderer");
const can_use_optimization_1 = require("./can-use-optimization");
const planFrameRanges = ({ framesPerLambda, optimization, shouldUseOptimization, frameRange, everyNthFrame, }) => {
    const framesToRender = renderer_1.RenderInternals.getFramesToRender(frameRange, everyNthFrame);
    const chunkCount = Math.ceil(framesToRender.length / framesPerLambda);
    if ((0, can_use_optimization_1.canUseOptimization)({
        optimization,
        framesPerLambda,
        frameRange,
    }) &&
        shouldUseOptimization) {
        return {
            chunks: optimization.ranges,
            didUseOptimization: true,
        };
    }
    const firstFrame = frameRange[0];
    return {
        chunks: new Array(chunkCount).fill(1).map((_, i) => {
            const start = i * framesPerLambda * everyNthFrame + firstFrame;
            const end = Math.min(framesToRender[framesToRender.length - 1], (i + 1) * framesPerLambda * everyNthFrame - 1) + firstFrame;
            return [start, end];
        }),
        didUseOptimization: false,
    };
};
exports.planFrameRanges = planFrameRanges;
