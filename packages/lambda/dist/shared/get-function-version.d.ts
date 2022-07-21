import type { AwsRegion } from '../pricing/aws-regions';
import type { LambdaVersions } from './constants';
export declare const getFunctionVersion: ({ functionName, region, }: {
    functionName: string;
    region: AwsRegion;
}) => Promise<LambdaVersions>;
