import type { ChromiumOptions, openBrowser } from '@remotion/renderer';
import type { FfmpegExecutable, TCompMetadata } from 'remotion';
import type { Await } from '../../shared/await';
declare type ValidateCompositionOptions = {
    serveUrl: string;
    composition: string;
    browserInstance: Await<ReturnType<typeof openBrowser>>;
    inputProps: unknown;
    envVariables: Record<string, string> | undefined;
    ffmpegExecutable: FfmpegExecutable;
    ffprobeExecutable: FfmpegExecutable;
    timeoutInMilliseconds: number;
    chromiumOptions: ChromiumOptions;
    port: number | null;
};
export declare const validateComposition: ({ serveUrl, composition, browserInstance, inputProps, envVariables, timeoutInMilliseconds, ffmpegExecutable, ffprobeExecutable, chromiumOptions, port, }: ValidateCompositionOptions) => Promise<TCompMetadata>;
export {};
