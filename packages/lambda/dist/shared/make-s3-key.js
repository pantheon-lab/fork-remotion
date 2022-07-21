"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeS3Key = void 0;
const path_1 = __importDefault(require("path"));
const makeS3Key = (folder, dir, filePath) => {
    return `${folder}/${path_1.default.relative(dir, filePath).split(path_1.default.sep).join('/')}`;
};
exports.makeS3Key = makeS3Key;
