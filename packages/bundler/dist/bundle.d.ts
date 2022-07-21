import type { WebpackOverrideFn } from 'remotion';
export declare const bundle: (entryPoint: string, onProgressUpdate?: ((progress: number) => void) | undefined, options?: {
    webpackOverride?: WebpackOverrideFn;
    outDir?: string;
    enableCaching?: boolean;
    publicPath?: string;
}) => Promise<string>;
