"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTmpDir = exports.deletedFilesSize = exports.deletedFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
exports.deletedFiles = [];
exports.deletedFilesSize = 0;
const deleteAllFilesInAFolderRecursively = (path) => {
    const files = fs_1.default.readdirSync(path);
    files.forEach((file) => {
        const filePath = (0, path_1.join)(path, file);
        try {
            const stat = fs_1.default.statSync(filePath);
            if (stat.isDirectory()) {
                deleteAllFilesInAFolderRecursively(filePath);
            }
            else {
                fs_1.default.unlinkSync(filePath);
                exports.deletedFilesSize += stat.size;
            }
        }
        catch (err) {
            // Can fail if file was already deleted by cleanup. In that case
            // let's ignore it
        }
        exports.deletedFiles.push(filePath);
    });
    if (path !== '/tmp') {
        fs_1.default.rmSync(path, { recursive: true, force: true });
    }
};
const deleteTmpDir = () => {
    exports.deletedFiles = [];
    exports.deletedFilesSize = 0;
    if (typeof jest === 'undefined') {
        deleteAllFilesInAFolderRecursively('/tmp');
    }
};
exports.deleteTmpDir = deleteTmpDir;
