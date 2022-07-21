import type { Codec } from './codec';
declare type Crf = number | undefined;
export declare const setCrf: (newCrf: Crf) => void;
export declare const getCrfOrUndefined: () => Crf;
export declare const getDefaultCrfForCodec: (codec: Codec) => number;
export declare const getValidCrfRanges: (codec: Codec) => [number, number];
export declare const validateSelectedCrfAndCodecCombination: (crf: unknown, codec: Codec) => void;
export declare const getActualCrf: (codec: Codec) => number;
export {};
