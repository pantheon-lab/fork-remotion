"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolePermissions = void 0;
const aws_policies_1 = require("aws-policies");
const constants_1 = require("../../shared/constants");
exports.rolePermissions = [
    {
        actions: [aws_policies_1.s3.ListAllMyBuckets],
        resource: ['*'],
    },
    {
        actions: [
            aws_policies_1.s3.CreateBucket,
            aws_policies_1.s3.ListBucket,
            aws_policies_1.s3.PutBucketAcl,
            aws_policies_1.s3.GetObject,
            aws_policies_1.s3.DeleteObject,
            aws_policies_1.s3.PutObjectAcl,
            aws_policies_1.s3.PutObject,
            aws_policies_1.s3.GetBucketLocation,
        ],
        resource: [`arn:aws:s3:::${constants_1.REMOTION_BUCKET_PREFIX}*`],
    },
    {
        actions: [aws_policies_1.lambda.InvokeFunction],
        resource: [`arn:aws:lambda:*:*:function:${constants_1.RENDER_FN_PREFIX}*`],
    },
    {
        actions: [aws_policies_1.logs.CreateLogStream, aws_policies_1.logs.PutLogEvents],
        resource: [
            `arn:aws:logs:*:*:log-group:${constants_1.LOG_GROUP_PREFIX}${constants_1.RENDER_FN_PREFIX}*`,
        ],
    },
];
