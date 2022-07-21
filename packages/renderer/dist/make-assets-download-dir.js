"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAssetsDownloadTmpDir = void 0;
const tmp_dir_1 = require("./tmp-dir");
let dir = null;
const makeAssetsDownloadTmpDir = () => {
    if (dir) {
        return dir;
    }
    dir = (0, tmp_dir_1.tmpDir)('remotion-assets-dir');
    return dir;
};
exports.makeAssetsDownloadTmpDir = makeAssetsDownloadTmpDir;
