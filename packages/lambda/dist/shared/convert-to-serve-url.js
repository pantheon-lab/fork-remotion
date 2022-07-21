"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToServeUrl = void 0;
const get_or_create_bucket_1 = require("../api/get-or-create-bucket");
const docs_url_1 = require("./docs-url");
const convertToServeUrl = async (urlOrId, region) => {
    if (urlOrId.startsWith('src/')) {
        throw new Error(`Remotion Lambda can only render based on a URL in the cloud. It seems like you passed a local file: ${urlOrId}. Read the setup guide for Remotion Lambda ${docs_url_1.DOCS_URL}/docs/lambda/setup`);
    }
    if (urlOrId.startsWith('http://') || urlOrId.startsWith('https://')) {
        return urlOrId;
    }
    const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region,
    });
    return `https://${bucketName}.s3.${region}.amazonaws.com/sites/${urlOrId}/index.html`;
};
exports.convertToServeUrl = convertToServeUrl;
