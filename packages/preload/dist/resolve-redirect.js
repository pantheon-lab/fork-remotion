"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveRedirect = void 0;
const resolveRedirect = async (videoOrAudio) => {
    const res = await fetch(videoOrAudio);
    return res.url;
};
exports.resolveRedirect = resolveRedirect;
