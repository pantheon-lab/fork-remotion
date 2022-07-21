import type { Codec } from 'remotion';
export declare const combineVideos: ({ files, filelistDir, output, onProgress, numberOfFrames, codec, fps, numberOfGifLoops, }: {
    files: string[];
    filelistDir: string;
    output: string;
    onProgress: (p: number) => void;
    numberOfFrames: number;
    codec: Codec;
    fps: number;
    numberOfGifLoops: number | null;
}) => Promise<void>;
