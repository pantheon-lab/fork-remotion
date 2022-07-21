import type { AwsRegion } from '../pricing/aws-regions';
import type { LambdaVersions } from '../shared/constants';
export declare type FunctionInfo = {
    functionName: string;
    timeoutInSeconds: number;
    memorySizeInMb: number;
    version: LambdaVersions | null;
    diskSizeInMb: number;
};
export declare type GetFunctionInfoInput = {
    region: AwsRegion;
    functionName: string;
};
/**
 * @description Given a region and function name, returns information about the function such as version, memory size and timeout.
 * @link https://remotion.dev/docs/lambda/getfunctioninfo
 * @param {AwsRegion} options.region The region in which the function resides in.
 * @param {string} options.functionName The name of the function
 * @return {Promise<FunctionInfo>} Promise resolving to information about the function.
 */
export declare const getFunctionInfo: ({ region, functionName, }: GetFunctionInfoInput) => Promise<FunctionInfo>;
