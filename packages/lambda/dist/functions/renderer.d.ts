import type { LambdaPayload } from '../shared/constants';
declare type Options = {
    expectedBucketOwner: string;
    isWarm: boolean;
};
export declare const rendererHandler: (params: LambdaPayload, options: Options) => Promise<void>;
export {};
