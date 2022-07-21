/// <reference types="node" />
import type { StillImageFormat } from 'remotion';
import type { Page } from './browser/BrowserPage';
import type { ScreenshotOptions } from './browser/ScreenshotOptions';
export declare const _screenshotTask: (page: Page, format: StillImageFormat, options: ScreenshotOptions) => Promise<Buffer | string>;
