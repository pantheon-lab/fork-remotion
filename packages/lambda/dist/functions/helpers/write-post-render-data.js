"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePostRenderData = void 0;
const constants_1 = require("../../shared/constants");
const io_1 = require("./io");
const writePostRenderData = async ({ bucketName, renderId, postRenderData, expectedBucketOwner, region, }) => {
    await (0, io_1.lambdaWriteFile)({
        bucketName,
        key: (0, constants_1.postRenderDataKey)(renderId),
        privacy: 'private',
        body: JSON.stringify(postRenderData),
        expectedBucketOwner,
        region,
        downloadBehavior: null,
    });
};
exports.writePostRenderData = writePostRenderData;
