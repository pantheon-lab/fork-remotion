/// <reference types="node" />
import type { FfmpegExecutable, OffthreadVideoImageFormat } from 'remotion';
import type { LastFrameOptions } from './last-frame-from-video-cache';
export declare const getLastFrameOfVideo: (options: LastFrameOptions) => Promise<Buffer>;
declare type Options = {
    time: number;
    src: string;
    ffmpegExecutable: FfmpegExecutable;
    ffprobeExecutable: FfmpegExecutable;
    imageFormat: OffthreadVideoImageFormat;
};
export declare const extractFrameFromVideo: (options: Options) => Promise<Buffer>;
export {};
