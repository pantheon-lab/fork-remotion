import type { _Object } from '@aws-sdk/client-s3';
export declare type ChunkRetry = {
    chunk: number;
    attempt: number;
    time: number;
};
export declare const getRetryStats: ({ contents, renderId, }: {
    contents: _Object[];
    renderId: string;
}) => ChunkRetry[];
