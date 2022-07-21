"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAMBDA_BURST_LIMIT_QUOTA = exports.LAMBDA_CONCURRENCY_LIMIT_QUOTA = exports.CURRENT_VERSION = exports.LambdaRoutines = exports.REMOTION_FILELIST_TOKEN = exports.REMOTION_CONCATED_TOKEN = exports.CONCAT_FOLDER_TOKEN = exports.RENDERER_PATH_TOKEN = exports.postRenderDataKey = exports.customOutName = exports.outStillName = exports.outName = exports.getSitesKey = exports.optimizationProfile = exports.getErrorFileName = exports.getErrorKeyPrefix = exports.chunkKeyForIndex = exports.chunkKey = exports.lambdaTimingsKey = exports.lambdaLogsPrefix = exports.lambdaTimingsPrefixForChunk = exports.lambdaTimingsPrefix = exports.lambdaInitializedKey = exports.lambdaInitializedPrefix = exports.renderMetadataKey = exports.encodingProgressKey = exports.rendersPrefix = exports.LOG_GROUP_PREFIX = exports.RENDER_FN_PREFIX = exports.REMOTION_BUCKET_PREFIX = exports.DEFAULT_CLOUDWATCH_RETENTION_PERIOD = exports.DEFAULT_OUTPUT_PRIVACY = exports.MAX_EPHEMERAL_STORAGE_IN_MB = exports.MIN_EPHEMERAL_STORAGE_IN_MB = exports.DEFAULT_EPHEMERAL_STORAGE_IN_MB = exports.MAX_FUNCTIONS_PER_RENDER = exports.DEFAULT_MAX_RETRIES = exports.DEFAULT_REGION = exports.COMMAND_NOT_FOUND = exports.BINARY_NAME = exports.DEFAULT_FRAMES_PER_LAMBDA = exports.MINIMUM_FRAMES_PER_LAMBDA = exports.MAX_TIMEOUT = exports.MIN_TIMEOUT = exports.DEFAULT_TIMEOUT = exports.DEFAULT_ARCHITECTURE = exports.DEFAULT_MEMORY_SIZE = exports.MAX_MEMORY = exports.MIN_MEMORY = void 0;
exports.MIN_MEMORY = 512;
exports.MAX_MEMORY = 10240;
exports.DEFAULT_MEMORY_SIZE = 2048;
exports.DEFAULT_ARCHITECTURE = 'arm64';
exports.DEFAULT_TIMEOUT = 120;
exports.MIN_TIMEOUT = 15;
exports.MAX_TIMEOUT = 900;
exports.MINIMUM_FRAMES_PER_LAMBDA = 4;
exports.DEFAULT_FRAMES_PER_LAMBDA = 20;
exports.BINARY_NAME = 'remotion lambda';
exports.COMMAND_NOT_FOUND = 'Command not found';
exports.DEFAULT_REGION = 'us-east-1';
exports.DEFAULT_MAX_RETRIES = 1;
exports.MAX_FUNCTIONS_PER_RENDER = 200;
exports.DEFAULT_EPHEMERAL_STORAGE_IN_MB = 512;
exports.MIN_EPHEMERAL_STORAGE_IN_MB = 512;
exports.MAX_EPHEMERAL_STORAGE_IN_MB = 10240;
exports.DEFAULT_OUTPUT_PRIVACY = 'public';
exports.DEFAULT_CLOUDWATCH_RETENTION_PERIOD = 14;
exports.REMOTION_BUCKET_PREFIX = 'remotionlambda-';
exports.RENDER_FN_PREFIX = 'remotion-render-';
exports.LOG_GROUP_PREFIX = '/aws/lambda/';
const rendersPrefix = (renderId) => `renders/${renderId}`;
exports.rendersPrefix = rendersPrefix;
const encodingProgressKey = (renderId) => `${(0, exports.rendersPrefix)(renderId)}/encoding-progress.json`;
exports.encodingProgressKey = encodingProgressKey;
const renderMetadataKey = (renderId) => `${(0, exports.rendersPrefix)(renderId)}/pre-render-metadata.json`;
exports.renderMetadataKey = renderMetadataKey;
const lambdaInitializedPrefix = (renderId) => `${(0, exports.rendersPrefix)(renderId)}/lambda-initialized`;
exports.lambdaInitializedPrefix = lambdaInitializedPrefix;
const lambdaInitializedKey = ({ renderId, chunk, attempt, }) => `${(0, exports.lambdaInitializedPrefix)(renderId)}-chunk:${chunk}-attempt:${attempt}.txt`;
exports.lambdaInitializedKey = lambdaInitializedKey;
const lambdaTimingsPrefix = (renderId) => `${(0, exports.rendersPrefix)(renderId)}/lambda-timings/chunk:`;
exports.lambdaTimingsPrefix = lambdaTimingsPrefix;
const lambdaTimingsPrefixForChunk = (renderId, chunk) => (0, exports.lambdaTimingsPrefix)(renderId) + String(chunk).padStart(8, '0');
exports.lambdaTimingsPrefixForChunk = lambdaTimingsPrefixForChunk;
const lambdaLogsPrefix = (renderId, chunk, startFrame, endFrame) => `${(0, exports.rendersPrefix)(renderId)}/logs/chunk:${String(chunk).padStart(8, '0')}:frames:${startFrame}-${endFrame}.json`;
exports.lambdaLogsPrefix = lambdaLogsPrefix;
const lambdaTimingsKey = ({ renderId, chunk, start, rendered, }) => `${(0, exports.lambdaTimingsPrefixForChunk)(renderId, chunk)}-start:${start}-rendered:${rendered}.txt`;
exports.lambdaTimingsKey = lambdaTimingsKey;
const chunkKey = (renderId) => `${(0, exports.rendersPrefix)(renderId)}/chunks/chunk`;
exports.chunkKey = chunkKey;
const chunkKeyForIndex = ({ renderId, index, }) => `${(0, exports.chunkKey)(renderId)}:${String(index).padStart(8, '0')}`;
exports.chunkKeyForIndex = chunkKeyForIndex;
const getErrorKeyPrefix = (renderId) => `${(0, exports.rendersPrefix)(renderId)}/errors/`;
exports.getErrorKeyPrefix = getErrorKeyPrefix;
const getErrorFileName = ({ renderId, chunk, attempt, }) => (0, exports.getErrorKeyPrefix)(renderId) + ':chunk-' + chunk + ':attempt-' + attempt;
exports.getErrorFileName = getErrorFileName;
const optimizationProfile = (siteId, compositionId) => `optimization-profiles/${siteId}/${compositionId}/optimization-profile`;
exports.optimizationProfile = optimizationProfile;
const getSitesKey = (siteId) => `sites/${siteId}`;
exports.getSitesKey = getSitesKey;
const outName = (renderId, extension) => `${(0, exports.rendersPrefix)(renderId)}/out.${extension}`;
exports.outName = outName;
const outStillName = (renderId, imageFormat) => `${(0, exports.rendersPrefix)(renderId)}/out.${imageFormat}`;
exports.outStillName = outStillName;
const customOutName = (renderId, bucketName, name) => {
    if (typeof name === 'string') {
        return {
            renderBucketName: bucketName,
            key: `${(0, exports.rendersPrefix)(renderId)}/${name}`,
        };
    }
    return { key: name.key, renderBucketName: name.bucketName };
};
exports.customOutName = customOutName;
const postRenderDataKey = (renderId) => {
    return `${(0, exports.rendersPrefix)(renderId)}/post-render-metadata.json`;
};
exports.postRenderDataKey = postRenderDataKey;
exports.RENDERER_PATH_TOKEN = 'remotion-bucket';
exports.CONCAT_FOLDER_TOKEN = 'remotion-concat';
exports.REMOTION_CONCATED_TOKEN = 'remotion-concated-token';
exports.REMOTION_FILELIST_TOKEN = 'remotion-filelist';
var LambdaRoutines;
(function (LambdaRoutines) {
    LambdaRoutines["info"] = "info";
    LambdaRoutines["start"] = "start";
    LambdaRoutines["launch"] = "launch";
    LambdaRoutines["status"] = "status";
    LambdaRoutines["renderer"] = "renderer";
    LambdaRoutines["still"] = "still";
})(LambdaRoutines = exports.LambdaRoutines || (exports.LambdaRoutines = {}));
exports.CURRENT_VERSION = '2022-07-20';
exports.LAMBDA_CONCURRENCY_LIMIT_QUOTA = 'L-B99A9384';
exports.LAMBDA_BURST_LIMIT_QUOTA = 'L-548AE339';
