import type { Page } from './browser/BrowserPage';
export declare function puppeteerEvaluateWithCatch<ReturnType>({ page, pageFunction, frame, args, }: {
    page: Page;
    pageFunction: Function | string;
    frame: number | null;
    args: unknown[];
}): Promise<ReturnType>;
