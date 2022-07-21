"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalBrowserExecutable = exports.ensureLocalBrowser = void 0;
const fs_1 = __importDefault(require("fs"));
const create_browser_fetcher_1 = require("./browser/create-browser-fetcher");
const node_1 = require("./browser/node");
const revisions_1 = require("./browser/revisions");
const getSearchPathsForProduct = (product) => {
    var _a;
    if (product === 'chrome') {
        return [
            (_a = process.env.PUPPETEER_EXECUTABLE_PATH) !== null && _a !== void 0 ? _a : null,
            process.platform === 'darwin'
                ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
                : null,
            process.platform === 'linux' ? '/usr/bin/google-chrome' : null,
            process.platform === 'linux' ? '/usr/bin/chromium-browser' : null,
            process.platform === 'linux'
                ? '/app/.apt/usr/bin/google-chrome-stable'
                : null,
            process.platform === 'win32'
                ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                : null,
            process.platform === 'win32'
                ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
                : null,
        ].filter(Boolean);
    }
    if (product === 'firefox') {
        return [].filter(Boolean);
    }
    throw new TypeError(`Unknown browser product: ${product}`);
};
const mapBrowserToProduct = (browser) => browser;
const getLocalBrowser = (product) => {
    for (const p of getSearchPathsForProduct(product)) {
        if (fs_1.default.existsSync(p)) {
            return p;
        }
    }
    return null;
};
const getBrowserRevision = (product) => {
    const browserFetcher = node_1.puppeteer.createBrowserFetcher({
        product,
        path: null,
        platform: null,
    });
    const revisionInfo = browserFetcher.revisionInfo(product === 'firefox'
        ? revisions_1.PUPPETEER_REVISIONS.firefox
        : revisions_1.PUPPETEER_REVISIONS.chromium);
    return revisionInfo;
};
const getBrowserStatus = (product, browserExecutablePath) => {
    if (browserExecutablePath) {
        if (!fs_1.default.existsSync(browserExecutablePath)) {
            console.warn(`Browser executable was specified as '${browserExecutablePath}' but the path doesn't exist.`);
        }
        return { path: browserExecutablePath, type: 'user-defined-path' };
    }
    const localBrowser = getLocalBrowser(product);
    if (localBrowser !== null) {
        return { path: localBrowser, type: 'local-browser' };
    }
    const revision = getBrowserRevision(product);
    if (revision.local !== null && fs_1.default.existsSync(revision.executablePath)) {
        return { path: revision.executablePath, type: 'local-puppeteer-browser' };
    }
    return { type: 'no-browser' };
};
const ensureLocalBrowser = async (browser, preferredBrowserExecutable) => {
    const status = getBrowserStatus(mapBrowserToProduct(browser), preferredBrowserExecutable);
    if (status.type === 'no-browser') {
        console.log('No local browser could be found. Downloading one from the internet...');
        await (0, create_browser_fetcher_1.downloadBrowser)(browser);
    }
};
exports.ensureLocalBrowser = ensureLocalBrowser;
const getLocalBrowserExecutable = (browser, preferredBrowserExecutable) => {
    const status = getBrowserStatus(mapBrowserToProduct(browser), preferredBrowserExecutable);
    if (status.type === 'no-browser') {
        throw new TypeError('No browser found for rendering frames! Please open a GitHub issue and describe ' +
            'how you reached this error: https://github.com/remotion-dev/remotion/issues');
    }
    return status.path;
};
exports.getLocalBrowserExecutable = getLocalBrowserExecutable;
