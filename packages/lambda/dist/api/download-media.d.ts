import type { LambdaReadFileProgress } from '../functions/helpers/read-with-progress';
import type { AwsRegion } from '../pricing/aws-regions';
export declare type DownloadMediaInput = {
    region: AwsRegion;
    bucketName: string;
    renderId: string;
    outPath: string;
    onProgress?: LambdaReadFileProgress;
};
export declare type DownloadMediaOutput = {
    outputPath: string;
    sizeInBytes: number;
};
export declare const downloadMedia: (input: DownloadMediaInput) => Promise<DownloadMediaOutput>;
/**
 * @deprecated Renamed to downloadMedia()
 */
export declare const downloadVideo: (input: DownloadMediaInput) => Promise<DownloadMediaOutput>;
