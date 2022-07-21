import type { AwsRegion } from '../pricing/aws-regions';
export declare const createBucket: ({ region, bucketName, }: {
    region: AwsRegion;
    bucketName: string;
}) => Promise<void>;
