import type { AwsRegion } from '../../pricing/aws-regions';
import type { PostRenderData } from '../../shared/constants';
export declare const writePostRenderData: ({ bucketName, renderId, postRenderData, expectedBucketOwner, region, }: {
    bucketName: string;
    renderId: string;
    postRenderData: PostRenderData;
    expectedBucketOwner: string;
    region: AwsRegion;
}) => Promise<void>;
