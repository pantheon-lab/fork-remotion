"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentPuppeteerTimeout = exports.setPuppeteerTimeout = void 0;
const timeout_1 = require("../timeout");
let currentTimeout = timeout_1.DEFAULT_PUPPETEER_TIMEOUT;
const setPuppeteerTimeout = (newPuppeteerTimeout) => {
    if (typeof newPuppeteerTimeout !== 'number') {
        throw new Error('--timeout flag / setTimeoutInMilliseconds() must be a number, but got ' +
            JSON.stringify(newPuppeteerTimeout));
    }
    currentTimeout = newPuppeteerTimeout;
};
exports.setPuppeteerTimeout = setPuppeteerTimeout;
const getCurrentPuppeteerTimeout = () => {
    return currentTimeout;
};
exports.getCurrentPuppeteerTimeout = getCurrentPuppeteerTimeout;
