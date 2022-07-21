/// <reference types="node" />
import type { BrowserExecutable, FfmpegExecutable, FrameRange, ImageFormat, SmallTCompMetadata } from 'remotion';
import type { RenderMediaOnDownload } from './assets/download-and-map-assets-to-file';
import type { BrowserLog } from './browser-log';
import type { Browser } from './browser/Browser';
import type { ServeUrlOrWebpackBundle } from './legacy-webpack-config';
import type { CancelSignal } from './make-cancel-signal';
import type { ChromiumOptions } from './open-browser';
import type { OnStartData, RenderFramesOutput } from './types';
declare type ConfigOrComposition = {
    /**
     * @deprecated This field has been renamed to `composition`
     */
    config: SmallTCompMetadata;
} | {
    composition: SmallTCompMetadata;
};
declare type RenderFramesOptions = {
    onStart: (data: OnStartData) => void;
    onFrameUpdate: (framesRendered: number, frameIndex: number) => void;
    outputDir: string | null;
    inputProps: unknown;
    envVariables?: Record<string, string>;
    imageFormat: ImageFormat;
    parallelism?: number | null;
    quality?: number;
    frameRange?: FrameRange | null;
    everyNthFrame?: number;
    dumpBrowserLogs?: boolean;
    puppeteerInstance?: Browser;
    browserExecutable?: BrowserExecutable;
    onBrowserLog?: (log: BrowserLog) => void;
    onFrameBuffer?: (buffer: Buffer, frame: number) => void;
    onDownload?: RenderMediaOnDownload;
    timeoutInMilliseconds?: number;
    chromiumOptions?: ChromiumOptions;
    scale?: number;
    ffmpegExecutable?: FfmpegExecutable;
    ffprobeExecutable?: FfmpegExecutable;
    port?: number | null;
    cancelSignal?: CancelSignal;
} & ConfigOrComposition & ServeUrlOrWebpackBundle;
export declare const renderFrames: (options: RenderFramesOptions) => Promise<RenderFramesOutput>;
export {};
