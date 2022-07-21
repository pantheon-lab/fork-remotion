/**
 * Source code is adapted from
 * https://github.com/webpack-contrib/webpack-hot-middleware#readme
 * and rewritten in TypeScript. This file is MIT licensed
 */
import type { webpack } from '@remotion/bundler';
import type { IncomingMessage, ServerResponse } from 'http';
export declare const webpackHotMiddleware: (compiler: webpack.Compiler) => (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
