"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncodingMetadata = void 0;
const defaults_1 = require("../../defaults");
const stream_to_string_1 = require("../../shared/stream-to-string");
const io_1 = require("./io");
const getEncodingMetadata = async ({ exists, bucketName, renderId, region, expectedBucketOwner, }) => {
    if (!exists) {
        return null;
    }
    try {
        const Body = await (0, io_1.lambdaReadFile)({
            bucketName,
            key: (0, defaults_1.encodingProgressKey)(renderId),
            region,
            expectedBucketOwner,
        });
        const encodingProgress = JSON.parse(await (0, stream_to_string_1.streamToString)(Body));
        return encodingProgress;
    }
    catch (err) {
        // The file may not yet have been fully written or already have been cleaned up again
        return null;
    }
};
exports.getEncodingMetadata = getEncodingMetadata;
