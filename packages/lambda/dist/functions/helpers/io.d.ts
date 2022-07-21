import type { _Object } from '@aws-sdk/client-s3';
import type { ReadStream } from 'fs';
import type { Readable } from 'stream';
import type { AwsRegion } from '../../pricing/aws-regions';
import type { Privacy } from '../../shared/constants';
import type { DownloadBehavior } from '../../shared/content-disposition-header';
export declare type LambdaLSInput = {
    bucketName: string;
    prefix: string;
    region: AwsRegion;
    expectedBucketOwner: string | null;
    continuationToken?: string;
};
export declare type LambdaLsReturnType = Promise<_Object[]>;
export declare const lambdaLs: ({ bucketName, prefix, region, expectedBucketOwner, continuationToken, }: LambdaLSInput) => LambdaLsReturnType;
export declare const lambdaWriteFile: ({ bucketName, key, body, region, privacy, expectedBucketOwner, }: {
    bucketName: string;
    key: string;
    body: ReadStream | string;
    region: AwsRegion;
    privacy: Privacy;
    expectedBucketOwner: string | null;
    downloadBehavior: DownloadBehavior | null;
}) => Promise<void>;
export declare const lambdaReadFile: ({ bucketName, key, region, expectedBucketOwner, }: {
    bucketName: string;
    key: string;
    region: AwsRegion;
    expectedBucketOwner: string;
}) => Promise<Readable>;
