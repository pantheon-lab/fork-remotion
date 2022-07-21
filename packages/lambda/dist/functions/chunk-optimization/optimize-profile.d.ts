import type { TimingProfile } from './types';
export declare const assignFrameToOther: ({ frameRanges, fromChunk, toChunk, framesToShift, }: {
    frameRanges: [number, number][];
    fromChunk: number;
    toChunk: number;
    framesToShift: number;
}) => [number, number][];
export declare const optimizeProfile: (_profile: TimingProfile) => TimingProfile;
export declare const optimizeProfileRecursively: (profile: TimingProfile, amount: number) => TimingProfile;
