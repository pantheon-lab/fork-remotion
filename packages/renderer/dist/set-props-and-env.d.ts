import type { Page } from './browser/BrowserPage';
export declare const setPropsAndEnv: ({ inputProps, envVariables, page, serveUrl, initialFrame, timeoutInMilliseconds, proxyPort, retriesRemaining, }: {
    inputProps: unknown;
    envVariables: Record<string, string> | undefined;
    page: Page;
    serveUrl: string;
    initialFrame: number;
    timeoutInMilliseconds: number | undefined;
    proxyPort: number;
    retriesRemaining: number;
}) => Promise<void>;
