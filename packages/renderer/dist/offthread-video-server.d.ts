import type { RequestListener } from 'http';
import type { FfmpegExecutable, OffthreadVideoImageFormat } from 'remotion';
import type { RenderMediaOnDownload } from './assets/download-and-map-assets-to-file';
export declare const extractUrlAndSourceFromUrl: (url: string) => {
    src: string;
    time: number;
    imageFormat: OffthreadVideoImageFormat;
};
export declare const startOffthreadVideoServer: ({ ffmpegExecutable, ffprobeExecutable, downloadDir, onDownload, onError, }: {
    ffmpegExecutable: FfmpegExecutable;
    ffprobeExecutable: FfmpegExecutable;
    downloadDir: string;
    onDownload: RenderMediaOnDownload;
    onError: (err: Error) => void;
}) => RequestListener;
