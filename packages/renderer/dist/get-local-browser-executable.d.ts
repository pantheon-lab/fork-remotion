import type { Browser, BrowserExecutable } from 'remotion';
export declare const ensureLocalBrowser: (browser: Browser, preferredBrowserExecutable: BrowserExecutable) => Promise<void>;
export declare const getLocalBrowserExecutable: (browser: Browser, preferredBrowserExecutable: BrowserExecutable) => string;
