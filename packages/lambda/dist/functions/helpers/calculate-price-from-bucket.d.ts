import type { _Object } from '@aws-sdk/client-s3';
import type { RenderMetadata } from '../../shared/constants';
import type { LambdaArchitecture } from '../../shared/validate-architecture';
import type { OutputFileMetadata } from './find-output-file-in-bucket';
export declare const estimatePriceFromBucket: ({ contents, renderMetadata, memorySizeInMb, outputFileMetadata, architecture, diskSizeInMb, lambdasInvoked, }: {
    contents: _Object[];
    renderMetadata: RenderMetadata | null;
    memorySizeInMb: number;
    outputFileMetadata: OutputFileMetadata | null;
    architecture: LambdaArchitecture;
    diskSizeInMb: number;
    lambdasInvoked: number;
}) => number | null;
