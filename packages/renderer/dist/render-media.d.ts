/// <reference types="node" />
import type { BrowserExecutable, Codec, FfmpegExecutable, FrameRange, PixelFormat, ProResProfile, SmallTCompMetadata } from 'remotion';
import type { RenderMediaOnDownload } from './assets/download-and-map-assets-to-file';
import type { BrowserLog } from './browser-log';
import type { Browser as PuppeteerBrowser } from './browser/Browser';
import type { ServeUrlOrWebpackBundle } from './legacy-webpack-config';
import type { CancelSignal } from './make-cancel-signal';
import type { ChromiumOptions } from './open-browser';
import type { OnStartData } from './types';
export declare type StitchingState = 'encoding' | 'muxing';
export declare type RenderMediaOnProgress = (progress: {
    renderedFrames: number;
    encodedFrames: number;
    encodedDoneIn: number | null;
    renderedDoneIn: number | null;
    stitchStage: StitchingState;
}) => void;
export declare type RenderMediaOptions = {
    outputLocation?: string | null;
    codec: Codec;
    composition: SmallTCompMetadata;
    inputProps?: unknown;
    parallelism?: number | null;
    crf?: number | null;
    imageFormat?: 'png' | 'jpeg' | 'none';
    ffmpegExecutable?: FfmpegExecutable;
    ffprobeExecutable?: FfmpegExecutable;
    pixelFormat?: PixelFormat;
    envVariables?: Record<string, string>;
    quality?: number;
    frameRange?: FrameRange | null;
    everyNthFrame?: number;
    numberOfGifLoops?: number | null;
    puppeteerInstance?: PuppeteerBrowser;
    overwrite?: boolean;
    onProgress?: RenderMediaOnProgress;
    onDownload?: RenderMediaOnDownload;
    proResProfile?: ProResProfile;
    dumpBrowserLogs?: boolean;
    onBrowserLog?: ((log: BrowserLog) => void) | undefined;
    onStart?: (data: OnStartData) => void;
    timeoutInMilliseconds?: number;
    chromiumOptions?: ChromiumOptions;
    scale?: number;
    port?: number | null;
    cancelSignal?: CancelSignal;
    browserExecutable?: BrowserExecutable;
} & ServeUrlOrWebpackBundle;
/**
 *
 * @description Render a video from a composition
 * @link https://www.remotion.dev/docs/renderer/render-media
 */
export declare const renderMedia: ({ parallelism, proResProfile, crf, composition, imageFormat, ffmpegExecutable, ffprobeExecutable, inputProps, pixelFormat, codec, envVariables, quality, frameRange, puppeteerInstance, outputLocation, onProgress, overwrite, onDownload, dumpBrowserLogs, onBrowserLog, onStart, timeoutInMilliseconds, chromiumOptions, scale, browserExecutable, port, cancelSignal, ...options }: RenderMediaOptions) => Promise<Buffer | null>;
