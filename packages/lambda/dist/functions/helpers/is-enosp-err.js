"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowserCrashedError = exports.isErrInsufficientResourcesErr = exports.errorIsOutOfSpaceError = void 0;
const errorIsOutOfSpaceError = (err) => {
    return (err.includes('ENOSPC') ||
        err.toLowerCase().includes('no space left on device'));
};
exports.errorIsOutOfSpaceError = errorIsOutOfSpaceError;
const isErrInsufficientResourcesErr = (err) => {
    return err.includes('net::ERR_INSUFFICIENT_RESOURCES');
};
exports.isErrInsufficientResourcesErr = isErrInsufficientResourcesErr;
const isBrowserCrashedError = (err) => {
    return err.includes('Target closed.');
};
exports.isBrowserCrashedError = isBrowserCrashedError;