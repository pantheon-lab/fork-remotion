import type { AwsRegion } from '../pricing/aws-regions';
import type { LambdaArchitecture } from '../shared/validate-architecture';
export declare const createFunction: ({ createCloudWatchLogGroup, region, zipFile, functionName, accountId, memorySizeInMb, timeoutInSeconds, alreadyCreated, retentionInDays, architecture, ephemerealStorageInMb, customRoleArn, }: {
    createCloudWatchLogGroup: boolean;
    region: AwsRegion;
    zipFile: string;
    functionName: string;
    accountId: string;
    memorySizeInMb: number;
    timeoutInSeconds: number;
    alreadyCreated: boolean;
    retentionInDays: number;
    ephemerealStorageInMb: number;
    architecture: LambdaArchitecture;
    customRoleArn: string;
}) => Promise<{
    FunctionName: string;
}>;
