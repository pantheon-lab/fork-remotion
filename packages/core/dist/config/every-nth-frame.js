"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndValidateEveryNthFrame = exports.setEveryNthFrame = void 0;
const validate_every_nth_frame_1 = require("../validation/validate-every-nth-frame");
let everyNthFrame = 1;
const setEveryNthFrame = (frame) => {
    (0, validate_every_nth_frame_1.validateEveryNthFrame)(frame);
    everyNthFrame = frame;
};
exports.setEveryNthFrame = setEveryNthFrame;
const getAndValidateEveryNthFrame = (codec) => {
    if (everyNthFrame === 1) {
        return everyNthFrame;
    }
    if (codec !== 'gif') {
        throw new Error(`"everyNthFrame" can only be set if "codec" is set to "gif". The codec is "${codec}"`);
    }
    return everyNthFrame;
};
exports.getAndValidateEveryNthFrame = getAndValidateEveryNthFrame;
