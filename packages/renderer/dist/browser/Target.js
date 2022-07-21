"use strict";
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
var _Target_browserContext, _Target_targetInfo, _Target_sessionFactory, _Target_defaultViewport, _Target_pagePromise;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
const BrowserPage_1 = require("./BrowserPage");
const isPagetTarget = (target) => {
    return (target.type === 'page' ||
        target.type === 'background_page' ||
        target.type === 'webview');
};
class Target {
    constructor(targetInfo, browserContext, sessionFactory, defaultViewport) {
        _Target_browserContext.set(this, void 0);
        _Target_targetInfo.set(this, void 0);
        _Target_sessionFactory.set(this, void 0);
        _Target_defaultViewport.set(this, void 0);
        _Target_pagePromise.set(this, void 0);
        __classPrivateFieldSet(this, _Target_targetInfo, targetInfo, "f");
        __classPrivateFieldSet(this, _Target_browserContext, browserContext, "f");
        this._targetId = targetInfo.targetId;
        __classPrivateFieldSet(this, _Target_sessionFactory, sessionFactory, "f");
        __classPrivateFieldSet(this, _Target_defaultViewport, defaultViewport, "f");
        this._initializedPromise = new Promise((fulfill) => {
            this._initializedCallback = fulfill;
        }).then((success) => {
            if (!success) {
                return false;
            }
            const opener = this.opener();
            if (!opener || !__classPrivateFieldGet(opener, _Target_pagePromise, "f") || this.type() !== 'page') {
                return true;
            }
            return true;
        });
        this._isClosedPromise = new Promise((fulfill) => {
            this._closedCallback = fulfill;
        });
        this._isInitialized =
            !isPagetTarget(__classPrivateFieldGet(this, _Target_targetInfo, "f")) || __classPrivateFieldGet(this, _Target_targetInfo, "f").url !== '';
        if (this._isInitialized) {
            this._initializedCallback(true);
        }
    }
    /**
     * Creates a Chrome Devtools Protocol session attached to the target.
     */
    createCDPSession() {
        return __classPrivateFieldGet(this, _Target_sessionFactory, "f").call(this);
    }
    _getTargetInfo() {
        return __classPrivateFieldGet(this, _Target_targetInfo, "f");
    }
    /**
     * If the target is not of type `"page"` or `"background_page"`, returns `null`.
     */
    async page() {
        var _a;
        if (isPagetTarget(__classPrivateFieldGet(this, _Target_targetInfo, "f")) && !__classPrivateFieldGet(this, _Target_pagePromise, "f")) {
            __classPrivateFieldSet(this, _Target_pagePromise, __classPrivateFieldGet(this, _Target_sessionFactory, "f").call(this).then((client) => {
                var _a;
                return BrowserPage_1.Page._create(client, this, (_a = __classPrivateFieldGet(this, _Target_defaultViewport, "f")) !== null && _a !== void 0 ? _a : null, this.browser());
            }), "f");
        }
        return (_a = (await __classPrivateFieldGet(this, _Target_pagePromise, "f"))) !== null && _a !== void 0 ? _a : null;
    }
    url() {
        return __classPrivateFieldGet(this, _Target_targetInfo, "f").url;
    }
    /**
     * Identifies what kind of target this is.
     *
     * @remarks
     *
     * See {@link https://developer.chrome.com/extensions/background_pages | docs} for more info about background pages.
     */
    type() {
        const { type } = __classPrivateFieldGet(this, _Target_targetInfo, "f");
        if (type === 'page' ||
            type === 'background_page' ||
            type === 'service_worker' ||
            type === 'shared_worker' ||
            type === 'browser' ||
            type === 'webview') {
            return type;
        }
        return 'other';
    }
    /**
     * Get the browser the target belongs to.
     */
    browser() {
        return __classPrivateFieldGet(this, _Target_browserContext, "f").browser();
    }
    /**
     * Get the browser context the target belongs to.
     */
    browserContext() {
        return __classPrivateFieldGet(this, _Target_browserContext, "f");
    }
    /**
     * Get the target that opened this target. Top-level targets return `null`.
     */
    opener() {
        const { openerId } = __classPrivateFieldGet(this, _Target_targetInfo, "f");
        if (!openerId) {
            return;
        }
        return this.browser()._targets.get(openerId);
    }
    _targetInfoChanged(targetInfo) {
        __classPrivateFieldSet(this, _Target_targetInfo, targetInfo, "f");
        if (!this._isInitialized &&
            (!isPagetTarget(__classPrivateFieldGet(this, _Target_targetInfo, "f")) || __classPrivateFieldGet(this, _Target_targetInfo, "f").url !== '')) {
            this._isInitialized = true;
            this._initializedCallback(true);
        }
    }
}
exports.Target = Target;
_Target_browserContext = new WeakMap(), _Target_targetInfo = new WeakMap(), _Target_sessionFactory = new WeakMap(), _Target_defaultViewport = new WeakMap(), _Target_pagePromise = new WeakMap();
