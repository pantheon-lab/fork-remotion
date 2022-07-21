import type { AwsRegion } from '../pricing/aws-regions';
import type { LambdaArchitecture } from '../shared/validate-architecture';
export declare type DeployFunctionInput = {
    createCloudWatchLogGroup: boolean;
    cloudWatchLogRetentionPeriodInDays?: number;
    region: AwsRegion;
    timeoutInSeconds: number;
    memorySizeInMb: number;
    architecture: LambdaArchitecture;
    diskSizeInMb?: number;
    customRoleArn?: string;
};
export declare type DeployFunctionOutput = {
    functionName: string;
    alreadyExisted: boolean;
};
/**
 * @description Creates an AWS Lambda function in your account that will be able to render a video in the cloud.
 * @link https://remotion.dev/docs/lambda/deployfunction
 * @param options.createCloudWatchLogGroup Whether you'd like to create a CloudWatch Log Group to store the logs for this function.
 * @param options.cloudWatchLogRetentionPeriodInDays (optional) The number of days to retain the CloudWatch logs for this function. Default is 14 days.
 * @param options.region The region you want to deploy your function to.
 * @param options.timeoutInSeconds After how many seconds the lambda function should be killed if it does not end itself.
 * @param options.memorySizeInMb How much memory should be allocated to the Lambda function.
 * @param options.architecture The architecture Lambda should run on. One of x86_64 and x64
 * @param options.diskSizeInMb The amount of storage the function should be allocated. The higher, the longer videos you can render. Default 512.
 * @returns {Promise<DeployFunctionOutput>} An object that contains the `functionName` property
 */
export declare const deployFunction: (options: DeployFunctionInput) => Promise<DeployFunctionOutput>;
