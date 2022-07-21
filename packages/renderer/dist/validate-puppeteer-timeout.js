"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePuppeteerTimeout = void 0;
const validatePuppeteerTimeout = (timeoutInMilliseconds) => {
    if (timeoutInMilliseconds === null || timeoutInMilliseconds === undefined) {
        return;
    }
    if (typeof timeoutInMilliseconds !== 'number') {
        throw new TypeError(`'timeoutInMilliseconds' should be a number, but is: ${JSON.stringify(timeoutInMilliseconds)}`);
    }
    if (timeoutInMilliseconds < 7000) {
        throw new TypeError(`'timeoutInMilliseconds' should be bigger or equal than 7000, but is ${timeoutInMilliseconds}`);
    }
    if (Number.isNaN(timeoutInMilliseconds)) {
        throw new TypeError(`'timeoutInMilliseconds' should not be NaN, but is ${timeoutInMilliseconds}`);
    }
    if (!Number.isFinite(timeoutInMilliseconds)) {
        throw new TypeError(`'timeoutInMilliseconds' should be finite, but is ${timeoutInMilliseconds}`);
    }
    if (timeoutInMilliseconds % 1 !== 0) {
        throw new TypeError(`'timeoutInMilliseconds' should be an integer, but is ${timeoutInMilliseconds}`);
    }
};
exports.validatePuppeteerTimeout = validatePuppeteerTimeout;
