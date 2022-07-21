"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutputUrlFromMetadata = void 0;
const expected_out_name_1 = require("./expected-out-name");
const get_current_region_1 = require("./get-current-region");
const getOutputUrlFromMetadata = (renderMetadata, bucketName) => {
    const outname = (0, expected_out_name_1.getExpectedOutName)(renderMetadata, bucketName);
    return `https://s3.${(0, get_current_region_1.getCurrentRegionInFunction)()}.amazonaws.com/${outname.renderBucketName}/${outname.key}`;
};
exports.getOutputUrlFromMetadata = getOutputUrlFromMetadata;
