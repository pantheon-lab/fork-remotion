"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMaxRetries = void 0;
function validateMaxRetries(maxRetries) {
    if (typeof maxRetries !== 'number') {
        throw new TypeError('maxRetries must be a number, but is ' + JSON.stringify(maxRetries));
    }
    if (!Number.isFinite(maxRetries)) {
        throw new TypeError('maxRetries must be finite, but is ' + maxRetries);
    }
    if (Number.isNaN(maxRetries)) {
        throw new TypeError('maxRetries is NaN');
    }
    if (maxRetries < 0) {
        throw new TypeError(`maxRetries cannot be negative but is ${maxRetries}`);
    }
    if (maxRetries % 1 !== 0) {
        throw new TypeError(`maxRetries should be an integer, but is ${maxRetries}.`);
    }
}
exports.validateMaxRetries = validateMaxRetries;
