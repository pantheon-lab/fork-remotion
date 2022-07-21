"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaReadFile = exports.lambdaWriteFile = exports.lambdaLs = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const mime_types_1 = __importDefault(require("mime-types"));
const aws_clients_1 = require("../../shared/aws-clients");
const lambdaLs = async ({ bucketName, prefix, region, expectedBucketOwner, continuationToken, }) => {
    var _a, _b, _c;
    try {
        const list = await (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
            ExpectedBucketOwner: expectedBucketOwner !== null && expectedBucketOwner !== void 0 ? expectedBucketOwner : undefined,
            ContinuationToken: continuationToken,
        }));
        if (list.NextContinuationToken) {
            return [
                ...((_a = list.Contents) !== null && _a !== void 0 ? _a : []),
                ...(await (0, exports.lambdaLs)({
                    bucketName,
                    prefix,
                    expectedBucketOwner,
                    region,
                    continuationToken: list.NextContinuationToken,
                })),
            ];
        }
        return (_b = list.Contents) !== null && _b !== void 0 ? _b : [];
    }
    catch (err) {
        if (!expectedBucketOwner) {
            throw err;
        }
        // Prevent from accessing a foreign bucket, retry without ExpectedBucketOwner and see if it works. If it works then it's an owner mismatch.
        if ((_c = err.stack) === null || _c === void 0 ? void 0 : _c.includes('AccessDenied')) {
            await (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.ListObjectsV2Command({
                Bucket: bucketName,
                Prefix: prefix,
            }));
            throw new Error(`Bucket owner mismatch: Expected the bucket ${bucketName} to be owned by you (AWS Account ID: ${expectedBucketOwner}) but it's not the case. Did you accidentially specify the wrong bucket?`);
        }
        throw err;
    }
};
exports.lambdaLs = lambdaLs;
const lambdaWriteFile = async ({ bucketName, key, body, region, privacy, expectedBucketOwner, }) => {
    await (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ACL: privacy === 'private' ? 'private' : 'public-read',
        ExpectedBucketOwner: expectedBucketOwner !== null && expectedBucketOwner !== void 0 ? expectedBucketOwner : undefined,
        ContentType: mime_types_1.default.lookup(key) || 'application/octet-stream',
    }));
};
exports.lambdaWriteFile = lambdaWriteFile;
const lambdaReadFile = async ({ bucketName, key, region, expectedBucketOwner, }) => {
    const { Body } = await (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.GetObjectCommand({
        Bucket: bucketName,
        Key: key,
        ExpectedBucketOwner: expectedBucketOwner,
    }));
    return Body;
};
exports.lambdaReadFile = lambdaReadFile;
