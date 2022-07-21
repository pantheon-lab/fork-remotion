import type { AwsRegion } from '../pricing/aws-regions';
export declare const bucketExistsInRegion: ({ bucketName, region, expectedBucketOwner, }: {
    bucketName: string;
    region: AwsRegion;
    expectedBucketOwner: string | null;
}) => Promise<boolean>;
