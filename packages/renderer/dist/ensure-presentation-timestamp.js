"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensurePresentationTimestamps = void 0;
const execa_1 = __importDefault(require("execa"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const guess_extension_for_media_1 = require("./guess-extension-for-media");
const ensureFileHasPresentationTimestamp = {};
let callbacks = [];
const getTemporaryOutputName = async (src) => {
    const parts = src.split(path_1.default.sep);
    // If there is no file extension for the video, then we need to temporarily add an extension
    const lastPart = parts[parts.length - 1];
    const extraExtension = lastPart.includes('.')
        ? null
        : await (0, guess_extension_for_media_1.guessExtensionForVideo)(src);
    return parts
        .map((p, i) => {
        if (i === parts.length - 1) {
            return [`pts-${p}`, extraExtension].filter(remotion_1.Internals.truthy).join('.');
        }
        return p;
    })
        .join(path_1.default.sep);
};
const ensurePresentationTimestamps = async (src) => {
    const elem = ensureFileHasPresentationTimestamp[src];
    if ((elem === null || elem === void 0 ? void 0 : elem.type) === 'encoding') {
        return new Promise((resolve) => {
            callbacks.push({
                src,
                fn: (newSrc) => resolve(newSrc),
            });
        });
    }
    if ((elem === null || elem === void 0 ? void 0 : elem.type) === 'done') {
        return elem.src;
    }
    ensureFileHasPresentationTimestamp[src] = { type: 'encoding' };
    // If there is no file extension for the video, then we need to tempoa
    const output = await getTemporaryOutputName(src);
    await (0, execa_1.default)('ffmpeg', [
        '-i',
        src,
        '-fflags',
        '+genpts+igndts',
        '-vcodec',
        'copy',
        '-acodec',
        'copy',
        output,
        '-y',
    ]);
    callbacks = callbacks.filter((c) => {
        if (c.src === src) {
            c.fn(output);
            return false;
        }
        return true;
    });
    ensureFileHasPresentationTimestamp[src] = { type: 'done', src: output };
    return output;
};
exports.ensurePresentationTimestamps = ensurePresentationTimestamps;
