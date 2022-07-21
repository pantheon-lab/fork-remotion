import type { AwsRegion } from '../pricing/aws-regions';
export declare type PresignURLInput = {
    region: AwsRegion;
    bucketName: string;
    objectKey: string;
    checkIfObjectExists?: boolean;
    expiresInSeconds: number;
};
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
export declare const presignUrl: ({ region, bucketName, objectKey, checkIfObjectExists, expiresInSeconds, }: PresignURLInput) => Promise<string | null>;
