import type { OptimizationProfile } from './types';
export declare const planFrameRanges: ({ framesPerLambda, optimization, shouldUseOptimization, frameRange, everyNthFrame, }: {
    framesPerLambda: number;
    optimization: OptimizationProfile | null;
    shouldUseOptimization: boolean;
    frameRange: [number, number];
    everyNthFrame: number;
}) => {
    chunks: [number, number][];
    didUseOptimization: boolean;
};
