"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredPermissions = void 0;
const aws_policies_1 = require("aws-policies");
const constants_1 = require("../../shared/constants");
const hosted_layers_1 = require("../../shared/hosted-layers");
exports.requiredPermissions = [
    {
        id: 'HandleQuotas',
        actions: [
            aws_policies_1.servicequotas.GetServiceQuota,
            aws_policies_1.servicequotas.GetAWSDefaultServiceQuota,
            aws_policies_1.servicequotas.RequestServiceQuotaIncrease,
            aws_policies_1.servicequotas.ListRequestedServiceQuotaChangeHistoryByQuota,
        ],
        resource: ['*'],
    },
    {
        id: 'Identity',
        actions: [aws_policies_1.iam.GetUser],
        // eslint-disable-next-line no-template-curly-in-string
        resource: ['arn:aws:iam::*:user/${aws:username}'],
    },
    {
        id: 'PermissionValidation',
        actions: [aws_policies_1.iam.SimulatePrincipalPolicy],
        resource: ['*'],
    },
    {
        id: 'LambdaInvokation',
        actions: [aws_policies_1.iam.PassRole],
        resource: ['arn:aws:iam::*:role/remotion-lambda-role'],
    },
    {
        id: 'Storage',
        actions: [
            aws_policies_1.s3.GetObject,
            aws_policies_1.s3.DeleteObject,
            aws_policies_1.s3.PutObjectAcl,
            aws_policies_1.s3.PutObject,
            aws_policies_1.s3.CreateBucket,
            aws_policies_1.s3.ListBucket,
            aws_policies_1.s3.GetBucketLocation,
            aws_policies_1.s3.PutBucketAcl,
            aws_policies_1.s3.DeleteBucket,
            aws_policies_1.s3.PutBucketWebsite,
            aws_policies_1.s3.DeleteBucketWebsite,
        ],
        resource: [`arn:aws:s3:::${constants_1.REMOTION_BUCKET_PREFIX}*`],
    },
    {
        id: 'BucketListing',
        actions: [aws_policies_1.s3.ListAllMyBuckets],
        resource: ['*'],
    },
    {
        id: 'FunctionListing',
        actions: [aws_policies_1.lambda.ListFunctions, aws_policies_1.lambda.GetFunction],
        resource: ['*'],
    },
    {
        id: 'FunctionManagement',
        actions: [
            aws_policies_1.lambda.InvokeAsync,
            aws_policies_1.lambda.InvokeFunction,
            aws_policies_1.lambda.CreateFunction,
            aws_policies_1.lambda.DeleteFunction,
            aws_policies_1.lambda.PutFunctionEventInvokeConfig,
        ],
        resource: [`arn:aws:lambda:*:*:function:${constants_1.RENDER_FN_PREFIX}*`],
    },
    {
        id: 'LogsRetention',
        actions: [aws_policies_1.logs.CreateLogGroup, aws_policies_1.logs.PutRetentionPolicy],
        resource: [
            `arn:aws:logs:*:*:log-group:${constants_1.LOG_GROUP_PREFIX}${constants_1.RENDER_FN_PREFIX}*`,
        ],
    },
    {
        id: 'FetchBinaries',
        actions: [aws_policies_1.lambda.GetLayerVersion],
        resource: [hosted_layers_1.REMOTION_HOSTED_LAYER_ARN],
    },
];
