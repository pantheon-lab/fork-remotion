"use strict";
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
var _Browser_instances, _Browser_defaultViewport, _Browser_connection, _Browser_closeCallback, _Browser_defaultContext, _Browser_contexts, _Browser_targets, _Browser_targetCreated, _Browser_targetDestroyed, _Browser_targetInfoChanged, _BrowserContext_browser, _BrowserContext_id;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserContext = exports.Browser = void 0;
const assert_1 = require("./assert");
const EventEmitter_1 = require("./EventEmitter");
const Target_1 = require("./Target");
const util_1 = require("./util");
class Browser extends EventEmitter_1.EventEmitter {
    // eslint-disable-next-line max-params
    constructor(connection, contextIds, defaultViewport, closeCallback) {
        super();
        _Browser_instances.add(this);
        _Browser_defaultViewport.set(this, void 0);
        _Browser_connection.set(this, void 0);
        _Browser_closeCallback.set(this, void 0);
        _Browser_defaultContext.set(this, void 0);
        _Browser_contexts.set(this, void 0);
        _Browser_targets.set(this, void 0);
        __classPrivateFieldSet(this, _Browser_defaultViewport, defaultViewport, "f");
        __classPrivateFieldSet(this, _Browser_connection, connection, "f");
        __classPrivateFieldSet(this, _Browser_closeCallback, closeCallback ||
            function () {
                return undefined;
            }, "f");
        __classPrivateFieldSet(this, _Browser_defaultContext, new BrowserContext(this), "f");
        __classPrivateFieldSet(this, _Browser_contexts, new Map(), "f");
        for (const contextId of contextIds) {
            __classPrivateFieldGet(this, _Browser_contexts, "f").set(contextId, new BrowserContext(this, contextId));
        }
        __classPrivateFieldSet(this, _Browser_targets, new Map(), "f");
        __classPrivateFieldGet(this, _Browser_connection, "f").on('Target.targetCreated', __classPrivateFieldGet(this, _Browser_instances, "m", _Browser_targetCreated).bind(this));
        __classPrivateFieldGet(this, _Browser_connection, "f").on('Target.targetDestroyed', __classPrivateFieldGet(this, _Browser_instances, "m", _Browser_targetDestroyed).bind(this));
        __classPrivateFieldGet(this, _Browser_connection, "f").on('Target.targetInfoChanged', __classPrivateFieldGet(this, _Browser_instances, "m", _Browser_targetInfoChanged).bind(this));
    }
    static async _create({ connection, contextIds, defaultViewport, closeCallback, }) {
        const browser = new Browser(connection, contextIds, defaultViewport, closeCallback);
        await connection.send('Target.setDiscoverTargets', { discover: true });
        return browser;
    }
    get _targets() {
        return __classPrivateFieldGet(this, _Browser_targets, "f");
    }
    browserContexts() {
        return [__classPrivateFieldGet(this, _Browser_defaultContext, "f"), ...Array.from(__classPrivateFieldGet(this, _Browser_contexts, "f").values())];
    }
    newPage() {
        return __classPrivateFieldGet(this, _Browser_defaultContext, "f").newPage();
    }
    async _createPageInContext(contextId) {
        const { targetId } = await __classPrivateFieldGet(this, _Browser_connection, "f").send('Target.createTarget', {
            url: 'about:blank',
            browserContextId: contextId || undefined,
        });
        const target = __classPrivateFieldGet(this, _Browser_targets, "f").get(targetId);
        if (!target) {
            throw new Error(`Missing target for page (id = ${targetId})`);
        }
        const initialized = await target._initializedPromise;
        if (!initialized) {
            throw new Error(`Failed to create target for page (id = ${targetId})`);
        }
        const page = await target.page();
        if (!page) {
            throw new Error(`Failed to create a page for context (id = ${contextId})`);
        }
        return page;
    }
    targets() {
        return Array.from(__classPrivateFieldGet(this, _Browser_targets, "f").values()).filter((target) => {
            return target._isInitialized;
        });
    }
    async waitForTarget(predicate, options = {}) {
        const { timeout = 30000 } = options;
        let resolve;
        let isResolved = false;
        const targetPromise = new Promise((x) => {
            resolve = x;
        });
        this.on("targetcreated" /* BrowserEmittedEvents.TargetCreated */, check);
        this.on("targetchanged" /* BrowserEmittedEvents.TargetChanged */, check);
        try {
            if (!timeout) {
                return await targetPromise;
            }
            this.targets().forEach(check);
            return await (0, util_1.waitWithTimeout)(targetPromise, 'target', timeout, this);
        }
        finally {
            this.off("targetcreated" /* BrowserEmittedEvents.TargetCreated */, check);
            this.off("targetchanged" /* BrowserEmittedEvents.TargetChanged */, check);
        }
        async function check(target) {
            if ((await predicate(target)) && !isResolved) {
                isResolved = true;
                resolve(target);
            }
        }
    }
    async pages() {
        const contextPages = await Promise.all(this.browserContexts().map((context) => {
            return context.pages();
        }));
        // Flatten array.
        return contextPages.reduce((acc, x) => {
            return acc.concat(x);
        }, []);
    }
    async close() {
        await __classPrivateFieldGet(this, _Browser_closeCallback, "f").call(null);
        this.disconnect();
        this.emit("closed" /* BrowserEmittedEvents.Closed */);
    }
    disconnect() {
        __classPrivateFieldGet(this, _Browser_connection, "f").dispose();
    }
}
exports.Browser = Browser;
_Browser_defaultViewport = new WeakMap(), _Browser_connection = new WeakMap(), _Browser_closeCallback = new WeakMap(), _Browser_defaultContext = new WeakMap(), _Browser_contexts = new WeakMap(), _Browser_targets = new WeakMap(), _Browser_instances = new WeakSet(), _Browser_targetCreated = async function _Browser_targetCreated(event) {
    var _a;
    const { targetInfo } = event;
    const { browserContextId } = targetInfo;
    const context = browserContextId && __classPrivateFieldGet(this, _Browser_contexts, "f").has(browserContextId)
        ? __classPrivateFieldGet(this, _Browser_contexts, "f").get(browserContextId)
        : __classPrivateFieldGet(this, _Browser_defaultContext, "f");
    if (!context) {
        throw new Error('Missing browser context');
    }
    const target = new Target_1.Target(targetInfo, context, () => {
        return __classPrivateFieldGet(this, _Browser_connection, "f").createSession(targetInfo);
    }, (_a = __classPrivateFieldGet(this, _Browser_defaultViewport, "f")) !== null && _a !== void 0 ? _a : null);
    (0, assert_1.assert)(!__classPrivateFieldGet(this, _Browser_targets, "f").has(event.targetInfo.targetId), 'Target should not exist before targetCreated');
    __classPrivateFieldGet(this, _Browser_targets, "f").set(event.targetInfo.targetId, target);
    if (await target._initializedPromise) {
        this.emit("targetcreated" /* BrowserEmittedEvents.TargetCreated */, target);
    }
}, _Browser_targetDestroyed = function _Browser_targetDestroyed(event) {
    const target = __classPrivateFieldGet(this, _Browser_targets, "f").get(event.targetId);
    if (!target) {
        throw new Error(`Missing target in _targetDestroyed (id = ${event.targetId})`);
    }
    target._initializedCallback(false);
    __classPrivateFieldGet(this, _Browser_targets, "f").delete(event.targetId);
    target._closedCallback();
}, _Browser_targetInfoChanged = function _Browser_targetInfoChanged(event) {
    const target = __classPrivateFieldGet(this, _Browser_targets, "f").get(event.targetInfo.targetId);
    if (!target) {
        throw new Error(`Missing target in targetInfoChanged (id = ${event.targetInfo.targetId})`);
    }
    const previousURL = target.url();
    const wasInitialized = target._isInitialized;
    target._targetInfoChanged(event.targetInfo);
    if (wasInitialized && previousURL !== target.url()) {
        this.emit("targetchanged" /* BrowserEmittedEvents.TargetChanged */, target);
    }
};
class BrowserContext extends EventEmitter_1.EventEmitter {
    constructor(browser, contextId) {
        super();
        _BrowserContext_browser.set(this, void 0);
        _BrowserContext_id.set(this, void 0);
        __classPrivateFieldSet(this, _BrowserContext_browser, browser, "f");
        __classPrivateFieldSet(this, _BrowserContext_id, contextId, "f");
    }
    targets() {
        return __classPrivateFieldGet(this, _BrowserContext_browser, "f").targets().filter((target) => {
            return target.browserContext() === this;
        });
    }
    waitForTarget(predicate, options = {}) {
        return __classPrivateFieldGet(this, _BrowserContext_browser, "f").waitForTarget((target) => {
            return target.browserContext() === this && predicate(target);
        }, options);
    }
    async pages() {
        const pages = await Promise.all(this.targets()
            .filter((target) => target.type() === 'page')
            .map((target) => target.page()));
        return pages.filter((page) => {
            return Boolean(page);
        });
    }
    newPage() {
        return __classPrivateFieldGet(this, _BrowserContext_browser, "f")._createPageInContext(__classPrivateFieldGet(this, _BrowserContext_id, "f"));
    }
    browser() {
        return __classPrivateFieldGet(this, _BrowserContext_browser, "f");
    }
}
exports.BrowserContext = BrowserContext;
_BrowserContext_browser = new WeakMap(), _BrowserContext_id = new WeakMap();
