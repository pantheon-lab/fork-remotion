/**
 * Copyright 2020 Google Inc. All rights reserved.
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
import type { BrowserConnectOptions } from './BrowserConnector';
import type { BrowserFetcherOptions } from './BrowserFetcher';
import { BrowserFetcher } from './BrowserFetcher';
import type { ProductLauncher } from './Launcher';
import type { BrowserLaunchArgumentOptions, LaunchOptions } from './LaunchOptions';
import type { Product } from './Product';
interface PuppeteerLaunchOptions extends LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions {
    product?: Product;
    extraPrefsFirefox?: Record<string, unknown>;
}
export declare class PuppeteerNode {
    #private;
    _preferredRevision: string;
    constructor(settings: {
        preferredRevision: string;
        productName?: Product;
    });
    launch(options: PuppeteerLaunchOptions): Promise<Browser>;
    executablePath(channel?: string): string;
    get _launcher(): ProductLauncher;
    get product(): string;
    createBrowserFetcher(options: BrowserFetcherOptions): BrowserFetcher;
}
export {};
