"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenderMetadata = void 0;
const constants_1 = require("../../shared/constants");
const stream_to_string_1 = require("../../shared/stream-to-string");
const io_1 = require("./io");
const getRenderMetadata = async ({ bucketName, renderId, region, expectedBucketOwner, }) => {
    const Body = await (0, io_1.lambdaReadFile)({
        bucketName,
        key: (0, constants_1.renderMetadataKey)(renderId),
        region,
        expectedBucketOwner,
    });
    const renderMetadataResponse = JSON.parse(await (0, stream_to_string_1.streamToString)(Body));
    return renderMetadataResponse;
};
exports.getRenderMetadata = getRenderMetadata;
