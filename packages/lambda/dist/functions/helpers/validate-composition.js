"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateComposition = void 0;
const renderer_1 = require("@remotion/renderer");
const validateComposition = async ({ serveUrl, composition, browserInstance, inputProps, envVariables, timeoutInMilliseconds, ffmpegExecutable, ffprobeExecutable, chromiumOptions, port, }) => {
    const compositions = await (0, renderer_1.getCompositions)(serveUrl, {
        puppeteerInstance: browserInstance,
        inputProps: inputProps,
        envVariables,
        ffmpegExecutable,
        ffprobeExecutable,
        timeoutInMilliseconds,
        chromiumOptions,
        port,
    });
    const found = compositions.find((c) => c.id === composition);
    if (!found) {
        throw new Error(`No composition with ID ${composition} found. Available compositions: ${compositions
            .map((c) => c.id)
            .join(', ')}`);
    }
    return found;
};
exports.validateComposition = validateComposition;
