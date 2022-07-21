import type { ImageFormat } from 'remotion';
import { Internals } from 'remotion';
export declare const getImageFormat: (codec: ReturnType<typeof Internals.getOutputCodecOrUndefined>) => ImageFormat;
