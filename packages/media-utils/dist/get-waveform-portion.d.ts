import type { AudioData } from './types';
declare type Bar = {
    index: number;
    amplitude: number;
};
export declare const getWaveformPortion: ({ audioData, startTimeInSeconds, durationInSeconds, numberOfSamples, }: {
    audioData: AudioData;
    startTimeInSeconds: number;
    durationInSeconds: number;
    numberOfSamples: number;
}) => Bar[];
export {};
