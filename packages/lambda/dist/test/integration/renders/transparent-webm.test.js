"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("@remotion/renderer");
const fs_1 = __importStar(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
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
test('Should make a transparent video', async () => {
    process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE = '2048';
    const res = await (0, functions_1.handler)({
        type: defaults_1.LambdaRoutines.start,
        serveUrl: 'https://6297949544e290044cecb257--cute-kitsune-214ea5.netlify.app/',
        chromiumOptions: {},
        codec: 'vp8',
        composition: 'ten-frame-tester',
        crf: 9,
        envVariables: {},
        frameRange: [0, 9],
        framesPerLambda: 5,
        imageFormat: 'png',
        inputProps: {},
        logLevel: 'warn',
        maxRetries: 3,
        outName: 'out.mp4',
        pixelFormat: 'yuva420p',
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
        bucketName: startRes.bucketName,
        key: progress.outKey,
        expectedBucketOwner: 'abc',
        region: 'eu-central-1',
    });
    // We create a temporary directory for storing the frames
    const out = path_1.default.join(await fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'remotion-')), 'hithere.webm');
    file.pipe((0, fs_1.createWriteStream)(out));
    await new Promise((resolve) => {
        file.on('close', () => resolve());
    });
    const probe = await renderer_1.RenderInternals.execa('ffprobe', [out]);
    expect(probe.stderr).toMatch(/ALPHA_MODE(\s+): 1/);
    expect(probe.stderr).toMatch(/Video: vp8, yuv420p/);
    expect(probe.stderr).toMatch(/Audio: opus, 48000 Hz/);
    fs_1.default.unlinkSync(out);
});
