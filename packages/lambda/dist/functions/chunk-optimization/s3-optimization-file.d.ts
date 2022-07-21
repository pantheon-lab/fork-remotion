import type { AwsRegion } from '../../pricing/aws-regions';
import type { OptimizationProfile } from './types';
export declare const writeOptimization: ({ bucketName, optimization, compositionId, siteId, region, expectedBucketOwner, }: {
    bucketName: string;
    optimization: OptimizationProfile;
    compositionId: string;
    siteId: string;
    region: AwsRegion;
    expectedBucketOwner: string;
}) => Promise<void>;
export declare const getOptimization: ({ siteId, compositionId, bucketName, region, expectedBucketOwner, }: {
    bucketName: string;
    siteId: string;
    compositionId: string;
    region: AwsRegion;
    expectedBucketOwner: string;
}) => Promise<OptimizationProfile | null>;
