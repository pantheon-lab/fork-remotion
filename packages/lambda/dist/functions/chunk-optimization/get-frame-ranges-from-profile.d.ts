import type { TimingProfile } from './types';
export declare const getFrameRangesFromProfile: (profile: TimingProfile) => [number, number][];
export declare const sortProfileByFrameRanges: (profile: TimingProfile) => import("./types").ChunkTimingData[];
