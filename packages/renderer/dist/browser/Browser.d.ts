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
import type { Page } from './BrowserPage';
import type { Connection } from './Connection';
import { EventEmitter } from './EventEmitter';
import type { Viewport } from './PuppeteerViewport';
import { Target } from './Target';
declare type BrowserCloseCallback = () => Promise<void> | void;
interface WaitForTargetOptions {
    timeout?: number;
}
export declare const enum BrowserEmittedEvents {
    TargetChanged = "targetchanged",
    TargetCreated = "targetcreated",
    Closed = "closed"
}
export declare class Browser extends EventEmitter {
    #private;
    static _create({ connection, contextIds, defaultViewport, closeCallback, }: {
        connection: Connection;
        contextIds: string[];
        defaultViewport: Viewport;
        closeCallback?: BrowserCloseCallback;
    }): Promise<Browser>;
    get _targets(): Map<string, Target>;
    constructor(connection: Connection, contextIds: string[], defaultViewport: Viewport, closeCallback?: BrowserCloseCallback);
    browserContexts(): BrowserContext[];
    newPage(): Promise<Page>;
    _createPageInContext(contextId?: string): Promise<Page>;
    targets(): Target[];
    waitForTarget(predicate: (x: Target) => boolean | Promise<boolean>, options?: WaitForTargetOptions): Promise<Target>;
    pages(): Promise<Page[]>;
    close(): Promise<void>;
    disconnect(): void;
}
export declare class BrowserContext extends EventEmitter {
    #private;
    constructor(browser: Browser, contextId?: string);
    targets(): Target[];
    waitForTarget(predicate: (x: Target) => boolean | Promise<boolean>, options?: {
        timeout?: number;
    }): Promise<Target>;
    pages(): Promise<Page[]>;
    newPage(): Promise<Page>;
    browser(): Browser;
}
export {};
