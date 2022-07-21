import type { TAsset } from 'remotion';
import type { RenderMediaOnDownload } from './download-and-map-assets-to-file';
export declare const convertAssetsToFileUrls: ({ assets, downloadDir, onDownload, }: {
    assets: TAsset[][];
    downloadDir: string;
    onDownload: RenderMediaOnDownload;
}) => Promise<TAsset[][]>;
