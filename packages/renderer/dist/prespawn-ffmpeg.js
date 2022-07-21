"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prespawnFfmpeg = void 0;
const execa_1 = __importDefault(require("execa"));
const remotion_1 = require("remotion");
const get_codec_name_1 = require("./get-codec-name");
const get_prores_profile_name_1 = require("./get-prores-profile-name");
const parse_ffmpeg_progress_1 = require("./parse-ffmpeg-progress");
const validate_even_dimensions_with_codec_1 = require("./validate-even-dimensions-with-codec");
const validate_ffmpeg_1 = require("./validate-ffmpeg");
const prespawnFfmpeg = async (options) => {
    var _a, _b, _c, _d, _e, _f, _g;
    remotion_1.Internals.validateDimension(options.height, 'height', 'passed to `stitchFramesToVideo()`');
    remotion_1.Internals.validateDimension(options.width, 'width', 'passed to `stitchFramesToVideo()`');
    const codec = (_a = options.codec) !== null && _a !== void 0 ? _a : remotion_1.Internals.DEFAULT_CODEC;
    remotion_1.Internals.validateFps(options.fps, 'in `stitchFramesToVideo()`', codec);
    (0, validate_even_dimensions_with_codec_1.validateEvenDimensionsWithCodec)({
        width: options.width,
        height: options.height,
        codec,
        scale: 1,
    });
    const crf = (_b = options.crf) !== null && _b !== void 0 ? _b : remotion_1.Internals.getDefaultCrfForCodec(codec);
    const pixelFormat = (_c = options.pixelFormat) !== null && _c !== void 0 ? _c : remotion_1.Internals.DEFAULT_PIXEL_FORMAT;
    await (0, validate_ffmpeg_1.validateFfmpeg)((_d = options.ffmpegExecutable) !== null && _d !== void 0 ? _d : null);
    const encoderName = (0, get_codec_name_1.getCodecName)(codec);
    const proResProfileName = (0, get_prores_profile_name_1.getProResProfileName)(codec, options.proResProfile);
    if (encoderName === null) {
        throw new TypeError('encoderName is null: ' + JSON.stringify(options));
    }
    const supportsCrf = codec !== 'prores';
    if (options.verbose) {
        console.log('[verbose] ffmpeg', (_e = options.ffmpegExecutable) !== null && _e !== void 0 ? _e : 'ffmpeg in PATH');
        console.log('[verbose] encoder', encoderName);
        console.log('[verbose] pixelFormat', pixelFormat);
        if (supportsCrf) {
            console.log('[verbose] crf', crf);
        }
        console.log('[verbose] codec', codec);
        console.log('[verbose] proResProfileName', proResProfileName);
    }
    remotion_1.Internals.validateSelectedCrfAndCodecCombination(crf, codec);
    remotion_1.Internals.validateSelectedPixelFormatAndCodecCombination(pixelFormat, codec);
    const ffmpegArgs = [
        ['-r', options.fps.toFixed(2)],
        ...[
            ['-f', 'image2pipe'],
            ['-s', `${options.width}x${options.height}`],
            // If scale is very small (like 0.1), FFMPEG cannot figure out the image
            // format on it's own and we need to hint the format
            ['-vcodec', options.imageFormat === 'jpeg' ? 'mjpeg' : 'png'],
            ['-i', '-'],
        ],
        // -c:v is the same as -vcodec as -codec:video
        // and specified the video codec.
        ['-c:v', encoderName],
        proResProfileName ? ['-profile:v', proResProfileName] : null,
        supportsCrf ? ['-crf', String(crf)] : null,
        ['-pix_fmt', pixelFormat],
        // Without explicitly disabling auto-alt-ref,
        // transparent WebM generation doesn't work
        pixelFormat === 'yuva420p' ? ['-auto-alt-ref', '0'] : null,
        ['-b:v', '1M'],
        '-y',
        options.outputLocation,
    ];
    if (options.verbose) {
        console.log('Generated FFMPEG command:');
        console.log(ffmpegArgs);
    }
    const ffmpegString = ffmpegArgs.flat(2).filter(Boolean);
    const task = (0, execa_1.default)((_f = options.ffmpegExecutable) !== null && _f !== void 0 ? _f : 'ffmpeg', ffmpegString);
    options.signal(() => {
        task.kill();
    });
    let ffmpegOutput = '';
    (_g = task.stderr) === null || _g === void 0 ? void 0 : _g.on('data', (data) => {
        const str = data.toString();
        ffmpegOutput += str;
        if (options.onProgress) {
            const parsed = (0, parse_ffmpeg_progress_1.parseFfmpegProgress)(str);
            if (parsed !== undefined) {
                options.onProgress(parsed);
            }
        }
    });
    return { task, getLogs: () => ffmpegOutput };
};
exports.prespawnFfmpeg = prespawnFfmpeg;
