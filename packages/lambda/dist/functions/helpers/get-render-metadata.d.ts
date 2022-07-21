import type { AwsRegion } from '../../pricing/aws-regions';
import type { RenderMetadata } from '../../shared/constants';
export declare const getRenderMetadata: ({ bucketName, renderId, region, expectedBucketOwner, }: {
    bucketName: string;
    renderId: string;
    region: AwsRegion;
    expectedBucketOwner: string;
}) => Promise<RenderMetadata>;
