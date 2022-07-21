"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAudioData = void 0;
const is_remote_asset_1 = require("./is-remote-asset");
const p_limit_1 = require("./p-limit");
const metadataCache = {};
const limit = (0, p_limit_1.pLimit)(3);
const fetchWithCorsCatch = async (src) => {
    try {
        const response = await fetch(src);
        return response;
    }
    catch (err) {
        const error = err;
        if (
        // Chrome
        error.message.includes('Failed to fetch') ||
            // Safari
            error.message.includes('Load failed') ||
            // Firefox
            error.message.includes('NetworkError when attempting to fetch resource')) {
            throw new TypeError(`Failed to read from ${src}: ${error.message}. Does the resource support CORS?`);
        }
        throw err;
    }
};
const fn = async (src) => {
    if (metadataCache[src]) {
        return metadataCache[src];
    }
    if (typeof document === 'undefined') {
        throw new Error('getAudioData() is only available in the browser.');
    }
    const audioContext = new AudioContext();
    const response = await fetchWithCorsCatch(src);
    const arrayBuffer = await response.arrayBuffer();
    const wave = await audioContext.decodeAudioData(arrayBuffer);
    const channelWaveforms = new Array(wave.numberOfChannels)
        .fill(true)
        .map((_, channel) => {
        return wave.getChannelData(channel);
    });
    const metadata = {
        channelWaveforms,
        sampleRate: audioContext.sampleRate,
        durationInSeconds: wave.duration,
        numberOfChannels: wave.numberOfChannels,
        resultId: String(Math.random()),
        isRemote: (0, is_remote_asset_1.isRemoteAsset)(src),
    };
    metadataCache[src] = metadata;
    return metadata;
};
const getAudioData = (src) => {
    return limit(fn, src);
};
exports.getAudioData = getAudioData;
