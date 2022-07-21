"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptimization = exports.writeOptimization = void 0;
const constants_1 = require("../../shared/constants");
const stream_to_string_1 = require("../../shared/stream-to-string");
const io_1 = require("../helpers/io");
const writeOptimization = async ({ bucketName, optimization, compositionId, siteId, region, expectedBucketOwner, }) => {
    await (0, io_1.lambdaWriteFile)({
        bucketName,
        body: JSON.stringify(optimization),
        key: (0, constants_1.optimizationProfile)(siteId, compositionId) + '.json',
        region,
        privacy: 'private',
        expectedBucketOwner,
        downloadBehavior: null,
    });
};
exports.writeOptimization = writeOptimization;
const getOptimization = async ({ siteId, compositionId, bucketName, region, expectedBucketOwner, }) => {
    const prefix = (0, constants_1.optimizationProfile)(siteId, compositionId);
    const dir = await (0, io_1.lambdaLs)({
        bucketName,
        prefix,
        region,
        expectedBucketOwner,
    });
    const files = dir
        .sort((a, b) => {
        var _a, _b;
        return ((_a = a.LastModified) === null || _a === void 0 ? void 0 : _a.getTime()) -
            ((_b = b.LastModified) === null || _b === void 0 ? void 0 : _b.getTime());
    })
        .reverse();
    if (files.length === 0) {
        return null;
    }
    const body = await (0, io_1.lambdaReadFile)({
        bucketName,
        key: files[0].Key,
        region,
        expectedBucketOwner,
    });
    const str = await (0, stream_to_string_1.streamToString)(body);
    return JSON.parse(str);
};
exports.getOptimization = getOptimization;
