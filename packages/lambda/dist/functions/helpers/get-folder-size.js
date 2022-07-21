"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFolderSizeRecursively = void 0;
const get_files_in_folder_1 = require("./get-files-in-folder");
function getFolderSizeRecursively(folder) {
    return (0, get_files_in_folder_1.getFolderFiles)(folder).reduce((a, b) => a + b.size, 0);
}
exports.getFolderSizeRecursively = getFolderSizeRecursively;
