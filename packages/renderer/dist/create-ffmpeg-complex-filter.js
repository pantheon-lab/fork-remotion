"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFfmpegComplexFilter = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const create_ffmpeg_merge_filter_1 = require("./create-ffmpeg-merge-filter");
const ffmpeg_filter_file_1 = require("./ffmpeg-filter-file");
const tmp_dir_1 = require("./tmp-dir");
const createFfmpegComplexFilter = async (filters) => {
    if (filters === 0) {
        return { complexFilterFlag: null, cleanup: () => undefined };
    }
    const complexFilter = (0, create_ffmpeg_merge_filter_1.createFfmpegMergeFilter)(filters);
    const { file, cleanup } = await (0, ffmpeg_filter_file_1.makeFfmpegFilterFile)(complexFilter);
    const tempPath = (0, tmp_dir_1.tmpDir)('remotion-complex-filter-script');
    const filterFile = path_1.default.join(tempPath, 'complex-filter.txt');
    await fs_1.default.promises.writeFile(filterFile, complexFilter);
    return {
        complexFilterFlag: ['-filter_complex_script', file],
        cleanup,
    };
};
exports.createFfmpegComplexFilter = createFfmpegComplexFilter;
