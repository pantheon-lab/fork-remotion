"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFunction = void 0;
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const fs_1 = require("fs");
const defaults_1 = require("../defaults");
const aws_clients_1 = require("../shared/aws-clients");
const hosted_layers_1 = require("../shared/hosted-layers");
const suggested_policy_1 = require("./iam-validation/suggested-policy");
const createFunction = async ({ createCloudWatchLogGroup, region, zipFile, functionName, accountId, memorySizeInMb, timeoutInSeconds, alreadyCreated, retentionInDays, architecture, ephemerealStorageInMb, customRoleArn, }) => {
    if (createCloudWatchLogGroup) {
        try {
            await (0, aws_clients_1.getCloudWatchLogsClient)(region).send(new client_cloudwatch_logs_1.CreateLogGroupCommand({
                logGroupName: `${defaults_1.LOG_GROUP_PREFIX}${functionName}`,
            }));
        }
        catch (_err) {
            const err = _err;
            if (!err.message.includes('log group already exists')) {
                throw err;
            }
        }
        await (0, aws_clients_1.getCloudWatchLogsClient)(region).send(new client_cloudwatch_logs_1.PutRetentionPolicyCommand({
            logGroupName: `${defaults_1.LOG_GROUP_PREFIX}${functionName}`,
            retentionInDays,
        }));
    }
    if (alreadyCreated) {
        return { FunctionName: functionName };
    }
    const defaultRoleName = `arn:aws:iam::${accountId}:role/${suggested_policy_1.ROLE_NAME}`;
    const { FunctionName } = await (0, aws_clients_1.getLambdaClient)(region).send(new client_lambda_1.CreateFunctionCommand({
        Code: {
            ZipFile: (0, fs_1.readFileSync)(zipFile),
        },
        FunctionName: functionName,
        Handler: 'index.handler',
        Role: customRoleArn !== null && customRoleArn !== void 0 ? customRoleArn : defaultRoleName,
        Runtime: 'nodejs14.x',
        Description: 'Renders a Remotion video.',
        MemorySize: memorySizeInMb,
        Timeout: timeoutInSeconds,
        Layers: hosted_layers_1.hostedLayers[architecture][region].map(({ layerArn, version }) => `${layerArn}:${version}`),
        Architectures: [architecture],
        EphemeralStorage: {
            Size: ephemerealStorageInMb,
        },
    }));
    await (0, aws_clients_1.getLambdaClient)(region).send(new client_lambda_1.PutFunctionEventInvokeConfigCommand({
        MaximumRetryAttempts: 0,
        FunctionName,
    }));
    return { FunctionName: FunctionName };
};
exports.createFunction = createFunction;
