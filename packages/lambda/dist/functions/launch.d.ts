import type { LambdaPayload } from '../shared/constants';
declare type Options = {
    expectedBucketOwner: string;
};
export declare const launchHandler: (params: LambdaPayload, options: Options) => Promise<void>;
export {};
