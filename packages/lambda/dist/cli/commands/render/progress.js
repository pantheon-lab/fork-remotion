"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProgressString = exports.makeMultiProgressFromStatus = void 0;
const cli_1 = require("@remotion/cli");
const remotion_1 = require("remotion");
const makeInvokeProgress = (invokeProgress, totalSteps, retriesInfo) => {
    const { lambdasInvoked, totalLambdas, doneIn } = invokeProgress;
    const progress = doneIn
        ? 1
        : totalLambdas === null
            ? 0
            : lambdasInvoked / totalLambdas;
    return [
        '⚡️',
        `(1/${totalSteps})`,
        cli_1.CliInternals.makeProgressBar(progress),
        `${doneIn === null ? 'Invoking' : 'Invoked'} lambdas`,
        doneIn === null
            ? `${Math.round(progress * 100)}%`
            : cli_1.CliInternals.chalk.gray(`${doneIn}ms`),
        retriesInfo.length > 0 ? `(+${retriesInfo.length} retries)` : [],
    ].join(' ');
};
const makeChunkProgress = ({ chunkProgress, invokeProgress, totalSteps, }) => {
    const lambdaIsDone = invokeProgress.doneIn !== null;
    const { chunksInvoked, totalChunks, doneIn } = chunkProgress;
    const progress = totalChunks === null ? 0 : chunksInvoked / totalChunks;
    const shouldShow = lambdaIsDone || progress > 0;
    if (!shouldShow) {
        return '';
    }
    return [
        '🧩',
        `(2/${totalSteps})`,
        cli_1.CliInternals.makeProgressBar(progress),
        `${doneIn === null ? 'Rendering' : 'Rendered'} chunks`,
        doneIn === null
            ? `${Math.round(progress * 100)}%`
            : cli_1.CliInternals.chalk.gray(`${doneIn}ms`),
    ].join(' ');
};
const makeEncodingProgress = ({ encodingProgress, chunkProgress, totalSteps, }) => {
    const { framesEncoded, totalFrames, doneIn } = encodingProgress;
    const progress = totalFrames === null ? 0 : framesEncoded / totalFrames;
    const chunksDone = chunkProgress.doneIn !== null;
    const shouldShow = progress > 0 || chunksDone;
    if (!shouldShow) {
        return '';
    }
    return [
        '📽 ',
        `(3/${totalSteps})`,
        cli_1.CliInternals.makeProgressBar(progress),
        `${doneIn === null ? 'Combining' : 'Combined'} videos`,
        doneIn === null
            ? `${Math.round(progress * 100)}%`
            : cli_1.CliInternals.chalk.gray(`${doneIn}ms`),
    ].join(' ');
};
const makeCleanupProgress = (cleanupInfo, totalSteps) => {
    if (!cleanupInfo) {
        return '';
    }
    const { doneIn, filesDeleted, minFilesToDelete } = cleanupInfo;
    const progress = filesDeleted / minFilesToDelete;
    return [
        '🪣 ',
        `(4/${totalSteps})`,
        cli_1.CliInternals.makeProgressBar(progress),
        `${doneIn === null ? 'Cleaning up' : 'Cleaned up'} artifacts`,
        doneIn === null
            ? `${Math.round(progress * 100)}%`
            : cli_1.CliInternals.chalk.gray(`${doneIn}ms`),
    ].join(' ');
};
const makeDownloadProgress = (downloadInfo, totalSteps) => {
    return [
        '💾',
        `(5/${totalSteps})`,
        downloadInfo.totalSize === null
            ? cli_1.CliInternals.getFileSizeDownloadBar(downloadInfo.downloaded)
            : cli_1.CliInternals.makeProgressBar(downloadInfo.downloaded / downloadInfo.totalSize),
        `${downloadInfo.doneIn === null ? 'Downloading' : 'Downloaded'} video`,
        downloadInfo.doneIn === null
            ? [
                `${cli_1.CliInternals.formatBytes(downloadInfo.downloaded)}`,
                downloadInfo.totalSize === null
                    ? null
                    : `${cli_1.CliInternals.formatBytes(downloadInfo.totalSize)}`,
            ]
                .filter(remotion_1.Internals.truthy)
                .join('/')
            : cli_1.CliInternals.chalk.gray(`${downloadInfo.doneIn}ms`),
    ].join(' ');
};
const makeMultiProgressFromStatus = (status) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return {
        chunkProgress: {
            chunksInvoked: status.chunks,
            totalChunks: (_b = (_a = status.renderMetadata) === null || _a === void 0 ? void 0 : _a.totalChunks) !== null && _b !== void 0 ? _b : null,
            doneIn: status.timeToFinishChunks,
        },
        encodingProgress: {
            framesEncoded: (_d = (_c = status.encodingStatus) === null || _c === void 0 ? void 0 : _c.framesEncoded) !== null && _d !== void 0 ? _d : 0,
            totalFrames: (_f = (_e = status.renderMetadata) === null || _e === void 0 ? void 0 : _e.videoConfig.durationInFrames) !== null && _f !== void 0 ? _f : 1,
            doneIn: (_h = (_g = status.encodingStatus) === null || _g === void 0 ? void 0 : _g.doneIn) !== null && _h !== void 0 ? _h : null,
            timeToInvoke: (_k = (_j = status.encodingStatus) === null || _j === void 0 ? void 0 : _j.timeToInvoke) !== null && _k !== void 0 ? _k : null,
        },
        lambdaInvokeProgress: {
            doneIn: status.timeToInvokeLambdas,
            lambdasInvoked: status.lambdasInvoked,
            totalLambdas: (_m = (_l = status.renderMetadata) === null || _l === void 0 ? void 0 : _l.estimatedRenderLambdaInvokations) !== null && _m !== void 0 ? _m : null,
        },
        cleanupInfo: status.cleanup,
    };
};
exports.makeMultiProgressFromStatus = makeMultiProgressFromStatus;
const makeProgressString = ({ progress, steps, downloadInfo, retriesInfo, }) => {
    return [
        makeInvokeProgress(progress.lambdaInvokeProgress, steps, retriesInfo),
        makeChunkProgress({
            chunkProgress: progress.chunkProgress,
            invokeProgress: progress.lambdaInvokeProgress,
            totalSteps: steps,
        }),
        makeEncodingProgress({
            encodingProgress: progress.encodingProgress,
            chunkProgress: progress.chunkProgress,
            totalSteps: steps,
        }),
        makeCleanupProgress(progress.cleanupInfo, steps),
        downloadInfo ? makeDownloadProgress(downloadInfo, steps) : null,
    ]
        .filter(remotion_1.Internals.truthy)
        .join('\n');
};
exports.makeProgressString = makeProgressString;
