import type { BrowserExecutable } from 'remotion';
import type { Browser } from './browser/Browser';
import type { Page } from './browser/BrowserPage';
import type { ChromiumOptions } from './open-browser';
export declare const getPageAndCleanupFn: ({ passedInInstance, browserExecutable, chromiumOptions, }: {
    passedInInstance: Browser | undefined;
    browserExecutable: BrowserExecutable | null;
    chromiumOptions: ChromiumOptions;
}) => Promise<{
    cleanup: () => void;
    page: Page;
}>;
