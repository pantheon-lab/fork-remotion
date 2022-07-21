/// <reference types="node" />
import execa from 'execa';
import { SymbolicateableError } from './error-handling/symbolicateable-error';
import { mimeContentType, mimeLookup } from './mime-types';
export type { RenderMediaOnDownload } from './assets/download-and-map-assets-to-file';
export { BrowserLog } from './browser-log';
export { combineVideos } from './combine-videos';
export { ErrorWithStackFrame } from './error-handling/handle-javascript-exception';
export { FfmpegVersion } from './ffmpeg-flags';
export { getCompositions } from './get-compositions';
export { CancelSignal, makeCancelSignal } from './make-cancel-signal';
export { openBrowser } from './open-browser';
export type { ChromiumOptions } from './open-browser';
export { renderFrames } from './render-frames';
export { renderMedia, RenderMediaOnProgress, RenderMediaOptions, StitchingState, } from './render-media';
export { renderStill } from './render-still';
export { StitcherOptions, stitchFramesToVideo } from './stitch-frames-to-video';
export { SymbolicatedStackFrame } from './symbolicate-stacktrace';
export { OnStartData, RenderFramesOutput } from './types';
export declare const RenderInternals: {
    ensureLocalBrowser: (browser: import("remotion").Browser, preferredBrowserExecutable: import("remotion").BrowserExecutable) => Promise<void>;
    ffmpegHasFeature: ({ ffmpegExecutable, feature, isLambda, }: {
        ffmpegExecutable: string | null;
        feature: "enable-gpl" | "enable-libx265" | "enable-libvpx";
        isLambda: boolean;
    }) => Promise<boolean>;
    getActualConcurrency: (userPreference: number | null) => number;
    getFfmpegVersion: (options: {
        ffmpegExecutable: string | null;
    }) => Promise<import("./ffmpeg-flags").FfmpegVersion>;
    validateFfmpeg: (customFfmpegBinary: string | null) => Promise<void>;
    binaryExists: (name: "ffmpeg" | "brew", localFFmpeg: string | null) => Promise<boolean>;
    getFfmpegBuildInfo: (options: {
        ffmpegExecutable: string | null;
    }) => Promise<string>;
    serveStatic: (path: string | null, options: {
        port: number | null;
        ffmpegExecutable: import("remotion").FfmpegExecutable;
        ffprobeExecutable: import("remotion").FfmpegExecutable;
        downloadDir: string;
        onDownload: import("./assets/download-and-map-assets-to-file").RenderMediaOnDownload;
        onError: (err: Error) => void;
    }) => Promise<{
        port: number;
        close: () => Promise<void>;
    }>;
    validateEvenDimensionsWithCodec: ({ width, height, codec, scale, }: {
        width: number;
        height: number;
        scale: number;
        codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif";
    }) => void;
    normalizeServeUrl: (unnormalized: string) => string;
    spawnFfmpeg: (options: import("./stitch-frames-to-video").StitcherOptions) => Promise<{
        task: Promise<Buffer | null>;
        getLogs: () => string;
    }>;
    getFileExtensionFromCodec: (codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif", type: "chunk" | "final") => "mp3" | "aac" | "wav" | "gif" | "webm" | "mp4" | "mov" | "mkv";
    tmpDir: (str: string) => string;
    deleteDirectory: (directory: string) => Promise<void>;
    isServeUrl: (potentialUrl: string) => boolean;
    ensureOutputDirectory: (outputLocation: string) => void;
    getRealFrameRange: (durationInFrames: number, frameRange: import("remotion").FrameRange | null) => [number, number];
    validatePuppeteerTimeout: (timeoutInMilliseconds: unknown) => void;
    downloadFile: ({ onProgress, url, to: toFn, }: {
        url: string;
        to: (contentDisposition: string | null) => string;
        onProgress: ((progress: {
            percent: number | null;
            downloaded: number;
            totalSize: number | null;
        }) => void) | undefined;
    }) => Promise<{
        sizeInBytes: number;
        to: string;
    }>;
    validateScale: (scale: unknown) => void;
    killAllBrowsers: () => Promise<void>;
    parseStack: (stack: string[]) => import("./parse-browser-error-stack").UnsymbolicatedStackFrame[];
    symbolicateError: (symbolicateableError: SymbolicateableError) => Promise<import("./error-handling/handle-javascript-exception").ErrorWithStackFrame>;
    SymbolicateableError: typeof SymbolicateableError;
    getFramesToRender: (frameRange: [number, number], everyNthFrame: number) => number[];
    getExtensionOfFilename: (filename: string) => string | null;
    getDesiredPort: (desiredPort: number | undefined, from: number, to: number) => Promise<number>;
    isPathInside: (thePath: string, potentialParent: string) => boolean;
    execa: {
        (file: string, arguments?: readonly string[] | undefined, options?: execa.Options<string> | undefined): execa.ExecaChildProcess<string>;
        (file: string, arguments?: readonly string[] | undefined, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
        (file: string, options?: execa.Options<string> | undefined): execa.ExecaChildProcess<string>;
        (file: string, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
        sync(file: string, arguments?: readonly string[] | undefined, options?: execa.SyncOptions<string> | undefined): execa.ExecaSyncReturnValue<string>;
        sync(file: string, arguments?: readonly string[] | undefined, options?: execa.SyncOptions<null> | undefined): execa.ExecaSyncReturnValue<Buffer>;
        sync(file: string, options?: execa.SyncOptions<string> | undefined): execa.ExecaSyncReturnValue<string>;
        sync(file: string, options?: execa.SyncOptions<null> | undefined): execa.ExecaSyncReturnValue<Buffer>;
        command(command: string, options?: execa.Options<string> | undefined): execa.ExecaChildProcess<string>;
        command(command: string, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
        commandSync(command: string, options?: execa.SyncOptions<string> | undefined): execa.ExecaSyncReturnValue<string>;
        commandSync(command: string, options?: execa.SyncOptions<null> | undefined): execa.ExecaSyncReturnValue<Buffer>;
        node(scriptPath: string, arguments?: readonly string[] | undefined, options?: execa.NodeOptions<string> | undefined): execa.ExecaChildProcess<string>;
        node(scriptPath: string, arguments?: readonly string[] | undefined, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
        node(scriptPath: string, options?: execa.Options<string> | undefined): execa.ExecaChildProcess<string>;
        node(scriptPath: string, options?: execa.Options<null> | undefined): execa.ExecaChildProcess<Buffer>;
    };
    registerErrorSymbolicationLock: () => number;
    unlockErrorSymbolicationLock: (id: number) => void;
    canUseParallelEncoding: (codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif") => boolean;
    mimeContentType: typeof mimeContentType;
    mimeLookup: typeof mimeLookup;
    validateConcurrency: (value: unknown, setting: string) => void;
};
