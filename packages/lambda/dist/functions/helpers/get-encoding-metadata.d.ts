import type { EncodingProgress } from '../../defaults';
import type { AwsRegion } from '../../pricing/aws-regions';
export declare const getEncodingMetadata: ({ exists, bucketName, renderId, region, expectedBucketOwner, }: {
    exists: boolean;
    bucketName: string;
    renderId: string;
    region: AwsRegion;
    expectedBucketOwner: string;
}) => Promise<EncodingProgress | null>;
