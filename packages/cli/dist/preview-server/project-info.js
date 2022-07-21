"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectInfo = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const getProjectInfo = () => {
    var _a;
    const pathsToLookFor = ['src/Video.tsx', 'src/Video.jsx'].map((p) => {
        return path_1.default.join(process.cwd(), p);
    });
    const videoFile = (_a = pathsToLookFor.find((p) => (0, fs_1.existsSync)(p))) !== null && _a !== void 0 ? _a : null;
    return Promise.resolve({
        videoFile,
        relativeVideoFile: videoFile
            ? path_1.default.relative(process.cwd(), videoFile)
            : null,
    });
};
exports.getProjectInfo = getProjectInfo;
