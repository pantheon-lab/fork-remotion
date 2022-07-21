import type { ChunkTimingData, TimingProfile } from './types';
export declare const getTimingEndTimestamps: (chunk: ChunkTimingData) => number[];
export declare const getProfileDuration: (chunks: TimingProfile) => number;
