"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucketExistsInRegion = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_clients_1 = require("../shared/aws-clients");
const bucketExistsInRegion = async ({ bucketName, region, expectedBucketOwner, }) => {
    var _a;
    try {
        const bucket = await (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.GetBucketLocationCommand({
            Bucket: bucketName,
            ExpectedBucketOwner: expectedBucketOwner !== null && expectedBucketOwner !== void 0 ? expectedBucketOwner : undefined,
        }));
        return ((_a = bucket.LocationConstraint) !== null && _a !== void 0 ? _a : 'us-east-1') === region;
    }
    catch (err) {
        if (err.Code === 'NoSuchBucket') {
            return false;
        }
        throw err;
    }
};
exports.bucketExistsInRegion = bucketExistsInRegion;
