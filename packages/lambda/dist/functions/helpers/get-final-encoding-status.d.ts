import type { EncodingProgress, RenderMetadata } from '../../shared/constants';
import type { LambdaInvokeStats } from './get-lambdas-invoked-stats';
export declare const getFinalEncodingStatus: ({ encodingStatus: encodingProgress, renderMetadata, outputFileExists, lambdaInvokeStatus, }: {
    encodingStatus: EncodingProgress | null;
    renderMetadata: RenderMetadata | null;
    outputFileExists: boolean;
    lambdaInvokeStatus: LambdaInvokeStats;
}) => EncodingProgress | null;
