"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOutname = void 0;
const validate_bucketname_1 = require("./validate-bucketname");
const validateS3Key = (s3Key) => {
    if (typeof s3Key !== 'string') {
        throw new TypeError('The S3 key must be a string. Passed an object of type ' + typeof s3Key);
    }
    if (!s3Key.match(/^([0-9a-zA-Z-!_.*'()/]+)$/g)) {
        throw new Error("The S3 Key must match the RegExp `/([0-9a-zA-Z-!_.*'()/]+)/g`. You passed: " +
            s3Key +
            '. Check for invalid characters.');
    }
};
const validateOutname = (outName) => {
    if (typeof outName === 'undefined' || outName === null) {
        return;
    }
    if (typeof outName === 'string') {
        validateS3Key(outName);
        return;
    }
    validateS3Key(outName.key);
    (0, validate_bucketname_1.validateBucketName)(outName.bucketName, { mustStartWithRemotion: false });
};
exports.validateOutname = validateOutname;
