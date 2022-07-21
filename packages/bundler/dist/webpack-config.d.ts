import type { WebpackConfiguration, WebpackOverrideFn } from 'remotion';
export declare const webpackConfig: ({ entry, userDefinedComponent, outDir, environment, webpackOverride, onProgressUpdate, enableCaching, envVariables, maxTimelineTracks, entryPoints, }: {
    entry: string;
    userDefinedComponent: string;
    outDir: string;
    environment: 'development' | 'production';
    webpackOverride: WebpackOverrideFn;
    onProgressUpdate?: ((f: number) => void) | undefined;
    enableCaching?: boolean | undefined;
    envVariables: Record<string, string>;
    maxTimelineTracks: number;
    entryPoints: string[];
}) => [string, WebpackConfiguration];
