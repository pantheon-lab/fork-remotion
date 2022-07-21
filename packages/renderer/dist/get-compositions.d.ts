import type { BrowserExecutable, FfmpegExecutable, TCompMetadata } from 'remotion';
import type { BrowserLog } from './browser-log';
import type { Browser } from './browser/Browser';
import type { ChromiumOptions } from './open-browser';
declare type GetCompositionsConfig = {
    inputProps?: object | null;
    envVariables?: Record<string, string>;
    puppeteerInstance?: Browser;
    onBrowserLog?: (log: BrowserLog) => void;
    browserExecutable?: BrowserExecutable;
    timeoutInMilliseconds?: number;
    chromiumOptions?: ChromiumOptions;
    ffmpegExecutable?: FfmpegExecutable;
    ffprobeExecutable?: FfmpegExecutable;
    port?: number | null;
};
export declare const getCompositions: (serveUrlOrWebpackUrl: string, config?: GetCompositionsConfig) => Promise<TCompMetadata[]>;
export {};
