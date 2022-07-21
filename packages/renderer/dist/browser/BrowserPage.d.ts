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
import type { Browser } from './Browser';
import type { CDPSession } from './Connection';
import { ConsoleMessage } from './ConsoleMessage';
import type { EvaluateFn, EvaluateFnReturnType, EvaluateHandleFn, SerializableOrJSHandle, UnwrapPromiseLike } from './EvalTypes';
import { EventEmitter } from './EventEmitter';
import type { Frame } from './FrameManager';
import type { HTTPResponse } from './HTTPResponse';
import type { JSHandle } from './JSHandle';
import type { Viewport } from './PuppeteerViewport';
import type { Target } from './Target';
import { TaskQueue } from './TaskQueue';
interface WaitForOptions {
    timeout?: number;
}
interface PageEventObject {
    console: ConsoleMessage;
    error: Error;
}
export declare class Page extends EventEmitter {
    #private;
    static _create(client: CDPSession, target: Target, defaultViewport: Viewport, browser: Browser): Promise<Page>;
    browser: Browser;
    screenshotTaskQueue: TaskQueue;
    constructor(client: CDPSession, target: Target, browser: Browser);
    /**
     * Listen to page events.
     */
    on<K extends keyof PageEventObject>(eventName: K, handler: (event: PageEventObject[K]) => void): EventEmitter;
    once<K extends keyof PageEventObject>(eventName: K, handler: (event: PageEventObject[K]) => void): EventEmitter;
    off<K extends keyof PageEventObject>(eventName: K, handler: (event: PageEventObject[K]) => void): EventEmitter;
    /**
     * @returns A target this page was created from.
     */
    target(): Target;
    _client(): CDPSession;
    /**
     * @returns The page's main frame.
     * @remarks
     * Page is guaranteed to have a main frame which persists during navigations.
     */
    mainFrame(): Frame;
    setViewport(viewport: Viewport): Promise<void>;
    setDefaultNavigationTimeout(timeout: number): void;
    setDefaultTimeout(timeout: number): void;
    evaluateHandle<HandlerType extends JSHandle = JSHandle>(pageFunction: EvaluateHandleFn, ...args: SerializableOrJSHandle[]): Promise<HandlerType>;
    url(): string;
    goto(url: string, options?: WaitForOptions & {
        referer?: string;
    }): Promise<HTTPResponse | null>;
    bringToFront(): Promise<void>;
    evaluate<T extends EvaluateFn>(pageFunction: T, ...args: SerializableOrJSHandle[]): Promise<UnwrapPromiseLike<EvaluateFnReturnType<T>>>;
    evaluateOnNewDocument(pageFunction: Function | string, ...args: unknown[]): Promise<void>;
    close(options?: {
        runBeforeUnload?: boolean;
    }): Promise<void>;
    isClosed(): boolean;
    waitForFunction(browser: Browser, pageFunction: Function | string, ...args: SerializableOrJSHandle[]): Promise<JSHandle>;
}
export {};
