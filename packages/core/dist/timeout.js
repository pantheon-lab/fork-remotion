"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPuppeteerTimeout = exports.DEFAULT_PUPPETEER_TIMEOUT = void 0;
exports.DEFAULT_PUPPETEER_TIMEOUT = 30000;
const getPuppeteerTimeout = () => {
    const param = window.remotion_puppeteerTimeout;
    return param ? Number(param) : exports.DEFAULT_PUPPETEER_TIMEOUT;
};
const setupPuppeteerTimeout = () => {
    window.remotion_puppeteerTimeout = getPuppeteerTimeout();
};
exports.setupPuppeteerTimeout = setupPuppeteerTimeout;
