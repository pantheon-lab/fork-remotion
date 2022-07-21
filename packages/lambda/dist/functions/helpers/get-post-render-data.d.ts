import type { AwsRegion } from '../../pricing/aws-regions';
import type { PostRenderData } from '../../shared/constants';
export declare const getPostRenderData: ({ bucketName, renderId, region, expectedBucketOwner, }: {
    bucketName: string;
    renderId: string;
    region: AwsRegion;
    expectedBucketOwner: string;
}) => Promise<PostRenderData | null>;
