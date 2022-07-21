"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const render_still_1 = require("../render-still");
(0, vitest_1.test)('Need to pass valid metadata', () => {
    return (0, vitest_1.expect)(() => (0, render_still_1.renderStill)({
        composition: {
            width: NaN,
            height: 1000,
            fps: 30,
            durationInFrames: 30,
            id: 'hithere',
            defaultProps: undefined,
        },
        frame: 0,
        output: '/file/output.png',
        serveUrl: 'https://silly-crostata-c4c336.netlify.app/',
    })).rejects.toThrow(/not be NaN, but is NaN/);
});
(0, vitest_1.test)('Need to pass valid metadata', () => {
    return (0, vitest_1.expect)(() => (0, render_still_1.renderStill)({
        composition: {
            width: 1000,
            height: 1000,
            fps: 30,
            durationInFrames: 30,
            id: 'hithere',
            defaultProps: undefined,
        },
        frame: 200,
        output: '/file/output.png',
        serveUrl: 'https://silly-crostata-c4c336.netlify.app/',
    })).rejects.toThrow(/Cannot use frame 200: Duration of composition is 30, therefore the highest frame that can be rendered is 29/);
});
(0, vitest_1.test)('Catches invalid image format', () => {
    return (0, vitest_1.expect)(() => (0, render_still_1.renderStill)({
        composition: {
            width: 1000,
            height: 1000,
            fps: 30,
            durationInFrames: 30,
            id: 'hithere',
            defaultProps: undefined,
        },
        // @ts-expect-error
        imageFormat: 'jjj',
        frame: 200,
        output: '/file/output.png',
        serveUrl: 'https://silly-crostata-c4c336.netlify.app/',
    })).rejects.toThrow(/Image format should be either "png" or "jpeg"/);
});
