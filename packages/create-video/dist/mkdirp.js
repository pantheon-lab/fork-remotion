"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkdirp = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function mkdirp(dir) {
    const parent = path_1.default.dirname(dir);
    if (parent === dir)
        return;
    mkdirp(parent);
    try {
        fs_1.default.mkdirSync(dir);
    }
    catch (err) {
        if (err.code !== 'EEXIST')
            throw err;
    }
}
exports.mkdirp = mkdirp;
