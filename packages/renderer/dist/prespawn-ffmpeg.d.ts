import execa from 'execa';
import type { Codec, FfmpegExecutable, ImageFormat, PixelFormat, ProResProfile } from 'remotion';
import type { CancelSignal } from './make-cancel-signal';
declare type PreSticherOptions = {
    fps: number;
    width: number;
    height: number;
    outputLocation: string;
    pixelFormat: PixelFormat | undefined;
    codec: Codec | undefined;
    crf: number | null | undefined;
    onProgress: (progress: number) => void;
    proResProfile: ProResProfile | undefined;
    verbose: boolean;
    ffmpegExecutable: FfmpegExecutable | undefined;
    imageFormat: ImageFormat;
    signal: CancelSignal;
};
export declare const prespawnFfmpeg: (options: PreSticherOptions) => Promise<{
    task: execa.ExecaChildProcess<string>;
    getLogs: () => string;
}>;
export {};
