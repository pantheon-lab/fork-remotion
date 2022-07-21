/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type ReactFrame = {
    fileName: string | null;
    lineNumber: number | null;
    name: string | null;
};
declare const registerReactStack: () => void;
declare const unregisterReactStack: () => void;
declare type ErrorData = {
    type: 'webpack-error';
    message: string;
    frames: ReactFrame[];
} | {
    type: 'build-error';
    error: Error;
};
declare type ConsoleProxyCallback = (data: ErrorData) => void;
declare const permanentRegister: (type: 'error', callback: ConsoleProxyCallback) => void;
export { permanentRegister, registerReactStack, unregisterReactStack };
