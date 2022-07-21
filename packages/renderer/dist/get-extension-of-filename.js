"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensionOfFilename = void 0;
const getExtensionOfFilename = (filename) => {
    const filenameArr = filename.split('.');
    const hasExtension = filenameArr.length >= 2;
    const filenameArrLength = filenameArr.length;
    const extension = hasExtension ? filenameArr[filenameArrLength - 1] : null;
    return extension;
};
exports.getExtensionOfFilename = getExtensionOfFilename;
