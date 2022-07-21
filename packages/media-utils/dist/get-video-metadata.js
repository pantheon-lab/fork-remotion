"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoMetadata = void 0;
const is_remote_asset_1 = require("./is-remote-asset");
const p_limit_1 = require("./p-limit");
const cache = {};
const limit = (0, p_limit_1.pLimit)(3);
const fn = (src) => {
    if (cache[src]) {
        return Promise.resolve(cache[src]);
    }
    if (typeof document === 'undefined') {
        throw new Error('getVideoMetadata() is only available in the browser.');
    }
    const video = document.createElement('video');
    video.src = src;
    return new Promise((resolve, reject) => {
        const onError = () => {
            reject(video.error);
            cleanup();
        };
        const onLoadedMetadata = () => {
            const pixels = video.videoHeight * video.videoWidth;
            if (pixels === 0) {
                reject(new Error('Unable to determine video metadata'));
                return;
            }
            const metadata = {
                durationInSeconds: video.duration,
                width: video.videoWidth,
                height: video.videoHeight,
                aspectRatio: video.videoWidth / video.videoHeight,
                isRemote: (0, is_remote_asset_1.isRemoteAsset)(src),
            };
            resolve(metadata);
            cache[src] = metadata;
            cleanup();
        };
        const cleanup = () => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('error', onError);
            video.remove();
        };
        video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
        video.addEventListener('error', onError, { once: true });
    });
};
const getVideoMetadata = (src) => {
    return limit(fn, src);
};
exports.getVideoMetadata = getVideoMetadata;
