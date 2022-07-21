"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const normalize_serve_url_1 = require("../normalize-serve-url");
(0, vitest_1.test)('normalizeServeUrl', () => {
    (0, vitest_1.expect)((0, normalize_serve_url_1.normalizeServeUrl)('https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing?somequery')).toBe('https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing/index.html');
    (0, vitest_1.expect)((0, normalize_serve_url_1.normalizeServeUrl)('https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing/index.html')).toBe('https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing/index.html');
    (0, vitest_1.expect)((0, normalize_serve_url_1.normalizeServeUrl)('https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing')).toBe('https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing/index.html');
    (0, vitest_1.expect)((0, normalize_serve_url_1.normalizeServeUrl)('https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing/?hi=there')).toBe('https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing/index.html');
});
