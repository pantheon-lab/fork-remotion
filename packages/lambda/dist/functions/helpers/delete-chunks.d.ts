import type { _Object } from '@aws-sdk/client-s3';
import type { AwsRegion } from '../../pricing/aws-regions';
import type { CleanupJob } from './get-files-to-delete';
export declare const cleanupFiles: ({ bucket, region, contents, jobs, }: {
    bucket: string;
    region: AwsRegion;
    contents: _Object[];
    jobs: CleanupJob[];
}) => Promise<number>;
