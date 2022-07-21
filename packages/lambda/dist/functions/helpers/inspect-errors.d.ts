import type { _Object } from '@aws-sdk/client-s3';
import type { AwsRegion } from '../../pricing/aws-regions';
import type { EnhancedErrorInfo } from './write-lambda-error';
export declare const inspectErrors: ({ contents, bucket, region, renderId, expectedBucketOwner, }: {
    contents: _Object[];
    bucket: string;
    region: AwsRegion;
    renderId: string;
    expectedBucketOwner: string;
}) => Promise<EnhancedErrorInfo[]>;
