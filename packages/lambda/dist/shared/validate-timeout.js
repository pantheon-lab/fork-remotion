"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTimeout = void 0;
const constants_1 = require("./constants");
const validateTimeout = (timeoutInSeconds) => {
    if (typeof timeoutInSeconds !== 'number') {
        throw new TypeError(`parameter 'timeoutInSeconds' must be a number, but got a ${typeof timeoutInSeconds}`);
    }
    if (Number.isNaN(timeoutInSeconds)) {
        throw new TypeError(`parameter 'timeoutInSeconds' must not be NaN, but is`);
    }
    if (!Number.isFinite(timeoutInSeconds)) {
        throw new TypeError(`parameter 'timeoutInSeconds' must be finite, but is ${timeoutInSeconds}`);
    }
    if (timeoutInSeconds < constants_1.MIN_TIMEOUT || timeoutInSeconds > constants_1.MAX_TIMEOUT) {
        throw new TypeError(`parameter 'timeoutInSeconds' must be between ${constants_1.MIN_TIMEOUT} and ${constants_1.MAX_TIMEOUT}, but got ${timeoutInSeconds}`);
    }
    if (timeoutInSeconds % 1 !== 0) {
        throw new TypeError(`parameter 'timeoutInSeconds' must be an integer but got ${timeoutInSeconds}`);
    }
};
exports.validateTimeout = validateTimeout;
