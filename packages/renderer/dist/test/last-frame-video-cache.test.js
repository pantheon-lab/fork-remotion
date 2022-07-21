"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const vitest_1 = require("vitest");
const last_frame_from_video_cache_1 = require("../last-frame-from-video-cache");
const makeKey = (id) => {
    return {
        ffmpegExecutable: null,
        ffprobeExecutable: null,
        offset: 10,
        src: id,
        imageFormat: 'jpeg',
        specialVCodecForTransparency: 'none',
        needsResize: null,
    };
};
(0, vitest_1.test)('Last frame video cache', () => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    (0, vitest_1.expect)((0, last_frame_from_video_cache_1.getLastFrameFromCache)(makeKey('1'))).toBe(null);
    const buf = crypto_1.default.randomBytes(10 * 1024 * 1024);
    (0, last_frame_from_video_cache_1.setLastFrameInCache)(makeKey('1'), buf);
    (0, vitest_1.expect)((_a = (0, last_frame_from_video_cache_1.getLastFrameFromCache)(makeKey('1'))) === null || _a === void 0 ? void 0 : _a.byteLength).toBe(10 * 1024 * 1024);
    (0, last_frame_from_video_cache_1.setLastFrameInCache)(makeKey('2'), buf);
    (0, last_frame_from_video_cache_1.setLastFrameInCache)(makeKey('3'), buf);
    (0, last_frame_from_video_cache_1.setLastFrameInCache)(makeKey('4'), buf);
    (0, last_frame_from_video_cache_1.setLastFrameInCache)(makeKey('5'), buf);
    (0, last_frame_from_video_cache_1.setLastFrameInCache)(makeKey('6'), buf);
    (0, vitest_1.expect)((_c = (_b = (0, last_frame_from_video_cache_1.getLastFrameFromCache)(makeKey('1'))) === null || _b === void 0 ? void 0 : _b.byteLength) !== null && _c !== void 0 ? _c : 0).toBe(0);
    (0, vitest_1.expect)((_d = (0, last_frame_from_video_cache_1.getLastFrameFromCache)(makeKey('2'))) === null || _d === void 0 ? void 0 : _d.byteLength).toBe(10 * 1024 * 1024);
    (0, vitest_1.expect)((_e = (0, last_frame_from_video_cache_1.getLastFrameFromCache)(makeKey('3'))) === null || _e === void 0 ? void 0 : _e.byteLength).toBe(10 * 1024 * 1024);
    (0, vitest_1.expect)((_f = (0, last_frame_from_video_cache_1.getLastFrameFromCache)(makeKey('4'))) === null || _f === void 0 ? void 0 : _f.byteLength).toBe(10 * 1024 * 1024);
    (0, vitest_1.expect)((_g = (0, last_frame_from_video_cache_1.getLastFrameFromCache)(makeKey('5'))) === null || _g === void 0 ? void 0 : _g.byteLength).toBe(10 * 1024 * 1024);
    (0, vitest_1.expect)((_h = (0, last_frame_from_video_cache_1.getLastFrameFromCache)(makeKey('6'))) === null || _h === void 0 ? void 0 : _h.byteLength).toBe(10 * 1024 * 1024);
    (0, last_frame_from_video_cache_1.clearLastFileCache)();
});
