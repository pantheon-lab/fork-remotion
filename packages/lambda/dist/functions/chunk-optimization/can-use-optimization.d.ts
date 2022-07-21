import type { OptimizationProfile } from './types';
export declare const canUseOptimization: ({ optimization, framesPerLambda, frameRange, }: {
    optimization: OptimizationProfile | null;
    framesPerLambda: number;
    frameRange: [number, number];
}) => boolean;
