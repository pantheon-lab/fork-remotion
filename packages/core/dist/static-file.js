"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticFile = void 0;
const trimLeadingSlash = (path) => {
    if (path.startsWith('/')) {
        return trimLeadingSlash(path.substr(1));
    }
    return path;
};
const inner = (path) => {
    if (typeof window !== 'undefined' && window.remotion_staticBase) {
        return `${window.remotion_staticBase}/${trimLeadingSlash(path)}`;
    }
    return `/${trimLeadingSlash(path)}`;
};
const staticFile = (path) => {
    const preparsed = inner(path);
    if (!preparsed.startsWith('/')) {
        return `/${preparsed}`;
    }
    return preparsed;
};
exports.staticFile = staticFile;
