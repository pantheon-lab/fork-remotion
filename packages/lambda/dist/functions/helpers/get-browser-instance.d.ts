import type { ChromiumOptions } from '@remotion/renderer';
import { openBrowser } from '@remotion/renderer';
export declare const getBrowserInstance: (shouldDumpIo: boolean, chromiumOptions: ChromiumOptions) => ReturnType<typeof openBrowser>;
