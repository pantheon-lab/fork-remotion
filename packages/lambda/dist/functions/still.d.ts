import type { LambdaPayload } from '../shared/constants';
declare type Options = {
    expectedBucketOwner: string;
};
declare const innerStillHandler: (lambdaParams: LambdaPayload, renderId: string, options: Options) => Promise<{
    output: string;
    size: number;
    bucketName: string;
    estimatedPrice: import("../shared/constants").CostsInfo;
    renderId: string;
}>;
export declare const stillHandler: (params: LambdaPayload, options: Options) => Promise<ReturnType<typeof innerStillHandler>>;
export {};
