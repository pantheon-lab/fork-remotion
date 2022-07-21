import type { AwsRegion } from '../../pricing/aws-regions';
export declare type LambdaReadFileProgress = (progress: {
    totalSize: number;
    downloaded: number;
    percent: number;
}) => unknown;
export declare const lambdaDownloadFileWithProgress: ({ bucketName, key, region, expectedBucketOwner, outputPath, onProgress, }: {
    bucketName: string;
    key: string;
    region: AwsRegion;
    expectedBucketOwner: string;
    outputPath: string;
    onProgress: LambdaReadFileProgress;
}) => Promise<{
    sizeInBytes: number;
    to: string;
}>;
