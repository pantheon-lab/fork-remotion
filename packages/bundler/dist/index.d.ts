import esbuild = require('esbuild');
import webpack = require('webpack');
export declare const BundlerInternals: {
    esbuild: typeof esbuild;
    webpackConfig: ({ entry, userDefinedComponent, outDir, environment, webpackOverride, onProgressUpdate, enableCaching, envVariables, maxTimelineTracks, entryPoints, }: {
        entry: string;
        userDefinedComponent: string;
        outDir: string;
        environment: "development" | "production";
        webpackOverride: import("remotion").WebpackOverrideFn;
        onProgressUpdate?: ((f: number) => void) | undefined;
        enableCaching?: boolean | undefined;
        envVariables: Record<string, string>;
        maxTimelineTracks: number;
        entryPoints: string[];
    }) => [string, webpack.Configuration];
    indexHtml: (staticHash: string, baseDir: string, editorName: string | null, inputProps: object | null) => string;
    cacheExists: (environment: "development" | "production", hash: string) => "exists" | "other-exists" | "does-not-exist";
    clearCache: () => Promise<void>;
    getConfig: (outDir: string, entryPoint: string, onProgressUpdate?: ((progress: number) => void) | undefined, options?: {
        webpackOverride?: import("remotion").WebpackOverrideFn | undefined;
        outDir?: string | undefined;
        enableCaching?: boolean | undefined;
        publicPath?: string | undefined;
    } | undefined) => [string, webpack.Configuration];
};
export { bundle } from './bundle';
export { webpack };
