"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const sanitize_filepath_1 = require("../assets/sanitize-filepath");
(0, vitest_1.test)('sanitizeFilePath linux', () => {
    if (process.platform === 'win32') {
        return;
    }
    (0, vitest_1.expect)((0, sanitize_filepath_1.sanitizeFilePath)('/path/to/path')).toBe('/path/to/path');
    (0, vitest_1.expect)((0, sanitize_filepath_1.sanitizeFilePath)('\\path\\to\\path')).toBe('/path/to/path');
});
(0, vitest_1.test)('sanitizeFilePath windows', () => {
    if (process.platform !== 'win32') {
        return;
    }
    (0, vitest_1.expect)((0, sanitize_filepath_1.sanitizeFilePath)('/path/to/path')).toBe('\\path\\to\\path');
});
