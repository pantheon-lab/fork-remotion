import type { AwsRegion } from '../pricing/aws-regions';
export declare type BucketWithLocation = {
    name: string;
    creationDate: number;
    region: AwsRegion;
};
export declare const getRemotionS3Buckets: (region: AwsRegion) => Promise<{
    remotionBuckets: BucketWithLocation[];
}>;
