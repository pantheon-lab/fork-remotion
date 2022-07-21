"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeAudioTrack = void 0;
const execa_1 = __importDefault(require("execa"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const chunk_1 = require("./chunk");
const convert_to_pcm_1 = require("./convert-to-pcm");
const create_ffmpeg_complex_filter_1 = require("./create-ffmpeg-complex-filter");
const create_silent_audio_1 = require("./create-silent-audio");
const delete_directory_1 = require("./delete-directory");
const p_limit_1 = require("./p-limit");
const tmp_dir_1 = require("./tmp-dir");
const mergeAudioTrackUnlimited = async ({ ffmpegExecutable, outName, files, numberOfSeconds, }) => {
    if (files.length === 0) {
        await (0, create_silent_audio_1.createSilentAudio)({
            outName,
            ffmpegExecutable,
            numberOfSeconds,
        });
        return;
    }
    if (files.length === 1) {
        await (0, convert_to_pcm_1.convertToPcm)({
            outName,
            ffmpegExecutable,
            input: files[0],
        });
        return;
    }
    // In FFMPEG, the total number of left and right tracks that can be merged at one time is limited to 64
    if (files.length >= 32) {
        const chunked = (0, chunk_1.chunk)(files, 10);
        const tempPath = (0, tmp_dir_1.tmpDir)('remotion-large-audio-mixing');
        const chunkNames = await Promise.all(chunked.map(async (chunkFiles, i) => {
            const chunkOutname = path_1.default.join(tempPath, `chunk-${i}.wav`);
            await (0, exports.mergeAudioTrack)({
                ffmpegExecutable,
                files: chunkFiles,
                numberOfSeconds,
                outName: chunkOutname,
            });
            return chunkOutname;
        }));
        await (0, exports.mergeAudioTrack)({
            ffmpegExecutable,
            files: chunkNames,
            numberOfSeconds,
            outName,
        });
        await (0, delete_directory_1.deleteDirectory)(tempPath);
        return;
    }
    const { complexFilterFlag: mergeFilter, cleanup } = await (0, create_ffmpeg_complex_filter_1.createFfmpegComplexFilter)(files.length);
    const args = [
        ...files.map((f) => ['-i', f]),
        mergeFilter,
        ['-c:a', 'pcm_s16le'],
        ['-map', '[a]'],
        ['-y', outName],
    ]
        .filter(remotion_1.Internals.truthy)
        .flat(2);
    const task = (0, execa_1.default)(ffmpegExecutable !== null && ffmpegExecutable !== void 0 ? ffmpegExecutable : 'ffmpeg', args);
    await task;
    cleanup();
};
const limit = (0, p_limit_1.pLimit)(2);
const mergeAudioTrack = (options) => {
    return limit(mergeAudioTrackUnlimited, options);
};
exports.mergeAudioTrack = mergeAudioTrack;
