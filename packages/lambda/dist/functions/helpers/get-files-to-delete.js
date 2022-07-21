"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesToDelete = void 0;
const constants_1 = require("../../shared/constants");
const getFilesToDelete = ({ chunkCount, renderId, }) => {
    const chunks = new Array(chunkCount).fill(true).map((_x, i) => (0, constants_1.chunkKeyForIndex)({
        index: i,
        renderId,
    }));
    const lambdaTimings = new Array(chunkCount)
        .fill(true)
        .map((_x, i) => (0, constants_1.lambdaTimingsPrefixForChunk)(renderId, i));
    return [
        {
            name: (0, constants_1.lambdaInitializedPrefix)(renderId),
            type: 'prefix',
        },
        ...chunks.map((i) => {
            return {
                name: i,
                type: 'exact',
            };
        }),
        ...lambdaTimings.map((i) => {
            return {
                name: i,
                type: 'prefix',
            };
        }),
        {
            name: (0, constants_1.encodingProgressKey)(renderId),
            type: 'exact',
        },
    ];
};
exports.getFilesToDelete = getFilesToDelete;
