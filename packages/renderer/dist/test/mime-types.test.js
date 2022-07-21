"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const mime_types_1 = require("../mime-types");
(0, vitest_1.test)('Should get mime types', () => {
    (0, vitest_1.expect)((0, mime_types_1.mimeLookup)('hi.png')).toBe('image/png');
    (0, vitest_1.expect)((0, mime_types_1.mimeLookup)('hi.svg')).toBe('image/svg+xml');
});
