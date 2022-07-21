import type { StitchingState } from '@remotion/renderer';
import type { Codec } from 'remotion';
import type { RenderStep } from './step';
export declare const createProgressBar: (quiet: boolean) => {
    update: (str: string) => boolean;
};
export declare const createOverwriteableCliOutput: (quiet: boolean) => {
    update: (up: string) => boolean;
};
export declare const makeBundlingProgress: ({ progress, steps, doneIn, }: {
    progress: number;
    steps: RenderStep[];
    doneIn: number | null;
}) => string;
declare type RenderingProgressInput = {
    frames: number;
    totalFrames: number;
    steps: RenderStep[];
    concurrency: number;
    doneIn: number | null;
};
export declare const makeRenderingProgress: ({ frames, totalFrames, steps, concurrency, doneIn, }: RenderingProgressInput) => string;
declare type StitchingProgressInput = {
    frames: number;
    totalFrames: number;
    steps: RenderStep[];
    doneIn: number | null;
    stage: StitchingState;
    codec: Codec;
};
export declare const makeStitchingProgress: ({ frames, totalFrames, steps, doneIn, stage, codec, }: StitchingProgressInput) => string;
export declare type DownloadProgress = {
    name: string;
    id: number;
    progress: number | null;
    totalBytes: number | null;
    downloaded: number;
};
export declare const makeRenderingAndStitchingProgress: ({ rendering, stitching, downloads, }: {
    rendering: RenderingProgressInput;
    stitching: StitchingProgressInput | null;
    downloads: DownloadProgress[];
}) => string;
export {};
