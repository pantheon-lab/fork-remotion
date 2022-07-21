import type { _Object } from '@aws-sdk/client-s3';
export declare type LambdaInvokeStats = {
    timeToInvokeLambdas: number | null;
    allLambdasInvoked: boolean;
    lambdasInvoked: number;
};
export declare const getLambdasInvokedStats: (contents: _Object[], renderId: string, estimatedRenderLambdaInvokations: number | null, startDate: number | null) => LambdaInvokeStats;
