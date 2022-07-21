import type { AwsRegion } from '../../pricing/aws-regions';
import type { RenderProgress } from '../../shared/constants';
export declare const getProgress: ({ bucketName, renderId, expectedBucketOwner, region, memorySizeInMb, timeoutInMiliseconds, }: {
    bucketName: string;
    renderId: string;
    expectedBucketOwner: string;
    region: AwsRegion;
    memorySizeInMb: number;
    timeoutInMiliseconds: number;
}) => Promise<RenderProgress>;
