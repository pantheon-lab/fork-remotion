"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFolderFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getFolderFiles(folder) {
    const files = fs_1.default.readdirSync(folder);
    const paths = [];
    files.forEach((file) => {
        const full = path_1.default.join(folder, file);
        try {
            const stat = fs_1.default.statSync(full);
            if (stat.isDirectory()) {
                paths.push(...getFolderFiles(full));
            }
            else {
                paths.push({
                    filename: full,
                    size: stat.size,
                });
            }
        }
        catch (err) {
            if (err.message.includes('ENOENT')) {
                // Race condition: File was deleted in the meanwhile.
                // Do nothing
            }
            else {
                throw err;
            }
        }
    });
    return paths;
}
exports.getFolderFiles = getFolderFiles;