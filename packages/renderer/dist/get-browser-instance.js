"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageAndCleanupFn = void 0;
const remotion_1 = require("remotion");
const open_browser_1 = require("./open-browser");
const getPageAndCleanupFn = async ({ passedInInstance, browserExecutable, chromiumOptions, }) => {
    if (passedInInstance) {
        const page = await passedInInstance.newPage();
        return {
            page,
            cleanup: () => {
                // Close puppeteer page and don't wait for it to finish.
                // Keep browser open.
                page.close().catch((err) => {
                    console.error('Was not able to close puppeteer page', err);
                });
            },
        };
    }
    const browserInstance = await (0, open_browser_1.openBrowser)(remotion_1.Internals.DEFAULT_BROWSER, {
        browserExecutable,
        chromiumOptions,
    });
    const browserPage = await browserInstance.newPage();
    return {
        page: browserPage,
        cleanup: () => {
            // Close whole browser that was just created and don't wait for it to finish.
            browserInstance.close().catch((err) => {
                console.error('Was not able to close puppeteer page', err);
            });
        },
    };
};
exports.getPageAndCleanupFn = getPageAndCleanupFn;
