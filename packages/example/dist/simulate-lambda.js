"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bundler_1 = require("@remotion/bundler");
const renderer_1 = require("@remotion/renderer");
const path_1 = __importDefault(require("path"));
const webpack_override_1 = require("./webpack-override");
const start = async () => {
    const bundled = await (0, bundler_1.bundle)('./src/index.tsx', () => undefined, {
        webpackOverride: webpack_override_1.webpackOverride,
    });
    const comps = await (0, renderer_1.getCompositions)(bundled);
    const filelistDir = renderer_1.RenderInternals.tmpDir('remotion-file-lists');
    const dur = 600;
    const framesPerLambda = 24;
    console.log(filelistDir);
    for (let i = 0; i < dur / framesPerLambda; i++) {
        await (0, renderer_1.renderMedia)({
            codec: 'h264',
            composition: comps.find((c) => c.id === 'remote-video'),
            outputLocation: path_1.default.join(filelistDir, 'out/there' + i + '.mkv'),
            serveUrl: bundled,
            frameRange: [i * framesPerLambda, (i + 1) * framesPerLambda - 1],
            parallelism: 1,
            numberOfGifLoops: null,
            everyNthFrame: 1,
        });
        console.log({ i });
    }
    await (0, renderer_1.combineVideos)({
        codec: 'h264',
        filelistDir,
        files: new Array(dur / framesPerLambda).fill(true).map((_, i) => {
            return path_1.default.join(filelistDir, 'out/there' + i + '.mkv');
        }),
        fps: 30,
        numberOfFrames: dur,
        onProgress: () => console.log('progress'),
        output: 'out/combined.mp4',
        numberOfGifLoops: null,
    });
};
start();
