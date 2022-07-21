import type { AwsRegion } from '../pricing/aws-regions';
import type { FunctionInfo } from './get-function-info';
export declare type GetFunctionsInput = {
    region: AwsRegion;
    compatibleOnly: boolean;
};
/**
 *
 *
 * @description Lists Remotion Lambda render functions deployed to AWS Lambda.
 * @link https://remotion.dev/docs/lambda/getfunctions
 * @param options.region The region of which the functions should be listed.
 * @param options.compatibleOnly Whether only functions compatible with the installed version of Remotion Lambda should be returned.
 * @returns {Promise<FunctionInfo[]>} An array with the objects containing information about the deployed functions.
 */
export declare const getFunctions: (options: GetFunctionsInput) => Promise<FunctionInfo[]>;
