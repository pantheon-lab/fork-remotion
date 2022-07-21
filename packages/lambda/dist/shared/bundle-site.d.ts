export declare const bundleSite: (entryPoint: string, onProgressUpdate?: ((progress: number) => void) | undefined, options?: {
    webpackOverride?: import("remotion").WebpackOverrideFn | undefined;
    outDir?: string | undefined;
    enableCaching?: boolean | undefined;
    publicPath?: string | undefined;
} | undefined) => Promise<string>;
