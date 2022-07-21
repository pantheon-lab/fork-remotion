import type { FfmpegExecutable } from 'remotion';
declare type Result = {
    channels: number;
    duration: number | null;
};
export declare const getAudioChannelsAndDuration: (src: string, ffprobeExecutable: FfmpegExecutable) => Promise<Result>;
export {};
