"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const is_serve_url_1 = require("../is-serve-url");
(0, vitest_1.test)("Should detect correctly whether it's a webpack URL or serve URL", () => {
    (0, vitest_1.expect)((0, is_serve_url_1.isServeUrl)('/tmp/rendering/index.html')).toBe(false);
    (0, vitest_1.expect)((0, is_serve_url_1.isServeUrl)('www.google.com')).toBe(true);
});
