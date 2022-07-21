/// <reference types="node" />
import type { Codec, FfmpegExecutable, ImageFormat, PixelFormat, ProResProfile, RenderAssetInfo } from 'remotion';
import type { RenderMediaOnDownload } from './assets/download-and-map-assets-to-file';
import type { CancelSignal } from './make-cancel-signal';
export declare type StitcherOptions = {
    fps: number;
    width: number;
    height: number;
    outputLocation?: string | null;
    force: boolean;
    assetsInfo: RenderAssetInfo;
    pixelFormat?: PixelFormat;
    numberOfGifLoops?: number | null;
    codec?: Codec;
    crf?: number | null;
    onProgress?: (progress: number) => void;
    onDownload?: RenderMediaOnDownload;
    proResProfile?: ProResProfile;
    verbose?: boolean;
    ffmpegExecutable?: FfmpegExecutable;
    ffprobeExecutable?: FfmpegExecutable;
    dir?: string;
    cancelSignal?: CancelSignal;
    internalOptions?: {
        preEncodedFileLocation: string | null;
        imageFormat: ImageFormat;
    };
};
declare type ReturnType = {
    task: Promise<Buffer | null>;
    getLogs: () => string;
};
export declare const spawnFfmpeg: (options: StitcherOptions) => Promise<ReturnType>;
export declare const stitchFramesToVideo: (options: StitcherOptions) => Promise<Buffer | null>;
export {};
