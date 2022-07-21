/// <reference types="node" />
import type { ImageFormat } from 'remotion';
import type { Page } from './browser/BrowserPage';
export declare const provideScreenshot: ({ page, imageFormat, options, quality, }: {
    page: Page;
    imageFormat: ImageFormat;
    quality: number | undefined;
    options: {
        frame: number;
        output: string | null;
    };
}) => Promise<Buffer>;
