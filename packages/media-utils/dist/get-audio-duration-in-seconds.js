"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAudioDuration = exports.getAudioDurationInSeconds = void 0;
const p_limit_1 = require("./p-limit");
const limit = (0, p_limit_1.pLimit)(3);
const metadataCache = {};
const fn = (src) => {
    if (metadataCache[src]) {
        return Promise.resolve(metadataCache[src]);
    }
    if (typeof document === 'undefined') {
        throw new Error('getAudioDuration() is only available in the browser.');
    }
    const audio = document.createElement('audio');
    audio.src = src;
    return new Promise((resolve, reject) => {
        const onError = () => {
            reject(audio.error);
            cleanup();
        };
        const onLoadedMetadata = () => {
            metadataCache[src] = audio.duration;
            resolve(audio.duration);
            cleanup();
        };
        const cleanup = () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('error', onError);
            audio.remove();
        };
        audio.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
        audio.addEventListener('error', onError, { once: true });
    });
};
/**
 * Get the audio file passed in parameter duration in seconds
 * @async
 * @param src path to the audio file
 * @return {number} duration of the audio file in seconds
 */
const getAudioDurationInSeconds = (src) => {
    return limit(fn, src);
};
exports.getAudioDurationInSeconds = getAudioDurationInSeconds;
/**
 * @deprecated Renamed to `getAudioDurationInSeconds`
 */
const getAudioDuration = (src) => (0, exports.getAudioDurationInSeconds)(src);
exports.getAudioDuration = getAudioDuration;