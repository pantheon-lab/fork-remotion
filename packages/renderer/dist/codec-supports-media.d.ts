import type { Codec } from 'remotion';
declare type MediaSupport = {
    video: boolean;
    audio: boolean;
};
export declare const codecSupportsMedia: (codec: Codec) => MediaSupport;
export {};
