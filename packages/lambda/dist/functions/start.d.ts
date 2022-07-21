import type { LambdaPayload } from '../shared/constants';
export declare const startHandler: (params: LambdaPayload) => Promise<{
    bucketName: string;
    renderId: string;
}>;
