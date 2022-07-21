import type { FfmpegExecutable } from 'remotion';
export declare const convertToPcm: ({ ffmpegExecutable, input, outName, }: {
    ffmpegExecutable: FfmpegExecutable;
    input: string;
    outName: string;
}) => Promise<void>;
