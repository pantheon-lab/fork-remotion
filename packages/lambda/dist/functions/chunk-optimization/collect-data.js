"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectChunkInformation = void 0;
const constants_1 = require("../../shared/constants");
const stream_to_string_1 = require("../../shared/stream-to-string");
const io_1 = require("../helpers/io");
const collectChunkInformation = async ({ bucketName, renderId, region, expectedBucketOwner, }) => {
    const prefix = (0, constants_1.lambdaTimingsPrefix)(renderId);
    const timingFiles = await (0, io_1.lambdaLs)({
        bucketName,
        prefix,
        region,
        expectedBucketOwner,
    });
    const timingFileContents = await Promise.all(timingFiles.map(async (file) => {
        const contents = await (0, io_1.lambdaReadFile)({
            bucketName,
            key: file.Key,
            region,
            expectedBucketOwner,
        });
        const string = await (0, stream_to_string_1.streamToString)(contents);
        return JSON.parse(string);
    }));
    return timingFileContents;
};
exports.collectChunkInformation = collectChunkInformation;
