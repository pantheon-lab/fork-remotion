import type { DevMiddlewareContext } from './types';
declare type PublicPath = {
    outputPath: string;
    publicPath: string;
};
export declare function getPaths(context: DevMiddlewareContext): PublicPath[];
export {};
