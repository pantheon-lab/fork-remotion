"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFrameFromVideo = exports.getLastFrameOfVideo = void 0;
const execa_1 = __importDefault(require("execa"));
const remotion_1 = require("remotion");
const get_audio_channels_1 = require("./assets/get-audio-channels");
const ensure_presentation_timestamp_1 = require("./ensure-presentation-timestamp");
const frame_to_ffmpeg_timestamp_1 = require("./frame-to-ffmpeg-timestamp");
const get_video_info_1 = require("./get-video-info");
const is_beyond_last_frame_1 = require("./is-beyond-last-frame");
const last_frame_from_video_cache_1 = require("./last-frame-from-video-cache");
const p_limit_1 = require("./p-limit");
const lastFrameLimit = (0, p_limit_1.pLimit)(1);
const mainLimit = (0, p_limit_1.pLimit)(5);
const determineVcodecFfmepgFlags = (vcodecFlag) => {
    return [
        vcodecFlag === 'vp9' ? '-vcodec' : null,
        vcodecFlag === 'vp9' ? 'libvpx-vp9' : null,
        vcodecFlag === 'vp8' ? '-vcodec' : null,
        vcodecFlag === 'vp8' ? 'libvpx' : null,
    ].filter(remotion_1.Internals.truthy);
};
const determineResizeParams = (needsResize) => {
    if (needsResize === null) {
        return [];
    }
    return ['-s', `${needsResize[0]}x${needsResize[1]}`];
};
// Uses no seeking, therefore the whole video has to be decoded. This is a last resort and should only happen
// if the video is corrupted
const getFrameOfVideoSlow = async ({ src, timestamp, ffmpegExecutable, imageFormat, specialVCodecForTransparency, needsResize, }) => {
    console.warn(`\nUsing a slow method to extract the frame at ${timestamp}ms of ${src}. See https://remotion.dev/docs/slow-method-to-extract-frame for advice`);
    const actualOffset = `-${timestamp * 1000}ms`;
    const command = [
        '-itsoffset',
        actualOffset,
        ...determineVcodecFfmepgFlags(specialVCodecForTransparency),
        '-i',
        src,
        '-frames:v',
        '1',
        '-c:v',
        imageFormat === 'jpeg' ? 'mjpeg' : 'png',
        '-f',
        'image2pipe',
        ...determineResizeParams(needsResize),
        '-',
    ].filter(remotion_1.Internals.truthy);
    const { stdout, stderr } = (0, execa_1.default)(ffmpegExecutable !== null && ffmpegExecutable !== void 0 ? ffmpegExecutable : 'ffmpeg', command);
    if (!stderr) {
        throw new Error('unexpectedly did not get stderr');
    }
    if (!stdout) {
        throw new Error('unexpectedly did not get stdout');
    }
    const stderrChunks = [];
    const stdoutChunks = [];
    const stdErrString = new Promise((resolve, reject) => {
        stderr.on('data', (d) => stderrChunks.push(d));
        stderr.on('error', (err) => reject(err));
        stderr.on('end', () => resolve(Buffer.concat(stderrChunks).toString('utf-8')));
    });
    const stdoutChunk = new Promise((resolve, reject) => {
        stdout.on('data', (d) => stdoutChunks.push(d));
        stdout.on('error', (err) => reject(err));
        stdout.on('end', () => resolve(Buffer.concat(stdoutChunks)));
    });
    const [stdErr, stdoutBuffer] = await Promise.all([stdErrString, stdoutChunk]);
    const isEmpty = stdErr.includes('Output file is empty');
    if (isEmpty) {
        throw new Error(`Could not get last frame of ${src}. Tried to seek to the end using the command "ffmpeg ${command.join(' ')}" but got no frame. Most likely this video is corrupted.`);
    }
    return stdoutBuffer;
};
const getLastFrameOfVideoFastUnlimited = async (options) => {
    const { ffmpegExecutable, ffprobeExecutable, offset, src } = options;
    const fromCache = (0, last_frame_from_video_cache_1.getLastFrameFromCache)({ ...options, offset: 0 });
    if (fromCache) {
        return fromCache;
    }
    const { duration } = await (0, get_audio_channels_1.getAudioChannelsAndDuration)(src, ffprobeExecutable);
    if (duration === null) {
        throw new Error(`Could not determine the duration of ${src} using FFMPEG. The file is not supported.`);
    }
    if (options.specialVCodecForTransparency === 'vp8' || offset > 40) {
        const last = await getFrameOfVideoSlow({
            timestamp: duration,
            ffmpegExecutable,
            src,
            imageFormat: options.imageFormat,
            specialVCodecForTransparency: options.specialVCodecForTransparency,
            needsResize: options.needsResize,
        });
        return last;
    }
    const actualOffset = `${duration * 1000 - offset - 10}ms`;
    const { stdout, stderr } = (0, execa_1.default)(ffmpegExecutable !== null && ffmpegExecutable !== void 0 ? ffmpegExecutable : 'ffmpeg', [
        '-ss',
        actualOffset,
        ...determineVcodecFfmepgFlags(options.specialVCodecForTransparency),
        '-i',
        src,
        '-frames:v',
        '1',
        '-c:v',
        options.imageFormat === 'jpeg' ? 'mjpeg' : 'png',
        '-f',
        'image2pipe',
        ...determineResizeParams(options.needsResize),
        '-',
    ].filter(remotion_1.Internals.truthy));
    if (!stderr) {
        throw new Error('unexpectedly did not get stderr');
    }
    if (!stdout) {
        throw new Error('unexpectedly did not get stdout');
    }
    const stderrChunks = [];
    const stdoutChunks = [];
    const stdErrString = new Promise((resolve, reject) => {
        stderr.on('data', (d) => stderrChunks.push(d));
        stderr.on('error', (err) => reject(err));
        stderr.on('end', () => resolve(Buffer.concat(stderrChunks).toString('utf-8')));
    });
    const stdoutChunk = new Promise((resolve, reject) => {
        stdout.on('data', (d) => {
            stdoutChunks.push(d);
        });
        stdout.on('error', (err) => {
            reject(err);
        });
        stdout.on('end', () => {
            resolve(Buffer.concat(stdoutChunks));
        });
    });
    const [stdErr, stdoutBuffer] = await Promise.all([stdErrString, stdoutChunk]);
    const isEmpty = stdErr.includes('Output file is empty');
    if (isEmpty) {
        const unlimited = await getLastFrameOfVideoFastUnlimited({
            ffmpegExecutable,
            offset: offset + 10,
            src,
            ffprobeExecutable,
            imageFormat: options.imageFormat,
            specialVCodecForTransparency: options.specialVCodecForTransparency,
            needsResize: options.needsResize,
        });
        return unlimited;
    }
    return stdoutBuffer;
};
const getLastFrameOfVideo = async (options) => {
    const result = await lastFrameLimit(getLastFrameOfVideoFastUnlimited, options);
    (0, last_frame_from_video_cache_1.setLastFrameInCache)(options, result);
    return result;
};
exports.getLastFrameOfVideo = getLastFrameOfVideo;
const extractFrameFromVideoFn = async ({ time, ffmpegExecutable, ffprobeExecutable, imageFormat, ...options }) => {
    // We make a new copy of the video only for video because the conversion may affect
    // audio rendering, so we work with 2 different files
    const src = await (0, ensure_presentation_timestamp_1.ensurePresentationTimestamps)(options.src);
    const { specialVcodec, needsResize } = await (0, get_video_info_1.getVideoInfo)(src, ffprobeExecutable);
    if (specialVcodec === 'vp8') {
        return getFrameOfVideoSlow({
            ffmpegExecutable,
            imageFormat,
            specialVCodecForTransparency: specialVcodec,
            src,
            timestamp: time,
            needsResize,
        });
    }
    if ((0, is_beyond_last_frame_1.isBeyondLastFrame)(src, time)) {
        const lastFrame = await (0, exports.getLastFrameOfVideo)({
            ffmpegExecutable,
            ffprobeExecutable,
            offset: 0,
            src,
            imageFormat,
            specialVCodecForTransparency: specialVcodec,
            needsResize,
        });
        return lastFrame;
    }
    const ffmpegTimestamp = (0, frame_to_ffmpeg_timestamp_1.frameToFfmpegTimestamp)(time);
    const { stdout, stderr } = (0, execa_1.default)(ffmpegExecutable !== null && ffmpegExecutable !== void 0 ? ffmpegExecutable : 'ffmpeg', [
        '-ss',
        ffmpegTimestamp,
        ...determineVcodecFfmepgFlags(specialVcodec),
        '-i',
        src,
        '-frames:v',
        '1',
        '-f',
        'image2pipe',
        '-vcodec',
        imageFormat === 'jpeg' ? 'mjpeg' : 'png',
        ...determineResizeParams(needsResize),
        '-',
    ].filter(remotion_1.Internals.truthy), {
        buffer: false,
    });
    if (!stderr) {
        throw new Error('unexpectedly did not get stderr');
    }
    if (!stdout) {
        throw new Error('unexpectedly did not get stdout');
    }
    const stdoutChunks = [];
    const stderrChunks = [];
    const stderrStringProm = new Promise((resolve, reject) => {
        stderr.on('data', (d) => stderrChunks.push(d));
        stderr.on('error', (err) => reject(err));
        stderr.on('end', () => resolve(Buffer.concat(stderrChunks).toString('utf8')));
    });
    const stdoutBuffer = new Promise((resolve, reject) => {
        stdout.on('data', (d) => stdoutChunks.push(d));
        stdout.on('error', (err) => reject(err));
        stdout.on('end', () => resolve(Buffer.concat(stdoutChunks)));
    });
    const [stderrStr, stdOut] = await Promise.all([
        stderrStringProm,
        stdoutBuffer,
    ]);
    if (stderrStr.includes('Output file is empty')) {
        (0, is_beyond_last_frame_1.markAsBeyondLastFrame)(src, time);
        const last = await (0, exports.getLastFrameOfVideo)({
            ffmpegExecutable,
            ffprobeExecutable,
            offset: 0,
            src,
            imageFormat,
            specialVCodecForTransparency: specialVcodec,
            needsResize,
        });
        return last;
    }
    return stdOut;
};
const extractFrameFromVideo = async (options) => {
    const perf = remotion_1.Internals.perf.startPerfMeasure('extract-frame');
    const res = await mainLimit(extractFrameFromVideoFn, options);
    remotion_1.Internals.perf.stopPerfMeasure(perf);
    return res;
};
exports.extractFrameFromVideo = extractFrameFromVideo;
