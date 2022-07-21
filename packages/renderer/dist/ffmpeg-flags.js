"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFfmpegVersion = exports.parseFfmpegVersion = exports.ffmpegHasFeature = exports.getFfmpegBuildInfo = void 0;
const execa_1 = __importDefault(require("execa"));
const validate_ffmpeg_1 = require("./validate-ffmpeg");
let buildConfig = null;
const getFfmpegBuildInfo = async (options) => {
    var _a;
    if (buildConfig !== null) {
        return buildConfig;
    }
    const data = await (0, execa_1.default)((_a = options.ffmpegExecutable) !== null && _a !== void 0 ? _a : 'ffmpeg', ['-buildconf'], {
        reject: false,
    });
    buildConfig = data.stderr;
    return buildConfig;
};
exports.getFfmpegBuildInfo = getFfmpegBuildInfo;
const ffmpegHasFeature = async ({ ffmpegExecutable, feature, isLambda, }) => {
    if (isLambda) {
        // When rendering in the cloud, we don't need a local binary
        return true;
    }
    if (!(await (0, validate_ffmpeg_1.binaryExists)('ffmpeg', ffmpegExecutable))) {
        return false;
    }
    const config = await (0, exports.getFfmpegBuildInfo)({ ffmpegExecutable });
    return config.includes(feature);
};
exports.ffmpegHasFeature = ffmpegHasFeature;
const parseFfmpegVersion = (buildconf) => {
    var _a;
    const match = buildconf.match(/ffmpeg version ([0-9]+).([0-9]+)(?:.([0-9]+))?/);
    if (!match) {
        return null;
    }
    return [Number(match[1]), Number(match[2]), Number((_a = match[3]) !== null && _a !== void 0 ? _a : 0)];
};
exports.parseFfmpegVersion = parseFfmpegVersion;
const getFfmpegVersion = async (options) => {
    const buildInfo = await (0, exports.getFfmpegBuildInfo)({
        ffmpegExecutable: options.ffmpegExecutable,
    });
    return (0, exports.parseFfmpegVersion)(buildInfo);
};
exports.getFfmpegVersion = getFfmpegVersion;
