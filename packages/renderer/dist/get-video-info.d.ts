import type { FfmpegExecutable } from 'remotion';
declare type Result = {
    specialVcodec: SpecialVCodecForTransparency;
    needsResize: [number, number] | null;
};
export declare type SpecialVCodecForTransparency = 'vp9' | 'vp8' | 'none';
export declare const getVideoInfo: (src: string, ffprobeExecutable: FfmpegExecutable) => Promise<Result>;
export {};
