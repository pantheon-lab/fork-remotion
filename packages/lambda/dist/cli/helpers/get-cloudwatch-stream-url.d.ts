import type { AwsRegion } from '../../client';
import type { LambdaRoutines } from '../../shared/constants';
export declare const getCloudwatchStreamUrl: ({ region, functionName, method, renderId, }: {
    region: AwsRegion;
    functionName: string;
    method: LambdaRoutines;
    renderId: string;
}) => string;
