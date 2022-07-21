/**
 * Copyright 2019 Google Inc. All rights reserved.
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
import type { Browser, BrowserContext } from './Browser';
import { Page } from './BrowserPage';
import type { CDPSession } from './Connection';
import type { TargetInfo } from './devtools-types';
import type { Viewport } from './PuppeteerViewport';
export declare class Target {
    #private;
    _initializedPromise: Promise<boolean>;
    _initializedCallback: (x: boolean) => void;
    _isClosedPromise: Promise<void>;
    _closedCallback: () => void;
    _isInitialized: boolean;
    _targetId: string;
    constructor(targetInfo: TargetInfo, browserContext: BrowserContext, sessionFactory: () => Promise<CDPSession>, defaultViewport: Viewport);
    /**
     * Creates a Chrome Devtools Protocol session attached to the target.
     */
    createCDPSession(): Promise<CDPSession>;
    _getTargetInfo(): TargetInfo;
    /**
     * If the target is not of type `"page"` or `"background_page"`, returns `null`.
     */
    page(): Promise<Page | null>;
    url(): string;
    /**
     * Identifies what kind of target this is.
     *
     * @remarks
     *
     * See {@link https://developer.chrome.com/extensions/background_pages | docs} for more info about background pages.
     */
    type(): 'page' | 'background_page' | 'service_worker' | 'shared_worker' | 'other' | 'browser' | 'webview';
    /**
     * Get the browser the target belongs to.
     */
    browser(): Browser;
    /**
     * Get the browser context the target belongs to.
     */
    browserContext(): BrowserContext;
    /**
     * Get the target that opened this target. Top-level targets return `null`.
     */
    opener(): Target | undefined;
    _targetInfoChanged(targetInfo: TargetInfo): void;
}
