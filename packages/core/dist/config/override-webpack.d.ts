import type { Configuration } from 'webpack';
export declare type WebpackConfiguration = Configuration;
export declare type WebpackOverrideFn = (currentConfiguration: WebpackConfiguration) => WebpackConfiguration;
export declare const defaultOverrideFunction: WebpackOverrideFn;
export declare const getWebpackOverrideFn: () => WebpackOverrideFn;
export declare const overrideWebpackConfig: (fn: WebpackOverrideFn) => void;
