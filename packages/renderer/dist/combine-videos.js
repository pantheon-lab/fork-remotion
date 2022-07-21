"use strict";
// Combine multiple video chunks, useful for decentralized rendering
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineVideos = void 0;
const execa_1 = __importDefault(require("execa"));
const fs_1 = require("fs");
const path_1 = require("path");
const remotion_1 = require("remotion");
const get_audio_codec_name_1 = require("./get-audio-codec-name");
const parse_ffmpeg_progress_1 = require("./parse-ffmpeg-progress");
const combineVideos = async ({ files, filelistDir, output, onProgress, numberOfFrames, codec, fps, numberOfGifLoops, }) => {
    var _a;
    const fileList = files.map((p) => `file '${p}'`).join('\n');
    const fileListTxt = (0, path_1.join)(filelistDir, 'files.txt');
    (0, fs_1.writeFileSync)(fileListTxt, fileList);
    try {
        const task = (0, execa_1.default)('ffmpeg', [
            remotion_1.Internals.isAudioCodec(codec) ? null : '-r',
            remotion_1.Internals.isAudioCodec(codec) ? null : String(fps),
            '-f',
            'concat',
            '-safe',
            '0',
            '-i',
            fileListTxt,
            numberOfGifLoops === null ? null : '-loop',
            numberOfGifLoops === null
                ? null
                : typeof numberOfGifLoops === 'number'
                    ? String(numberOfGifLoops)
                    : '-1',
            remotion_1.Internals.isAudioCodec(codec) ? null : '-c:v',
            remotion_1.Internals.isAudioCodec(codec) ? null : codec === 'gif' ? 'gif' : 'copy',
            '-c:a',
            (0, get_audio_codec_name_1.getAudioCodecName)(codec),
            // Set max bitrate up to 1024kbps, will choose lower if that's too much
            '-b:a',
            '512K',
            codec === 'h264' ? '-movflags' : null,
            codec === 'h264' ? 'faststart' : null,
            '-shortest',
            '-y',
            output,
        ].filter(remotion_1.Internals.truthy));
        (_a = task.stderr) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            if (onProgress) {
                const parsed = (0, parse_ffmpeg_progress_1.parseFfmpegProgress)(data.toString());
                if (parsed !== undefined) {
                    onProgress(parsed);
                }
            }
        });
        await task;
        onProgress(numberOfFrames);
        (fs_1.rmSync !== null && fs_1.rmSync !== void 0 ? fs_1.rmSync : fs_1.rmdirSync)(filelistDir, { recursive: true });
    }
    catch (err) {
        (fs_1.rmSync !== null && fs_1.rmSync !== void 0 ? fs_1.rmSync : fs_1.rmdirSync)(filelistDir, { recursive: true });
        throw err;
    }
};
exports.combineVideos = combineVideos;
