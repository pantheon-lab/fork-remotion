"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("@remotion/renderer");
const defaults_1 = require("../../../defaults");
const functions_1 = require("../../../functions");
const io_1 = require("../../../functions/helpers/io");
const disable_logs_1 = require("../../disable-logs");
jest.setTimeout(90000);
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
test('Should be able to render to another bucket', async () => {
    process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE = '2048';
    const res = await (0, functions_1.handler)({
        type: defaults_1.LambdaRoutines.start,
        serveUrl: 'https://6297949544e290044cecb257--cute-kitsune-214ea5.netlify.app/',
        chromiumOptions: {},
        codec: 'h264',
        composition: 'react-svg',
        crf: 9,
        envVariables: {},
        frameRange: [0, 12],
        framesPerLambda: 8,
        imageFormat: 'png',
        inputProps: {},
        logLevel: 'warn',
        maxRetries: 3,
        outName: {
            bucketName: 'my-other-bucket',
            key: 'my-key',
        },
        pixelFormat: 'yuv420p',
        privacy: 'public',
        proResProfile: undefined,
        quality: undefined,
        scale: 1,
        timeoutInMilliseconds: 12000,
        numberOfGifLoops: null,
        everyNthFrame: 1,
        concurrencyPerLambda: 1,
        downloadBehavior: {
            type: 'play-in-browser',
        },
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
    const probe = await renderer_1.RenderInternals.execa('ffprobe', ['-'], {
        stdin: file,
    });
    expect(probe.stderr).toMatch(/Stream #0:0/);
    expect(probe.stderr).toMatch(/Video: h264/);
    expect(probe.stderr).toMatch(/Stream #0:1/);
    expect(probe.stderr).toMatch(/Audio: aac/);
});
