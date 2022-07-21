import type { _Object } from '@aws-sdk/client-s3';
import type { AwsRegion } from '../../pricing/aws-regions';
import type { PostRenderData, RenderMetadata } from '../../shared/constants';
import type { OutputFileMetadata } from './find-output-file-in-bucket';
import type { EnhancedErrorInfo } from './write-lambda-error';
export declare const createPostRenderData: ({ renderId, region, memorySizeInMb, renderMetadata, contents, timeToEncode, errorExplanations, timeToDelete, outputFile, }: {
    renderId: string;
    expectedBucketOwner: string;
    region: AwsRegion;
    memorySizeInMb: number;
    renderMetadata: RenderMetadata;
    contents: _Object[];
    timeToEncode: number;
    timeToDelete: number;
    errorExplanations: EnhancedErrorInfo[];
    outputFile: OutputFileMetadata;
}) => PostRenderData;
