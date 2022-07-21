import * as CloudWatchSDK from '@aws-sdk/client-cloudwatch-logs';
import * as IamSdk from '@aws-sdk/client-iam';
import * as LambdaSDK from '@aws-sdk/client-lambda';
import * as S3SDK from '@aws-sdk/client-s3';
import * as ServiceQuotasSDK from '@aws-sdk/client-service-quotas';
import type { AwsRegion } from '../client';
import type { ServiceMapping } from '../shared/aws-clients';
export declare type GetAwsClientInput<T extends keyof ServiceMapping> = {
    region: AwsRegion;
    service: T;
};
declare type SdkMapping = {
    s3: typeof S3SDK;
    cloudwatch: typeof CloudWatchSDK;
    iam: typeof IamSdk;
    lambda: typeof LambdaSDK;
    servicequotas: typeof ServiceQuotasSDK;
};
export declare type GetAwsClientOutput<T extends keyof ServiceMapping> = {
    client: ServiceMapping[T];
    sdk: SdkMapping[T];
};
/**
 * @description Gets the full AWS SDK and an instantiated client for an AWS service
 * @link https://remotion.dev/docs/lambda/getawsclient
 * @param {AwsRegion} params.region The region in which the S3 bucket resides in.
 * @param {string} params.service One of `iam`, `s3`, `cloudwatch`, `iam` or `servicequotas`
 * @returns {GetAwsClientOutput<T>} Returns `client` and `sdk` of a AWS service
 */
export declare const getAwsClient: <T extends keyof ServiceMapping>({ region, service, }: GetAwsClientInput<T>) => GetAwsClientOutput<T>;
export {};
