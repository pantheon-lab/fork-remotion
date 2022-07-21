"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presignUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const aws_clients_1 = require("../shared/aws-clients");
const validate_bucketname_1 = require("../shared/validate-bucketname");
const validate_presign_expiration_1 = require("../shared/validate-presign-expiration");
/**
 * @description Returns a public url of an object stored in Remotion's S3 bucket.
 * @link https://remotion.dev/docs/lambda/presignurl
 * @param {AwsRegion} params.region The region in which the S3 bucket resides in.
 * @param {string} params.bucketName The name of the bucket to fetch the object from.
 * @param {string} params.objectKey Key of the S3 object to get.
 * @param {string} params.expiresIn The number of seconds before the presigned URL expires. Default 120.
 * @param {boolean} params.checkIfObjectExists Whether the function should check if the object exists in the bucket before generating the presigned url.
 * @returns {Promise<string | null>} The public url of an object or `null` if `checkIfObjectExists=true` & object does not exist.
 */
const presignUrl = async ({ region, bucketName, objectKey, checkIfObjectExists = false, expiresInSeconds, }) => {
    (0, validate_bucketname_1.validateBucketName)(bucketName, { mustStartWithRemotion: false });
    (0, validate_presign_expiration_1.validatePresignExpiration)(expiresInSeconds);
    const s3Client = (0, aws_clients_1.getS3Client)(region);
    if (checkIfObjectExists) {
        try {
            await s3Client.send(new client_s3_1.HeadObjectCommand({
                Bucket: bucketName,
                Key: objectKey,
            }));
        }
        catch (err) {
            if (err.name === 'NotFound') {
                return null;
            }
            throw err;
        }
    }
    const objCommand = new client_s3_1.GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
    });
    const publicUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, objCommand, {
        expiresIn: expiresInSeconds,
    });
    return publicUrl;
};
exports.presignUrl = presignUrl;
