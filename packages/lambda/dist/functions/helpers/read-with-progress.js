"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaDownloadFileWithProgress = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const renderer_1 = require("@remotion/renderer");
const aws_clients_1 = require("../../shared/aws-clients");
const lambdaDownloadFileWithProgress = async ({ bucketName, key, region, expectedBucketOwner, outputPath, onProgress, }) => {
    const client = (0, aws_clients_1.getS3Client)(region);
    const command = new client_s3_1.GetObjectCommand({
        Bucket: bucketName,
        ExpectedBucketOwner: expectedBucketOwner,
        Key: key,
    });
    const presigned = await (0, s3_request_presigner_1.getSignedUrl)(client, command);
    const { to, sizeInBytes } = await renderer_1.RenderInternals.downloadFile({
        url: presigned,
        onProgress: ({ downloaded, percent, totalSize }) => {
            // On Lambda, it should always be a number
            onProgress({
                downloaded,
                percent: percent,
                totalSize: totalSize,
            });
        },
        to: () => outputPath,
    });
    return { sizeInBytes, to };
};
exports.lambdaDownloadFileWithProgress = lambdaDownloadFileWithProgress;
