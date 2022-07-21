import type { FfmpegExecutable } from 'remotion';
import type { RenderMediaOnDownload } from './assets/download-and-map-assets-to-file';
export declare const prepareServer: ({ downloadDir, ffmpegExecutable, ffprobeExecutable, onDownload, onError, webpackConfigOrServeUrl, port, }: {
    webpackConfigOrServeUrl: string;
    downloadDir: string;
    onDownload: RenderMediaOnDownload;
    onError: (err: Error) => void;
    ffmpegExecutable: FfmpegExecutable;
    ffprobeExecutable: FfmpegExecutable;
    port: number | null;
}) => Promise<{
    serveUrl: string;
    closeServer: () => Promise<unknown>;
    offthreadPort: number;
}>;
