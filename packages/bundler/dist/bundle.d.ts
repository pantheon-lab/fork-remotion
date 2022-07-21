import type { WebpackOverrideFn } from 'remotion';
import webpack from 'webpack';
declare type Options = {
    webpackOverride?: WebpackOverrideFn;
    outDir?: string;
    enableCaching?: boolean;
    publicPath?: string;
};
export declare const getConfig: (outDir: string, entryPoint: string, onProgressUpdate?: ((progress: number) => void) | undefined, options?: Options) => [string, webpack.Configuration];
export declare const bundle: (entryPoint: string, onProgressUpdate?: ((progress: number) => void) | undefined, options?: Options) => Promise<string>;
export {};
