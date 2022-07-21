"use strict";
// By setting the Content-Disposition header in an S3 object,
// you can control if the user downloads the item if you
// visit the link
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentDispositionHeader = void 0;
const getContentDispositionHeader = (behavior) => {
    if (behavior === null) {
        return undefined;
    }
    if (behavior.type === 'play-in-browser') {
        return undefined;
    }
    if (behavior.fileName === null) {
        return `attachment`;
    }
    return `attachment; filename="${behavior.fileName}"`;
};
exports.getContentDispositionHeader = getContentDispositionHeader;
