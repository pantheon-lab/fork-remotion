import type { FfmpegExecutable } from 'remotion';
import type { MediaAsset } from './assets/types';
declare type Options = {
    ffmpegExecutable: FfmpegExecutable;
    ffprobeExecutable: FfmpegExecutable;
    outName: string;
    asset: MediaAsset;
    expectedFrames: number;
    fps: number;
};
export declare const preprocessAudioTrack: (options: Options) => Promise<string | null>;
export {};
