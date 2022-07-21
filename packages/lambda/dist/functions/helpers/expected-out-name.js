"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpectedOutName = void 0;
const renderer_1 = require("@remotion/renderer");
const defaults_1 = require("../../defaults");
const validate_outname_1 = require("../../shared/validate-outname");
const getExpectedOutName = (renderMetadata, bucketName) => {
    if (renderMetadata.outName) {
        (0, validate_outname_1.validateOutname)(renderMetadata.outName);
        return (0, defaults_1.customOutName)(renderMetadata.renderId, bucketName, renderMetadata.outName);
    }
    if (renderMetadata.type === 'still') {
        return {
            renderBucketName: bucketName,
            key: (0, defaults_1.outStillName)(renderMetadata.renderId, renderMetadata.imageFormat),
        };
    }
    if (renderMetadata.type === 'video') {
        return {
            renderBucketName: bucketName,
            key: (0, defaults_1.outName)(renderMetadata.renderId, renderer_1.RenderInternals.getFileExtensionFromCodec(renderMetadata.codec, 'final')),
        };
    }
    throw new TypeError('no type passed');
};
exports.getExpectedOutName = getExpectedOutName;
