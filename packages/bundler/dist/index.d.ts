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
    }) => webpack.Configuration;
    indexHtml: (staticHash: string, baseDir: string, editorName: string | null, inputProps: object | null) => string;
    cacheExists: (environment: "development" | "production") => boolean;
    clearCache: (environment: "development" | "production") => Promise<void>;
};
export { bundle } from './bundle';
export { webpack };
