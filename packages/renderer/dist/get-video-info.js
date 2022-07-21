"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoInfo = void 0;
const execa_1 = __importDefault(require("execa"));
const calculate_sar_dar_pixels_1 = require("./calculate-sar-dar-pixels");
const p_limit_1 = require("./p-limit");
const isVp9VideoCache = {};
const limit = (0, p_limit_1.pLimit)(1);
async function getVideoInfoUnlimited(src, ffprobeExecutable) {
    var _a;
    if (typeof isVp9VideoCache[src] !== 'undefined') {
        return isVp9VideoCache[src];
    }
    const task = await (0, execa_1.default)(ffprobeExecutable !== null && ffprobeExecutable !== void 0 ? ffprobeExecutable : 'ffprobe', [src]);
    const isVp9 = task.stderr.includes('Video: vp9');
    const isVp8 = task.stderr.includes('Video: vp8');
    const dimensions = (_a = task.stderr
        .split('\n')
        .find((n) => n.trim().startsWith('Stream #'))) === null || _a === void 0 ? void 0 : _a.match(/([0-9]{2,6})x([0-9]{2,6})/);
    const dar = task.stderr.match(/DAR\s([0-9]+):([0-9]+)/);
    let needsResize = null;
    if (dimensions && dar) {
        const width = parseInt(dimensions[1], 10);
        const height = parseInt(dimensions[2], 10);
        const darWidth = parseInt(dar[1], 10);
        const darHeight = parseInt(dar[2], 10);
        const { width: actualWidth, height: actualHeight } = (0, calculate_sar_dar_pixels_1.calculateDisplayVideoSize)({
            darX: darWidth,
            darY: darHeight,
            x: width,
            y: height,
        });
        if (actualWidth !== width || actualHeight !== height) {
            needsResize = [actualWidth, actualHeight];
        }
    }
    const result = {
        specialVcodec: isVp9 ? 'vp9' : isVp8 ? 'vp8' : 'none',
        needsResize,
    };
    isVp9VideoCache[src] = result;
    return isVp9VideoCache[src];
}
const getVideoInfo = (src, ffprobeExecutable) => {
    return limit(() => getVideoInfoUnlimited(src, ffprobeExecutable));
};
exports.getVideoInfo = getVideoInfo;
