import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs';
import { IAMClient } from '@aws-sdk/client-iam';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { S3Client } from '@aws-sdk/client-s3';
import { ServiceQuotasClient } from '@aws-sdk/client-service-quotas';
import type { AwsRegion } from '../pricing/aws-regions';
export declare type ServiceMapping = {
    s3: S3Client;
    cloudwatch: CloudWatchLogsClient;
    iam: IAMClient;
    lambda: LambdaClient;
    servicequotas: ServiceQuotasClient;
};
export declare const getServiceClient: <T extends keyof ServiceMapping>(region: AwsRegion, service: T) => ServiceMapping[T];
export declare const getCloudWatchLogsClient: (region: AwsRegion) => CloudWatchLogsClient;
export declare const getS3Client: (region: AwsRegion) => S3Client;
export declare const getLambdaClient: (region: AwsRegion) => LambdaClient;
export declare const getIamClient: (region: AwsRegion) => IAMClient;
export declare const getServiceQuotasClient: (region: AwsRegion) => ServiceQuotasClient;
