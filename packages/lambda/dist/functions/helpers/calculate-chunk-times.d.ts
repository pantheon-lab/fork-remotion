import type { _Object } from '@aws-sdk/client-s3';
export declare const calculateChunkTimes: ({ contents, renderId, type, }: {
    contents: _Object[];
    renderId: string;
    type: 'combined-time-for-cost-calculation' | 'absolute-time';
}) => number;
