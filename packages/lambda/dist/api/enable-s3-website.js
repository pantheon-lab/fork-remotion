"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableS3Website = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_clients_1 = require("../shared/aws-clients");
const enableS3Website = async ({ region, bucketName, }) => {
    await (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.PutBucketWebsiteCommand({
        Bucket: bucketName,
        WebsiteConfiguration: {
            IndexDocument: {
                Suffix: 'index.html',
            },
        },
    }));
};
exports.enableS3Website = enableS3Website;
