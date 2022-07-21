"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployProgressBar = exports.makeBucketProgress = exports.makeBundleProgress = void 0;
const cli_1 = require("@remotion/cli");
const remotion_1 = require("remotion");
const makeBundleProgress = ({ progress, doneIn }) => {
    return [
        '📦',
        `(1/3)`,
        cli_1.CliInternals.makeProgressBar(progress / 100),
        `${doneIn === null ? 'Bundling' : 'Bundled'} video`,
        doneIn === null
            ? `${Math.round(progress)}%`
            : cli_1.CliInternals.chalk.gray(`${doneIn}ms`),
    ].join(' ');
};
exports.makeBundleProgress = makeBundleProgress;
const makeBucketProgress = ({ bucketCreated, websiteEnabled, doneIn, }) => {
    const states = [bucketCreated, websiteEnabled];
    const statesFinished = states.filter(Boolean).map((p) => p).length;
    const progress = statesFinished / states.length;
    return [
        '🪣 ',
        `(2/3)`,
        cli_1.CliInternals.makeProgressBar(progress),
        `${doneIn === null ? 'Creating' : 'Created'} bucket`,
        doneIn === null
            ? `${statesFinished} / ${states.length}`
            : cli_1.CliInternals.chalk.gray(`${doneIn}ms`),
    ].join(' ');
};
exports.makeBucketProgress = makeBucketProgress;
const makeDeployProgressBar = ({ sizeUploaded, totalSize, doneIn, }) => {
    const progress = totalSize === null ? 0 : sizeUploaded / totalSize;
    return [
        '☁️ ',
        `(3/3)`,
        cli_1.CliInternals.makeProgressBar(progress),
        `${doneIn === null ? 'Uploading' : 'Uploaded'} to S3`,
        doneIn === null
            ? typeof totalSize === 'number'
                ? `${cli_1.CliInternals.formatBytes(sizeUploaded)}/${cli_1.CliInternals.formatBytes(totalSize)}`
                : ''
            : cli_1.CliInternals.chalk.gray(`${doneIn}ms`),
    ]
        .filter(remotion_1.Internals.truthy)
        .join(' ');
};
exports.makeDeployProgressBar = makeDeployProgressBar;
