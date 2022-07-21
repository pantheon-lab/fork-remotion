"use strict";
// While an FFMPEG filter can be passed directly, if it's too long
// we run into Windows command length limits.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFfmpegFilterFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const delete_directory_1 = require("./delete-directory");
const tmp_dir_1 = require("./tmp-dir");
const makeFfmpegFilterFile = async (complexFilter) => {
    const tempPath = (0, tmp_dir_1.tmpDir)('remotion-complex-filter');
    const filterFile = path_1.default.join(tempPath, 'complex-filter.txt');
    await fs_1.default.promises.writeFile(filterFile, complexFilter);
    return {
        file: filterFile,
        cleanup: () => {
            (0, delete_directory_1.deleteDirectory)(filterFile);
        },
    };
};
exports.makeFfmpegFilterFile = makeFfmpegFilterFile;
