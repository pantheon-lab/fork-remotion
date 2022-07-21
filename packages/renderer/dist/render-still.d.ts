import type { BrowserExecutable, FfmpegExecutable, SmallTCompMetadata, StillImageFormat } from 'remotion';
import type { RenderMediaOnDownload } from './assets/download-and-map-assets-to-file';
import type { Browser as PuppeteerBrowser } from './browser/Browser';
import type { ServeUrlOrWebpackBundle } from './legacy-webpack-config';
import type { CancelSignal } from './make-cancel-signal';
import type { ChromiumOptions } from './open-browser';
declare type InnerStillOptions = {
    composition: SmallTCompMetadata;
    output: string;
    frame?: number;
    inputProps?: unknown;
    imageFormat?: StillImageFormat;
    quality?: number;
    puppeteerInstance?: PuppeteerBrowser;
    dumpBrowserLogs?: boolean;
    envVariables?: Record<string, string>;
    overwrite?: boolean;
    browserExecutable?: BrowserExecutable;
    timeoutInMilliseconds?: number;
    chromiumOptions?: ChromiumOptions;
    scale?: number;
    onDownload?: RenderMediaOnDownload;
    cancelSignal?: CancelSignal;
    ffmpegExecutable?: FfmpegExecutable;
    ffprobeExecutable?: FfmpegExecutable;
};
declare type RenderStillOptions = InnerStillOptions & ServeUrlOrWebpackBundle & {
    port?: number | null;
};
/**
 *
 * @description Render a still frame from a composition
 * @link https://www.remotion.dev/docs/renderer/render-still
 */
export declare const renderStill: (options: RenderStillOptions) => Promise<void>;
export {};
