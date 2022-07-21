import type { WebpackOverrideFn } from 'remotion';
import type { LiveEventsServer } from './live-events';
export declare const startServer: (entry: string, userDefinedComponent: string, options: {
    webpackOverride?: WebpackOverrideFn;
    getCurrentInputProps: () => object;
    envVariables?: Record<string, string>;
    port: number | null;
    maxTimelineTracks?: number;
}) => Promise<{
    port: number;
    liveEventsServer: LiveEventsServer;
}>;
