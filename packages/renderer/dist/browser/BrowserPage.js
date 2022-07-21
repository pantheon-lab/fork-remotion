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
var _Page_instances, _Page_closed, _Page_client, _Page_target, _Page_timeoutSettings, _Page_frameManager, _Page_pageBindings, _Page_initialize, _Page_onTargetCrashed, _Page_onLogEntryAdded, _Page_onConsoleAPI, _Page_onBindingCalled, _Page_addConsoleMessage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const assert_1 = require("./assert");
const ConsoleMessage_1 = require("./ConsoleMessage");
const EventEmitter_1 = require("./EventEmitter");
const FrameManager_1 = require("./FrameManager");
const JSHandle_1 = require("./JSHandle");
const TaskQueue_1 = require("./TaskQueue");
const TimeoutSettings_1 = require("./TimeoutSettings");
const util_1 = require("./util");
class Page extends EventEmitter_1.EventEmitter {
    constructor(client, target, browser) {
        super();
        _Page_instances.add(this);
        _Page_closed.set(this, false);
        _Page_client.set(this, void 0);
        _Page_target.set(this, void 0);
        _Page_timeoutSettings.set(this, new TimeoutSettings_1.TimeoutSettings());
        _Page_frameManager.set(this, void 0);
        _Page_pageBindings.set(this, new Map());
        __classPrivateFieldSet(this, _Page_client, client, "f");
        __classPrivateFieldSet(this, _Page_target, target, "f");
        __classPrivateFieldSet(this, _Page_frameManager, new FrameManager_1.FrameManager(client, this, __classPrivateFieldGet(this, _Page_timeoutSettings, "f")), "f");
        this.screenshotTaskQueue = new TaskQueue_1.TaskQueue();
        this.browser = browser;
        client.on('Target.attachedToTarget', (event) => {
            switch (event.targetInfo.type) {
                case 'iframe':
                    break;
                case 'worker':
                    break;
                default:
                    // If we don't detach from service workers, they will never die.
                    // We still want to attach to workers for emitting events.
                    // We still want to attach to iframes so sessions may interact with them.
                    // We detach from all other types out of an abundance of caution.
                    // See https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/devtools_agent_host_impl.cc?ss=chromium&q=f:devtools%20-f:out%20%22::kTypePage%5B%5D%22
                    // for the complete list of available types.
                    client
                        .send('Target.detachFromTarget', {
                        sessionId: event.sessionId,
                    })
                        .catch((err) => console.log(err));
            }
        });
        client.on('Runtime.consoleAPICalled', (event) => {
            return __classPrivateFieldGet(this, _Page_instances, "m", _Page_onConsoleAPI).call(this, event);
        });
        client.on('Runtime.bindingCalled', (event) => {
            return __classPrivateFieldGet(this, _Page_instances, "m", _Page_onBindingCalled).call(this, event);
        });
        client.on('Inspector.targetCrashed', () => {
            return __classPrivateFieldGet(this, _Page_instances, "m", _Page_onTargetCrashed).call(this);
        });
        client.on('Log.entryAdded', (event) => {
            return __classPrivateFieldGet(this, _Page_instances, "m", _Page_onLogEntryAdded).call(this, event);
        });
    }
    static async _create(client, target, defaultViewport, browser) {
        const page = new Page(client, target, browser);
        await __classPrivateFieldGet(page, _Page_instances, "m", _Page_initialize).call(page);
        await page.setViewport(defaultViewport);
        return page;
    }
    /**
     * Listen to page events.
     */
    // Note: this method exists to define event typings and handle
    // proper wireup of cooperative request interception. Actual event listening and
    // dispatching is delegated to EventEmitter.
    on(eventName, handler) {
        return super.on(eventName, handler);
    }
    once(eventName, handler) {
        // Note: this method only exists to define the types; we delegate the impl
        // to EventEmitter.
        return super.once(eventName, handler);
    }
    off(eventName, handler) {
        return super.off(eventName, handler);
    }
    /**
     * @returns A target this page was created from.
     */
    target() {
        return __classPrivateFieldGet(this, _Page_target, "f");
    }
    _client() {
        return __classPrivateFieldGet(this, _Page_client, "f");
    }
    /**
     * @returns The page's main frame.
     * @remarks
     * Page is guaranteed to have a main frame which persists during navigations.
     */
    mainFrame() {
        return __classPrivateFieldGet(this, _Page_frameManager, "f").mainFrame();
    }
    setViewport(viewport) {
        return __classPrivateFieldGet(this, _Page_client, "f").send('Emulation.setDeviceMetricsOverride', {
            mobile: false,
            width: viewport.width,
            height: viewport.height,
            deviceScaleFactor: viewport.deviceScaleFactor,
            screenOrientation: {
                angle: 0,
                type: 'portraitPrimary',
            },
        });
    }
    setDefaultNavigationTimeout(timeout) {
        __classPrivateFieldGet(this, _Page_timeoutSettings, "f").setDefaultNavigationTimeout(timeout);
    }
    setDefaultTimeout(timeout) {
        __classPrivateFieldGet(this, _Page_timeoutSettings, "f").setDefaultTimeout(timeout);
    }
    async evaluateHandle(pageFunction, ...args) {
        const context = await this.mainFrame().executionContext();
        return context.evaluateHandle(pageFunction, ...args);
    }
    url() {
        return this.mainFrame().url();
    }
    goto(url, options = {}) {
        return __classPrivateFieldGet(this, _Page_frameManager, "f").mainFrame().goto(url, options);
    }
    async bringToFront() {
        await __classPrivateFieldGet(this, _Page_client, "f").send('Page.bringToFront');
    }
    evaluate(pageFunction, ...args) {
        return __classPrivateFieldGet(this, _Page_frameManager, "f").mainFrame().evaluate(pageFunction, ...args);
    }
    async evaluateOnNewDocument(pageFunction, ...args) {
        const source = (0, util_1.evaluationString)(pageFunction, ...args);
        await __classPrivateFieldGet(this, _Page_client, "f").send('Page.addScriptToEvaluateOnNewDocument', {
            source,
        });
    }
    async close(options = { runBeforeUnload: undefined }) {
        const connection = __classPrivateFieldGet(this, _Page_client, "f").connection();
        (0, assert_1.assert)(connection, 'Protocol error: Connection closed. Most likely the page has been closed.');
        const runBeforeUnload = Boolean(options.runBeforeUnload);
        if (runBeforeUnload) {
            await __classPrivateFieldGet(this, _Page_client, "f").send('Page.close');
        }
        else {
            await connection.send('Target.closeTarget', {
                targetId: __classPrivateFieldGet(this, _Page_target, "f")._targetId,
            });
            await __classPrivateFieldGet(this, _Page_target, "f")._isClosedPromise;
        }
    }
    isClosed() {
        return __classPrivateFieldGet(this, _Page_closed, "f");
    }
    waitForFunction(browser, pageFunction, ...args) {
        return this.mainFrame().waitForFunction(browser, pageFunction, ...args);
    }
}
exports.Page = Page;
_Page_closed = new WeakMap(), _Page_client = new WeakMap(), _Page_target = new WeakMap(), _Page_timeoutSettings = new WeakMap(), _Page_frameManager = new WeakMap(), _Page_pageBindings = new WeakMap(), _Page_instances = new WeakSet(), _Page_initialize = async function _Page_initialize() {
    await Promise.all([
        __classPrivateFieldGet(this, _Page_frameManager, "f").initialize(),
        __classPrivateFieldGet(this, _Page_client, "f").send('Target.setAutoAttach', {
            autoAttach: true,
            waitForDebuggerOnStart: false,
            flatten: true,
        }),
        __classPrivateFieldGet(this, _Page_client, "f").send('Performance.enable'),
        __classPrivateFieldGet(this, _Page_client, "f").send('Log.enable'),
    ]);
}, _Page_onTargetCrashed = function _Page_onTargetCrashed() {
    this.emit('error', new Error('Page crashed!'));
}, _Page_onLogEntryAdded = function _Page_onLogEntryAdded(event) {
    const { level, text, args, source, url, lineNumber } = event.entry;
    if (args) {
        args.map((arg) => {
            return (0, util_1.releaseObject)(__classPrivateFieldGet(this, _Page_client, "f"), arg);
        });
    }
    if (source !== 'worker') {
        this.emit("console" /* PageEmittedEvents.Console */, new ConsoleMessage_1.ConsoleMessage(level, text, [], [{ url, lineNumber }]));
    }
}, _Page_onConsoleAPI = function _Page_onConsoleAPI(event) {
    if (event.executionContextId === 0) {
        return;
    }
    const context = __classPrivateFieldGet(this, _Page_frameManager, "f").executionContextById(event.executionContextId, __classPrivateFieldGet(this, _Page_client, "f"));
    const values = event.args.map((arg) => {
        return (0, JSHandle_1._createJSHandle)(context, arg);
    });
    __classPrivateFieldGet(this, _Page_instances, "m", _Page_addConsoleMessage).call(this, event.type, values, event.stackTrace);
}, _Page_onBindingCalled = async function _Page_onBindingCalled(event) {
    let payload;
    try {
        payload = JSON.parse(event.payload);
    }
    catch (_a) {
        // The binding was either called by something in the page or it was
        // called before our wrapper was initialized.
        return;
    }
    const { type, name, seq, args } = payload;
    if (type !== 'exposedFun' || !__classPrivateFieldGet(this, _Page_pageBindings, "f").has(name)) {
        return;
    }
    let expression = null;
    try {
        const pageBinding = __classPrivateFieldGet(this, _Page_pageBindings, "f").get(name);
        (0, assert_1.assert)(pageBinding);
        const result = await pageBinding(...args);
        expression = (0, util_1.pageBindingDeliverResultString)(name, seq, result);
    }
    catch (_error) {
        if ((0, util_1.isErrorLike)(_error)) {
            expression = (0, util_1.pageBindingDeliverErrorString)(name, seq, _error.message, _error.stack);
        }
        else {
            expression = (0, util_1.pageBindingDeliverErrorValueString)(name, seq, _error);
        }
    }
    __classPrivateFieldGet(this, _Page_client, "f").send('Runtime.evaluate', {
        expression,
        contextId: event.executionContextId,
    });
}, _Page_addConsoleMessage = function _Page_addConsoleMessage(eventType, args, stackTrace) {
    if (!this.listenerCount("console" /* PageEmittedEvents.Console */)) {
        args.forEach((arg) => {
            return arg.dispose();
        });
        return;
    }
    const textTokens = [];
    for (const arg of args) {
        const remoteObject = arg._remoteObject;
        if (remoteObject.objectId) {
            textTokens.push(arg.toString());
        }
        else {
            textTokens.push((0, util_1.valueFromRemoteObject)(remoteObject));
        }
    }
    const stackTraceLocations = [];
    if (stackTrace) {
        for (const callFrame of stackTrace.callFrames) {
            stackTraceLocations.push({
                url: callFrame.url,
                lineNumber: callFrame.lineNumber,
                columnNumber: callFrame.columnNumber,
            });
        }
    }
    const message = new ConsoleMessage_1.ConsoleMessage(eventType, textTokens.join(' '), args, stackTraceLocations);
    this.emit("console" /* PageEmittedEvents.Console */, message);
};