"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostExpensiveChunks = exports.OVERHEAD_TIME_PER_LAMBDA = void 0;
exports.OVERHEAD_TIME_PER_LAMBDA = 100;
const getMostExpensiveChunks = (parsedTimings, framesPerLambda) => {
    const mostExpensiveChunks = parsedTimings
        .slice(0)
        .sort((a, b) => {
        const durA = a.rendered - a.start;
        const durB = b.rendered - b.start;
        return durB - durA;
    })
        .slice(0, 5);
    return mostExpensiveChunks.map((c) => {
        return {
            timeInMilliseconds: c.rendered - c.start,
            chunk: c.chunk,
            frameRange: [
                framesPerLambda * c.chunk,
                framesPerLambda * (c.chunk + 1) - 1,
            ],
        };
    });
};
exports.getMostExpensiveChunks = getMostExpensiveChunks;
