"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinalEncodingStatus = void 0;
const getFinalEncodingStatus = ({ encodingStatus: encodingProgress, renderMetadata, outputFileExists, lambdaInvokeStatus, }) => {
    if (!renderMetadata) {
        return null;
    }
    if (encodingProgress) {
        return encodingProgress;
    }
    if (outputFileExists) {
        return {
            framesEncoded: renderMetadata.videoConfig.durationInFrames,
            totalFrames: renderMetadata.videoConfig.durationInFrames,
            doneIn: null,
            timeToInvoke: lambdaInvokeStatus.timeToInvokeLambdas,
        };
    }
    return null;
};
exports.getFinalEncodingStatus = getFinalEncodingStatus;
