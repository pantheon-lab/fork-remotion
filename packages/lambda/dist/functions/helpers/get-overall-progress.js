"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverallProgress = void 0;
const weights = {
    cleanup: 0.1,
    encoding: 0.3,
    rendering: 0.3,
    invoking: 0.3,
};
const getOverallProgress = ({ cleanup, encoding, rendering, invoking, }) => {
    return (cleanup * weights.cleanup +
        encoding * weights.encoding +
        rendering * weights.rendering +
        invoking * weights.invoking);
};
exports.getOverallProgress = getOverallProgress;
