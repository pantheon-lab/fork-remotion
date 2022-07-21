"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLambdaTimingsKey = void 0;
const parseLambdaTimingsKey = (key) => {
    const match = key.match(/^renders\/(.*)\/lambda-timings\/chunk:([0-9]+)-start:([0-9]+)-rendered:([0-9]+).txt$/);
    if (!match) {
        throw new Error(`Cannot parse filename ${key} into timing information. Malformed data.`);
    }
    return {
        renderId: match[1],
        chunk: Number(match[2]),
        start: Number(match[3]),
        rendered: Number(match[4]),
    };
};
exports.parseLambdaTimingsKey = parseLambdaTimingsKey;
