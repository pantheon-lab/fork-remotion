"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemotionS3Buckets = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_clients_1 = require("../shared/aws-clients");
const constants_1 = require("../shared/constants");
const getRemotionS3Buckets = async (region) => {
    const { Buckets } = await (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.ListBucketsCommand({}));
    if (!Buckets) {
        return { remotionBuckets: [] };
    }
    const remotionBuckets = Buckets.filter((b) => { var _a; return (_a = b.Name) === null || _a === void 0 ? void 0 : _a.startsWith(constants_1.REMOTION_BUCKET_PREFIX); });
    const locations = await Promise.all(remotionBuckets.map((bucket) => {
        return (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.GetBucketLocationCommand({
            Bucket: bucket.Name,
        }));
    }));
    const bucketsWithLocation = remotionBuckets.map((bucket, i) => {
        var _a;
        return {
            creationDate: bucket.CreationDate.getTime(),
            name: bucket.Name,
            // AWS docs: Buckets in Region us-east-1 have a LocationConstraint of null!!
            region: ((_a = locations[i].LocationConstraint) !== null && _a !== void 0 ? _a : 'us-east-1'),
        };
    });
    return {
        remotionBuckets: bucketsWithLocation.filter((bucket) => {
            return bucket.region === region;
        }),
    };
};
exports.getRemotionS3Buckets = getRemotionS3Buckets;
