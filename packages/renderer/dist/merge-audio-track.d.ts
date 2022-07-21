import type { FfmpegExecutable } from 'remotion';
declare type Options = {
    ffmpegExecutable: FfmpegExecutable;
    files: string[];
    outName: string;
    numberOfSeconds: number;
};
export declare const mergeAudioTrack: (options: Options) => Promise<void>;
export {};
