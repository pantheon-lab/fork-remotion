"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileSource = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const allowedFileExtensions = ['js', 'ts', 'tsx', 'jsx', 'map', 'mjs'];
const getFileSource = (p) => {
    if (!allowedFileExtensions.find((extension) => p.endsWith(extension))) {
        throw new Error(`Not allowed to open ${p}`);
    }
    const resolved = path_1.default.resolve(process.cwd(), p);
    const relativeToProcessCwd = path_1.default.relative(process.cwd(), resolved);
    if (relativeToProcessCwd.startsWith('..')) {
        throw new Error(`Not allowed to open ${relativeToProcessCwd}`);
    }
    return fs_1.default.promises.readFile(p, 'utf-8');
};
exports.getFileSource = getFileSource;
