import type { LambdaVersions } from '../../shared/constants';
export declare type ObjectChunkTimingData = {
    chunk: number;
    frameRange: [number, number];
    startDate: number;
    timings: {
        [key: number]: number;
    };
};
export declare type ChunkTimingData = Omit<ObjectChunkTimingData, 'timings'> & {
    timings: number[];
};
export declare type TimingProfile = ChunkTimingData[];
export declare type OptimizationProfile = {
    ranges: [number, number][];
    frameRange: [number, number];
    oldTiming: number;
    newTiming: number;
    createdFromRenderId: string;
    framesPerLambda: number;
    lambdaVersion: LambdaVersions;
    everyNthFrame: number;
};
