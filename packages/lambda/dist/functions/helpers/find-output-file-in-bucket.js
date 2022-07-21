"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOutputFileInBucket = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_clients_1 = require("../../shared/aws-clients");
const expected_out_name_1 = require("./expected-out-name");
const get_output_url_from_metadata_1 = require("./get-output-url-from-metadata");
const findOutputFileInBucket = async ({ region, renderMetadata, bucketName, }) => {
    var _a;
    if (!renderMetadata) {
        throw new Error('unexpectedly did not get renderMetadata');
    }
    const expectedOutData = (0, expected_out_name_1.getExpectedOutName)(renderMetadata, bucketName);
    try {
        const head = await (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.HeadObjectCommand({
            Bucket: expectedOutData.renderBucketName,
            Key: expectedOutData.key,
        }));
        return {
            lastModified: (_a = head.LastModified) === null || _a === void 0 ? void 0 : _a.getTime(),
            size: head.ContentLength,
            url: (0, get_output_url_from_metadata_1.getOutputUrlFromMetadata)(renderMetadata, bucketName),
        };
    }
    catch (err) {
        if (err.name === 'NotFound') {
            return null;
        }
        throw err;
    }
};
exports.findOutputFileInBucket = findOutputFileInBucket;
