import type { LambdaPayload, RenderProgress } from '../shared/constants';
declare type Options = {
    expectedBucketOwner: string;
    timeoutInMiliseconds: number;
};
export declare const progressHandler: (lambdaParams: LambdaPayload, options: Options) => Promise<RenderProgress>;
export {};
