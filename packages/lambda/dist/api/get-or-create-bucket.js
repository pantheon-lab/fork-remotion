"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateBucket = void 0;
const constants_1 = require("../shared/constants");
const random_hash_1 = require("../shared/random-hash");
const create_bucket_1 = require("./create-bucket");
const enable_s3_website_1 = require("./enable-s3-website");
const get_buckets_1 = require("./get-buckets");
/**
 * @description Creates a bucket for Remotion Lambda in your S3 account. If one already exists, it will get returned instead.
 * @link https://remotion.dev/docs/lambda/getorcreatebucket
 * @param options.region The region in which you want your S3 bucket to reside in.
 * @returns {Promise<GetOrCreateBucketOutput>} An object containing the `bucketName`.
 */
const getOrCreateBucket = async (options) => {
    var _a, _b;
    const { remotionBuckets } = await (0, get_buckets_1.getRemotionS3Buckets)(options.region);
    if (remotionBuckets.length > 1) {
        throw new Error(`You have multiple buckets (${remotionBuckets.map((b) => b.name)}) in your S3 region (${options.region}) starting with "${constants_1.REMOTION_BUCKET_PREFIX}". This is an error, please delete buckets so that you have one maximum.`);
    }
    if (remotionBuckets.length === 1) {
        (_a = options.onBucketEnsured) === null || _a === void 0 ? void 0 : _a.call(options);
        return { bucketName: remotionBuckets[0].name };
    }
    const bucketName = constants_1.REMOTION_BUCKET_PREFIX + (0, random_hash_1.randomHash)();
    await (0, create_bucket_1.createBucket)({
        bucketName,
        region: options.region,
    });
    (_b = options.onBucketEnsured) === null || _b === void 0 ? void 0 : _b.call(options);
    await (0, enable_s3_website_1.enableS3Website)({
        region: options.region,
        bucketName,
    });
    return { bucketName };
};
exports.getOrCreateBucket = getOrCreateBucket;
