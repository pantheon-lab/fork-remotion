/// <reference types="node" />
import type { FfmpegExecutable, OffthreadVideoImageFormat } from 'remotion';
import type { SpecialVCodecForTransparency } from './get-video-info';
export declare type LastFrameOptions = {
    ffmpegExecutable: FfmpegExecutable;
    ffprobeExecutable: FfmpegExecutable;
    offset: number;
    src: string;
    specialVCodecForTransparency: SpecialVCodecForTransparency;
    imageFormat: OffthreadVideoImageFormat;
    needsResize: [number, number] | null;
};
export declare const setLastFrameInCache: (options: LastFrameOptions, data: Buffer) => void;
export declare const getLastFrameFromCache: (options: LastFrameOptions) => Buffer | null;
export declare const clearLastFileCache: () => void;
