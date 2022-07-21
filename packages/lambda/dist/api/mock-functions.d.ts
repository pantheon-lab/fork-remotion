import type { AwsRegion } from '../pricing/aws-regions';
import type { LambdaVersions } from '../shared/constants';
import type { FunctionInfo } from './get-function-info';
export declare let mockFunctionsStore: (FunctionInfo & {
    region: AwsRegion;
    version: LambdaVersions;
})[];
export declare const addFunction: (fn: FunctionInfo, region: AwsRegion) => void;
export declare const deleteMockFunction: (name: string, region: string) => void;
export declare const findFunction: (name: string, region: string) => (FunctionInfo & {
    region: AwsRegion;
    version: LambdaVersions;
}) | undefined;
export declare const getAllMockFunctions: (region: string, version: LambdaVersions | null) => (FunctionInfo & {
    region: AwsRegion;
    version: LambdaVersions;
})[];
export declare const cleanFnStore: () => void;
export declare const markFunctionAsIncompatible: (functionName: string) => void;
