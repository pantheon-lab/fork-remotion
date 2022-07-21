"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMultiDownloadProgress = exports.getFileSizeDownloadBar = void 0;
const format_bytes_1 = require("./format-bytes");
const make_progress_bar_1 = require("./make-progress-bar");
const getFileSizeDownloadBar = (downloaded) => {
    const desiredLength = (0, make_progress_bar_1.makeProgressBar)(0).length;
    return `[${(0, format_bytes_1.formatBytes)(downloaded).padEnd(desiredLength - 2, ' ')}]`;
};
exports.getFileSizeDownloadBar = getFileSizeDownloadBar;
const makeMultiDownloadProgress = (progresses) => {
    if (progresses.length === 0) {
        return null;
    }
    if (progresses.length === 1) {
        const [progress] = progresses;
        const truncatedFileName = progress.name.length >= 60
            ? progress.name.substring(0, 57) + '...'
            : progress.name;
        return [
            `    +`,
            progress.progress
                ? (0, make_progress_bar_1.makeProgressBar)(progress.progress)
                : (0, exports.getFileSizeDownloadBar)(progress.downloaded),
            `Downloading ${truncatedFileName}`,
        ].join(' ');
    }
    const everyFileHasContentLength = progresses.every((p) => p.totalBytes !== null);
    return [
        `    +`,
        everyFileHasContentLength
            ? (0, make_progress_bar_1.makeProgressBar)(progresses.reduce((a, b) => a + b.progress, 0) /
                progresses.length)
            : (0, exports.getFileSizeDownloadBar)(progresses.reduce((a, b) => a + b.downloaded, 0)),
        `Downloading ${progresses.length} files`,
    ].join(' ');
};
exports.makeMultiDownloadProgress = makeMultiDownloadProgress;
