import type { AwsRegion } from '../pricing/aws-regions';
export declare type GetOrCreateBucketInput = {
    region: AwsRegion;
    onBucketEnsured?: () => void;
};
export declare type GetOrCreateBucketOutput = {
    bucketName: string;
};
/**
 * @description Creates a bucket for Remotion Lambda in your S3 account. If one already exists, it will get returned instead.
 * @link https://remotion.dev/docs/lambda/getorcreatebucket
 * @param options.region The region in which you want your S3 bucket to reside in.
 * @returns {Promise<GetOrCreateBucketOutput>} An object containing the `bucketName`.
 */
export declare const getOrCreateBucket: (options: GetOrCreateBucketInput) => Promise<GetOrCreateBucketOutput>;
