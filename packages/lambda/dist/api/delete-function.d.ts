import type { AwsRegion } from '../pricing/aws-regions';
export declare type DeleteFunctionInput = {
    region: AwsRegion;
    functionName: string;
};
/**
 * @description Deletes a function from AWS Lambda.
 * @link https://remotion.dev/docs/lambda/deletefunction
 * @param options.region The region the function was deployed to.
 * @param options.functionName The name of the function.
 * @returns {Promise<void>} Nothing. Throws if the function failed to delete.
 */
export declare const deleteFunction: ({ region, functionName, }: DeleteFunctionInput) => Promise<void>;
