"use strict";
// Determines the filenames for frames that get rendered.
// - If passed to FFMPEG, they should be consecutive: element-000.jpg, element-001.jpg, element-002.jpg
// - If `--every-nth-frame` is passed, only frames 0, 2, 4 are rendered
// - If an image sequence is created, the filenames should correspond to the frame numbers: element-099.jpg, element-100.jpg
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePadLength = exports.getFrameOutputFileName = void 0;
const padIndex = ({ num, filePadLength, }) => {
    return String(num).padStart(filePadLength, '0');
};
const getFrameOutputFileName = ({ index, frame, imageFormat, countType, lastFrame, totalFrames, }) => {
    const filePadLength = (0, exports.getFilePadLength)({ lastFrame, countType, totalFrames });
    if (countType === 'actual-frames') {
        const paddedIndex = padIndex({ filePadLength, num: frame });
        return `element-${paddedIndex}.${imageFormat}`;
    }
    if (countType === 'from-zero') {
        const paddedIndex = padIndex({ filePadLength, num: index });
        return `element-${paddedIndex}.${imageFormat}`;
    }
    throw new TypeError('Unknown count type');
};
exports.getFrameOutputFileName = getFrameOutputFileName;
const getFilePadLength = ({ lastFrame, totalFrames, countType, }) => {
    if (countType === 'actual-frames') {
        return String(lastFrame).length;
    }
    if (countType === 'from-zero') {
        return String(totalFrames - 1).length;
    }
    throw new Error('Unknown file type');
};
exports.getFilePadLength = getFilePadLength;
