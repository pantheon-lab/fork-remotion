"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("@remotion/renderer");
const fs_1 = require("fs");
const defaults_1 = require("../../../defaults");
const functions_1 = require("../../../functions");
const io_1 = require("../../../functions/helpers/io");
const disable_logs_1 = require("../../disable-logs");
jest.setTimeout(30000);
const extraContext = {
    invokedFunctionArn: 'arn:fake',
    getRemainingTimeInMillis: () => 12000,
};
beforeAll(() => {
    (0, disable_logs_1.disableLogs)();
});
afterAll(async () => {
    (0, disable_logs_1.enableLogs)();
    await renderer_1.RenderInternals.killAllBrowsers();
});
test('Should make a distributed GIF', async () => {
    process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE = '2048';
    const res = await (0, functions_1.handler)({
        type: defaults_1.LambdaRoutines.start,
        serveUrl: 'https://6297949544e290044cecb257--cute-kitsune-214ea5.netlify.app/',
        chromiumOptions: {},
        codec: 'gif',
        composition: 'framer',
        crf: 9,
        envVariables: {},
        // 61 frames, which is uneven, to challenge the frame planner
        frameRange: [0, 60],
        framesPerLambda: 8,
        imageFormat: 'png',
        inputProps: {},
        logLevel: 'warn',
        maxRetries: 3,
        outName: 'out.mp4',
        pixelFormat: 'yuv420p',
        privacy: 'public',
        proResProfile: undefined,
        quality: undefined,
        scale: 1,
        timeoutInMilliseconds: 12000,
        numberOfGifLoops: null,
        everyNthFrame: 2,
        concurrencyPerLambda: 1,
        downloadBehavior: { type: 'play-in-browser' },
    }, extraContext);
    const startRes = res;
    const progress = (await (0, functions_1.handler)({
        type: defaults_1.LambdaRoutines.status,
        bucketName: startRes.bucketName,
        renderId: startRes.renderId,
    }, extraContext));
    const file = await (0, io_1.lambdaReadFile)({
        bucketName: progress.outBucket,
        key: progress.outKey,
        expectedBucketOwner: 'abc',
        region: 'eu-central-1',
    });
    await new Promise((resolve) => {
        file.pipe((0, fs_1.createWriteStream)('gif.gif')).on('close', () => resolve());
    });
    const probe = await renderer_1.RenderInternals.execa('ffprobe', ['gif.gif']);
    expect(probe.stderr).toMatch(/Video: gif, bgra, 1080x1080/);
}, 90000);
