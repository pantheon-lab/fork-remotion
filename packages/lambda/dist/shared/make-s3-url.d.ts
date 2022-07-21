import type { AwsRegion } from '../pricing/aws-regions';
export declare const makeS3ServeUrl: ({ bucketName, subFolder, region, }: {
    bucketName: string;
    subFolder: string;
    region: AwsRegion;
}) => string;
export declare const getServeUrlHash: (url: string) => string;
