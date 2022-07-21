import type { TAsset } from 'remotion';
export declare type RenderMediaOnDownload = (src: string) => ((progress: {
    percent: number | null;
    downloaded: number;
    totalSize: number | null;
}) => void) | undefined | void;
export declare const downloadAsset: ({ src, onDownload, downloadDir, }: {
    src: string;
    onDownload: RenderMediaOnDownload;
    downloadDir: string;
}) => Promise<string>;
export declare const markAllAssetsAsDownloaded: () => void;
export declare const getSanitizedFilenameForAssetUrl: ({ src, downloadDir, contentDisposition, }: {
    src: string;
    downloadDir: string;
    contentDisposition: string | null;
}) => string;
export declare const downloadAndMapAssetsToFileUrl: ({ asset, downloadDir, onDownload, }: {
    asset: TAsset;
    downloadDir: string;
    onDownload: RenderMediaOnDownload;
}) => Promise<TAsset>;
