import type { AwsRegion } from '../pricing/aws-regions';
import type { LambdaPayloads, LambdaRoutines } from './constants';
import type { LambdaReturnValues } from './return-values';
export declare const callLambda: <T extends LambdaRoutines>({ functionName, type, payload, region, }: {
    functionName: string;
    type: T;
    payload: Omit<LambdaPayloads[T], "type">;
    region: AwsRegion;
}) => Promise<LambdaReturnValues[T]>;
