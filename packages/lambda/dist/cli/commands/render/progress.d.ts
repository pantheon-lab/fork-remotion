import type { CleanupInfo, EncodingProgress, RenderProgress } from '../../../defaults';
import type { ChunkRetry } from '../../../functions/helpers/get-retry-stats';
declare type LambdaInvokeProgress = {
    totalLambdas: number | null;
    lambdasInvoked: number;
    doneIn: number | null;
};
declare type ChunkProgress = {
    totalChunks: number | null;
    chunksInvoked: number;
    doneIn: number | null;
};
export declare type MultiRenderProgress = {
    lambdaInvokeProgress: LambdaInvokeProgress;
    chunkProgress: ChunkProgress;
    encodingProgress: EncodingProgress;
    cleanupInfo: CleanupInfo | null;
};
export declare const makeMultiProgressFromStatus: (status: RenderProgress) => MultiRenderProgress;
declare type DownloadedInfo = {
    totalSize: number | null;
    downloaded: number;
    doneIn: number | null;
};
export declare const makeProgressString: ({ progress, steps, downloadInfo, retriesInfo, }: {
    progress: MultiRenderProgress;
    steps: number;
    downloadInfo: DownloadedInfo | null;
    retriesInfo: ChunkRetry[];
}) => string;
export {};
