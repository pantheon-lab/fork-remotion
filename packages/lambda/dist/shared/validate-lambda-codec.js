"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLambdaCodec = void 0;
const lambdaCodecs = [
    'h264-mkv',
    'h264',
    'vp8',
    'mp3',
    'aac',
    'wav',
    'gif',
];
const validateLambdaCodec = (codec) => {
    if (typeof codec !== 'string') {
        throw new TypeError('"codec" must be a string ');
    }
    if (!lambdaCodecs.includes(codec)) {
        throw new TypeError("'" +
            codec +
            "' is not a valid codec for Lambda. The following values are supported: " +
            lambdaCodecs.join(', '));
    }
    if (codec === 'h264-mkv') {
        console.warn('The "h264-mkv" codec for renderMediaOnLambda() is deprecated - it\'s now just "h264".');
        return 'h264';
    }
    return codec;
};
exports.validateLambdaCodec = validateLambdaCodec;
