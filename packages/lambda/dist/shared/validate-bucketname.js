"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBucketName = void 0;
const constants_1 = require("./constants");
const validateBucketName = (bucketName, options) => {
    if (typeof bucketName !== 'string') {
        throw new TypeError(`'bucketName' must be a string, but is ${JSON.stringify(bucketName)}`);
    }
    if (options.mustStartWithRemotion &&
        !bucketName.startsWith(constants_1.REMOTION_BUCKET_PREFIX)) {
        throw new Error(`The bucketName parameter must start with ${constants_1.REMOTION_BUCKET_PREFIX}.`);
    }
    if (!bucketName.match(/^(?=^.{3,63}$)(?!^(\d+\.)+\d+$)(^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$)/)) {
        throw new Error(`The bucket ${bucketName} `);
    }
};
exports.validateBucketName = validateBucketName;
