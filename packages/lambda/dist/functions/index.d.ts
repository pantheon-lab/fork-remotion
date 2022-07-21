import type { LambdaPayload } from '../shared/constants';
import { LambdaRoutines } from '../shared/constants';
import type { LambdaReturnValues } from '../shared/return-values';
export declare const handler: <T extends LambdaRoutines>(params: LambdaPayload, context: {
    invokedFunctionArn: string;
    getRemainingTimeInMillis: () => number;
}) => Promise<LambdaReturnValues[T]>;
