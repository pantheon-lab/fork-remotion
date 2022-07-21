import type { FfmpegExecutable } from 'remotion';
export declare const createSilentAudio: ({ ffmpegExecutable, numberOfSeconds, outName, }: {
    ffmpegExecutable: FfmpegExecutable;
    numberOfSeconds: number;
    outName: string;
}) => Promise<void>;
