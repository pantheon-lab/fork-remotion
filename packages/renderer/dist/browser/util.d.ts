/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference types="node" />
import type { Browser } from './Browser';
import type { CDPSession } from './Connection';
import type { DevtoolsRemoteObject, ExceptionDetails } from './devtools-types';
import type { CommonEventEmitter } from './EventEmitter';
export declare function getExceptionMessage(exceptionDetails: ExceptionDetails): string;
export declare function valueFromRemoteObject(remoteObject: DevtoolsRemoteObject): any;
export declare function releaseObject(client: CDPSession, remoteObject: DevtoolsRemoteObject): Promise<void>;
export interface PuppeteerEventListener {
    emitter: CommonEventEmitter;
    eventName: string | symbol;
    handler: (...args: any[]) => void;
}
export declare function addEventListener(emitter: CommonEventEmitter, eventName: string | symbol, handler: (...args: any[]) => void): PuppeteerEventListener;
export declare function removeEventListeners(listeners: Array<{
    emitter: CommonEventEmitter;
    eventName: string | symbol;
    handler: (...args: any[]) => void;
}>): void;
export declare const isString: (obj: unknown) => obj is string;
export declare function evaluationString(fun: Function | string, ...args: unknown[]): string;
export declare function pageBindingDeliverResultString(name: string, seq: number, result: unknown): string;
export declare function pageBindingDeliverErrorString(name: string, seq: number, message: string, stack?: string): string;
export declare function pageBindingDeliverErrorValueString(name: string, seq: number, value: unknown): string;
export declare function waitWithTimeout<T>(promise: Promise<T>, taskName: string, timeout: number, browser: Browser): Promise<T>;
interface ErrorLike extends Error {
    name: string;
    message: string;
}
export declare function isErrorLike(obj: unknown): obj is ErrorLike;
export declare function isErrnoException(obj: unknown): obj is NodeJS.ErrnoException;
export {};