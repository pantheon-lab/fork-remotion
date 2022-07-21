import type { ChunkTimingData, TimingProfile } from './types';
export declare const getTimingForFrame: (profile: TimingProfile, frame: number) => number;
export declare const getSimulatedTimingForFrameRange: (profile: TimingProfile, frameRange: [number, number]) => ChunkTimingData['timings'];
export declare const simulateFrameRanges: ({ profile, newFrameRanges, }: {
    profile: TimingProfile;
    newFrameRanges: [number, number][];
}) => TimingProfile;
