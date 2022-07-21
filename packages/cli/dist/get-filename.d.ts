import type { Codec } from 'remotion';
export declare const getOutputFilename: ({ codec, imageSequence, type, }: {
    codec: Codec;
    imageSequence: boolean;
    type: 'still' | 'series';
}) => string;
