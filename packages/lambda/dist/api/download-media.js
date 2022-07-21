"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadVideo = exports.downloadMedia = void 0;
const renderer_1 = require("@remotion/renderer");
const path_1 = __importDefault(require("path"));
const expected_out_name_1 = require("../functions/helpers/expected-out-name");
const get_render_metadata_1 = require("../functions/helpers/get-render-metadata");
const read_with_progress_1 = require("../functions/helpers/read-with-progress");
const get_account_id_1 = require("../shared/get-account-id");
const downloadMedia = async (input) => {
    var _a;
    const expectedBucketOwner = await (0, get_account_id_1.getAccountId)({
        region: input.region,
    });
    const renderMetadata = await (0, get_render_metadata_1.getRenderMetadata)({
        bucketName: input.bucketName,
        expectedBucketOwner,
        region: input.region,
        renderId: input.renderId,
    });
    const outputPath = path_1.default.resolve(process.cwd(), input.outPath);
    renderer_1.RenderInternals.ensureOutputDirectory(outputPath);
    const { key, renderBucketName } = (0, expected_out_name_1.getExpectedOutName)(renderMetadata, input.bucketName);
    const { sizeInBytes } = await (0, read_with_progress_1.lambdaDownloadFileWithProgress)({
        bucketName: renderBucketName,
        expectedBucketOwner,
        key,
        region: input.region,
        onProgress: (_a = input.onProgress) !== null && _a !== void 0 ? _a : (() => undefined),
        outputPath,
    });
    return {
        outputPath,
        sizeInBytes,
    };
};
exports.downloadMedia = downloadMedia;
/**
 * @deprecated Renamed to downloadMedia()
 */
exports.downloadVideo = exports.downloadMedia;
