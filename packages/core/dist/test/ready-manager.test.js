"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @vitest-environment jsdom
 */
const vitest_1 = require("vitest");
const delay_render_1 = require("../delay-render");
(0, vitest_1.describe)('Ready Manager tests', () => {
    let handle;
    (0, vitest_1.test)('delayRender sets window.ready to false', () => {
        window.ready = true;
        handle = (0, delay_render_1.delayRender)();
        (0, vitest_1.expect)(typeof handle).toBe('number');
        (0, vitest_1.expect)(window.ready).toBe(false);
    });
    (0, vitest_1.test)('continueRender sets window.ready to true', () => {
        (0, delay_render_1.continueRender)(handle);
        (0, vitest_1.expect)(window.ready).toBe(true);
    });
    (0, vitest_1.test)('Render is only continued if all handles have been finished', () => {
        handle = (0, delay_render_1.delayRender)();
        const handle2 = (0, delay_render_1.delayRender)();
        (0, vitest_1.expect)(window.ready).toBe(false);
        (0, delay_render_1.continueRender)(handle);
        (0, vitest_1.expect)(window.ready).toBe(false);
        (0, delay_render_1.continueRender)(handle2);
        (0, vitest_1.expect)(window.ready).toBe(true);
    });
});
