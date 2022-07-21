import type { Codec } from './codec';
export declare type Loop = number | null;
export declare const setNumberOfGifLoops: (newLoop: Loop | null) => void;
export declare const getAndValidateNumberOfGifLoops: (codec: Codec) => number | null;
