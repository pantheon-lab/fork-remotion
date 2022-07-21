"use strict";
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _PuppeteerNode_lazyLauncher, _PuppeteerNode_productName;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerNode = void 0;
const BrowserFetcher_1 = require("./BrowserFetcher");
const Launcher_1 = __importDefault(require("./Launcher"));
const revisions_1 = require("./revisions");
class PuppeteerNode {
    constructor(settings) {
        _PuppeteerNode_lazyLauncher.set(this, void 0);
        _PuppeteerNode_productName.set(this, void 0);
        const { preferredRevision, productName } = settings;
        __classPrivateFieldSet(this, _PuppeteerNode_productName, productName, "f");
        this._preferredRevision = preferredRevision;
        this.launch = this.launch.bind(this);
        this.executablePath = this.executablePath.bind(this);
        this.createBrowserFetcher = this.createBrowserFetcher.bind(this);
    }
    launch(options) {
        if (options.product) {
            __classPrivateFieldSet(this, _PuppeteerNode_productName, options.product, "f");
        }
        return this._launcher.launch(options);
    }
    executablePath(channel) {
        return this._launcher.executablePath(channel);
    }
    get _launcher() {
        if (!__classPrivateFieldGet(this, _PuppeteerNode_lazyLauncher, "f") ||
            __classPrivateFieldGet(this, _PuppeteerNode_lazyLauncher, "f").product !== __classPrivateFieldGet(this, _PuppeteerNode_productName, "f")) {
            switch (__classPrivateFieldGet(this, _PuppeteerNode_productName, "f")) {
                case 'firefox':
                    this._preferredRevision = revisions_1.PUPPETEER_REVISIONS.firefox;
                    break;
                case 'chrome':
                default:
                    this._preferredRevision = revisions_1.PUPPETEER_REVISIONS.chromium;
            }
            // eslint-disable-next-line new-cap
            __classPrivateFieldSet(this, _PuppeteerNode_lazyLauncher, (0, Launcher_1.default)(this._preferredRevision, __classPrivateFieldGet(this, _PuppeteerNode_productName, "f")), "f");
        }
        return __classPrivateFieldGet(this, _PuppeteerNode_lazyLauncher, "f");
    }
    get product() {
        return this._launcher.product;
    }
    createBrowserFetcher(options) {
        return new BrowserFetcher_1.BrowserFetcher(options);
    }
}
exports.PuppeteerNode = PuppeteerNode;
_PuppeteerNode_lazyLauncher = new WeakMap(), _PuppeteerNode_productName = new WeakMap();
