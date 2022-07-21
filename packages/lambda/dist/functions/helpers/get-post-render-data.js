"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostRenderData = void 0;
const constants_1 = require("../../shared/constants");
const stream_to_string_1 = require("../../shared/stream-to-string");
const io_1 = require("./io");
const getPostRenderData = async ({ bucketName, renderId, region, expectedBucketOwner, }) => {
    try {
        const data = await (0, io_1.lambdaReadFile)({
            bucketName,
            key: (0, constants_1.postRenderDataKey)(renderId),
            region,
            expectedBucketOwner,
        });
        return JSON.parse(await (0, stream_to_string_1.streamToString)(data));
    }
    catch (err) {
        // Does not exist
        return null;
    }
};
exports.getPostRenderData = getPostRenderData;
