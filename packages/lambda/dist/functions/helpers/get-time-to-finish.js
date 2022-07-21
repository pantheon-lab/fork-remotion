"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeToFinish = void 0;
const getTimeToFinish = ({ renderMetadata, lastModified, }) => {
    if (!lastModified) {
        return null;
    }
    if (!renderMetadata) {
        return null;
    }
    return Math.max(0, lastModified - renderMetadata.startedDate);
};
exports.getTimeToFinish = getTimeToFinish;
