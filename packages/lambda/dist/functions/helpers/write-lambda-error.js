"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLambdaError = exports.getTmpDirStateIfENoSp = void 0;
const constants_1 = require("../../shared/constants");
const get_current_region_1 = require("./get-current-region");
const get_files_in_folder_1 = require("./get-files-in-folder");
const io_1 = require("./io");
const is_enosp_err_1 = require("./is-enosp-err");
const getTmpDirStateIfENoSp = (err) => {
    if (!(0, is_enosp_err_1.errorIsOutOfSpaceError)(err)) {
        return null;
    }
    const files = (0, get_files_in_folder_1.getFolderFiles)('/tmp');
    return {
        files: files
            .slice(0)
            .sort((a, b) => a.size - b.size)
            .reverse()
            .slice(0, 100),
        total: files.reduce((a, b) => a + b.size, 0),
    };
};
exports.getTmpDirStateIfENoSp = getTmpDirStateIfENoSp;
const writeLambdaError = async ({ bucketName, renderId, errorInfo, expectedBucketOwner, }) => {
    await (0, io_1.lambdaWriteFile)({
        bucketName,
        key: `${(0, constants_1.getErrorFileName)({
            renderId,
            chunk: errorInfo.chunk,
            attempt: errorInfo.attempt,
        })}.txt`,
        body: JSON.stringify(errorInfo),
        region: (0, get_current_region_1.getCurrentRegionInFunction)(),
        privacy: 'private',
        expectedBucketOwner,
        downloadBehavior: null,
    });
};
exports.writeLambdaError = writeLambdaError;
