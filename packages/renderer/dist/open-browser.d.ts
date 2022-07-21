import type { Browser } from 'remotion';
import type { Browser as PuppeteerBrowser } from './browser/Browser';
import type { Viewport } from './browser/PuppeteerViewport';
declare const validRenderers: readonly ["swangle", "angle", "egl", "swiftshader"];
declare type OpenGlRenderer = typeof validRenderers[number];
export declare type ChromiumOptions = {
    ignoreCertificateErrors?: boolean;
    disableWebSecurity?: boolean;
    gl?: OpenGlRenderer | null;
    headless?: boolean;
};
export declare const killAllBrowsers: () => Promise<void>;
export declare const openBrowser: (browser: Browser, options?: {
    shouldDumpIo?: boolean;
    browserExecutable?: string | null;
    chromiumOptions?: ChromiumOptions;
    forceDeviceScaleFactor?: number;
    viewport?: Viewport;
}) => Promise<PuppeteerBrowser>;
export {};
