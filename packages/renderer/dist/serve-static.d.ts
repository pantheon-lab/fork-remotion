import type { FfmpegExecutable } from 'remotion';
import type { RenderMediaOnDownload } from './assets/download-and-map-assets-to-file';
export declare const serveStatic: (path: string | null, options: {
    port: number | null;
    ffmpegExecutable: FfmpegExecutable;
    ffprobeExecutable: FfmpegExecutable;
    downloadDir: string;
    onDownload: RenderMediaOnDownload;
    onError: (err: Error) => void;
}) => Promise<{
    port: number;
    close: () => Promise<void>;
}>;
