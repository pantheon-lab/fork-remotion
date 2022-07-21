"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRenderingAndStitchingProgress = exports.makeStitchingProgress = exports.makeRenderingProgress = exports.makeBundlingProgress = exports.createOverwriteableCliOutput = exports.createProgressBar = void 0;
const renderer_1 = require("@remotion/renderer");
const remotion_1 = require("remotion");
const ansi_diff_1 = require("./ansi/ansi-diff");
const chalk_1 = require("./chalk");
const download_progress_1 = require("./download-progress");
const make_progress_bar_1 = require("./make-progress-bar");
const createProgressBar = (quiet) => {
    if (!remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'info')) {
        return { update: () => false };
    }
    return (0, exports.createOverwriteableCliOutput)(quiet);
};
exports.createProgressBar = createProgressBar;
const createOverwriteableCliOutput = (quiet) => {
    if (quiet) {
        return {
            update: () => false,
        };
    }
    const diff = new ansi_diff_1.AnsiDiff();
    return {
        update: (up) => process.stdout.write(diff.update(up)),
    };
};
exports.createOverwriteableCliOutput = createOverwriteableCliOutput;
const makeBundlingProgress = ({ progress, steps, doneIn, }) => [
    `(${steps.indexOf('bundling') + 1}/${steps.length})`,
    (0, make_progress_bar_1.makeProgressBar)(progress),
    `${doneIn ? 'Bundled' : 'Bundling'} code`,
    doneIn === null
        ? (progress * 100).toFixed(0) + '%'
        : chalk_1.chalk.gray(`${doneIn}ms`),
].join(' ');
exports.makeBundlingProgress = makeBundlingProgress;
const makeRenderingProgress = ({ frames, totalFrames, steps, concurrency, doneIn, }) => {
    const progress = frames / totalFrames;
    return [
        `(${steps.indexOf('rendering') + 1}/${steps.length})`,
        (0, make_progress_bar_1.makeProgressBar)(progress),
        [doneIn ? 'Rendered' : 'Rendering', `frames (${concurrency}x)`]
            .filter(remotion_1.Internals.truthy)
            .join(' '),
        doneIn === null ? `${frames}/${totalFrames}` : chalk_1.chalk.gray(`${doneIn}ms`),
    ].join(' ');
};
exports.makeRenderingProgress = makeRenderingProgress;
const makeStitchingProgress = ({ frames, totalFrames, steps, doneIn, stage, codec, }) => {
    const progress = frames / totalFrames;
    return [
        `(${steps.indexOf('stitching') + 1}/${steps.length})`,
        (0, make_progress_bar_1.makeProgressBar)(progress),
        stage === 'muxing' && renderer_1.RenderInternals.canUseParallelEncoding(codec)
            ? `${doneIn ? 'Muxed' : 'Muxing'} audio`
            : `${doneIn ? 'Encoded' : 'Encoding'} ${codec === 'gif' ? 'GIF' : 'video'}`,
        doneIn === null ? `${frames}/${totalFrames}` : chalk_1.chalk.gray(`${doneIn}ms`),
    ].join(' ');
};
exports.makeStitchingProgress = makeStitchingProgress;
const makeRenderingAndStitchingProgress = ({ rendering, stitching, downloads, }) => {
    return [
        (0, exports.makeRenderingProgress)(rendering),
        (0, download_progress_1.makeMultiDownloadProgress)(downloads),
        stitching === null ? null : (0, exports.makeStitchingProgress)(stitching),
    ]
        .filter(remotion_1.Internals.truthy)
        .join('\n');
};
exports.makeRenderingAndStitchingProgress = makeRenderingAndStitchingProgress;
