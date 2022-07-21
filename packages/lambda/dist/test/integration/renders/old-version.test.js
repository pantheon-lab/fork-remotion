"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("@remotion/renderer");
const defaults_1 = require("../../../defaults");
const functions_1 = require("../../../functions");
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
        serveUrl: 'https://competent-mccarthy-56f7c9.netlify.app/',
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
        outName: null,
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
    expect(progress.errors[0].stack).toContain('Incompatible site: When visiting');
});
