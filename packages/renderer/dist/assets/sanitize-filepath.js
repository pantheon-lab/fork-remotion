"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFilePath = void 0;
const path_1 = __importDefault(require("path"));
const sanitize_filename_1 = require("./sanitize-filename");
const pathSeparators = /[/\\]/;
const sanitizeFilePath = (pathToSanitize) => {
    return pathToSanitize
        .split(pathSeparators)
        .map((s) => (0, sanitize_filename_1.sanitizeFilename)(s))
        .join(path_1.default.sep);
};
exports.sanitizeFilePath = sanitizeFilePath;
