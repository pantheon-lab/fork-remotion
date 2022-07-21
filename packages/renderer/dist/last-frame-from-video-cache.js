"use strict";
// OffthreadVideo requires sometimes that the last frame of a video gets extracted, however, this can be slow. We allocate a cache for it but that can be garbage collected
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearLastFileCache = exports.getLastFrameFromCache = exports.setLastFrameInCache = void 0;
let map = {};
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
let bufferSize = 0;
const makeLastFrameCacheKey = (options) => {
    return [
        options.ffmpegExecutable,
        options.offset,
        options.src,
        options.imageFormat,
    ].join('-');
};
const setLastFrameInCache = (options, data) => {
    const key = makeLastFrameCacheKey(options);
    if (map[key]) {
        bufferSize -= map[key].data.byteLength;
    }
    map[key] = { data, lastAccessed: Date.now() };
    bufferSize += data.byteLength;
    ensureMaxSize();
};
exports.setLastFrameInCache = setLastFrameInCache;
const getLastFrameFromCache = (options) => {
    var _a;
    const key = makeLastFrameCacheKey(options);
    if (!map[key]) {
        return null;
    }
    map[key].lastAccessed = Date.now();
    return (_a = map[key].data) !== null && _a !== void 0 ? _a : null;
};
exports.getLastFrameFromCache = getLastFrameFromCache;
const removedLastFrameFromCache = (key) => {
    if (!map[key]) {
        return;
    }
    bufferSize -= map[key].data.byteLength;
    delete map[key];
};
const ensureMaxSize = () => {
    // eslint-disable-next-line no-unmodified-loop-condition
    while (bufferSize > MAX_CACHE_SIZE) {
        const earliest = Object.entries(map).sort((a, b) => {
            return a[1].lastAccessed - b[1].lastAccessed;
        })[0];
        removedLastFrameFromCache(earliest[0]);
    }
};
const clearLastFileCache = () => {
    map = {};
};
exports.clearLastFileCache = clearLastFileCache;
