import type { AwsRegion } from '../pricing/aws-regions';
export declare const enableS3Website: ({ region, bucketName, }: {
    region: AwsRegion;
    bucketName: string;
}) => Promise<void>;
