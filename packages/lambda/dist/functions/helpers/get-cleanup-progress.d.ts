import type { _Object } from '@aws-sdk/client-s3';
import type { CleanupInfo } from '../../shared/constants';
export declare const getCleanupProgress: ({ contents, output, chunkCount, renderId, }: {
    contents: _Object[];
    output: string | null;
    chunkCount: number;
    renderId: string;
}) => null | CleanupInfo;
