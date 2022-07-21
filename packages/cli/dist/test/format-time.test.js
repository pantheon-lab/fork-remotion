"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const render_frame_1 = require("../editor/state/render-frame");
(0, vitest_1.test)('Format time', () => {
    (0, vitest_1.expect)((0, render_frame_1.renderFrame)(152, 30)).toBe('00:05.02');
    (0, vitest_1.expect)((0, render_frame_1.renderFrame)(300, 30)).toBe('00:10.00');
    (0, vitest_1.expect)((0, render_frame_1.renderFrame)(30000, 30)).toBe('16:40.00');
    (0, vitest_1.expect)((0, render_frame_1.renderFrame)(300000, 30)).toBe('2:46:40.00');
});
