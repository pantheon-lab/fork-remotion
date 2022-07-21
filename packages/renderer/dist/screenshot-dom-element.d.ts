/// <reference types="node" />
import type { ImageFormat } from 'remotion';
import type { Page } from './browser/BrowserPage';
export declare const screenshotDOMElement: ({ page, imageFormat, quality, opts, }: {
    page: Page;
    imageFormat: ImageFormat;
    quality: number | undefined;
    opts: {
        path: string | null;
    };
}) => Promise<Buffer>;
