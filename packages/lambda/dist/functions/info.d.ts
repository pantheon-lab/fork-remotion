import type { LambdaPayload, LambdaVersions } from '../shared/constants';
export declare const infoHandler: (lambdaParams: LambdaPayload) => Promise<{
    version: LambdaVersions;
}>;
