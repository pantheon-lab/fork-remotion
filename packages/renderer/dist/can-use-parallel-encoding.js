"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUseParallelEncoding = void 0;
const remotion_1 = require("remotion");
const canUseParallelEncoding = (codec) => {
    if (remotion_1.Internals.isAudioCodec(codec)) {
        return false;
    }
    return codec === 'h264' || codec === 'h264-mkv' || codec === 'h265';
};
exports.canUseParallelEncoding = canUseParallelEncoding;
