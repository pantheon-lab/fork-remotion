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
var _FrameManager_instances, _FrameManager_page, _FrameManager_networkManager, _FrameManager_timeoutSettings, _FrameManager_frames, _FrameManager_contextIdToContext, _FrameManager_isolatedWorlds, _FrameManager_mainFrame, _FrameManager_client, _FrameManager_onAttachedToTarget, _FrameManager_onDetachedFromTarget, _FrameManager_onLifecycleEvent, _FrameManager_onFrameStartedLoading, _FrameManager_onFrameStoppedLoading, _FrameManager_handleFrameTree, _FrameManager_onFrameAttached, _FrameManager_onFrameNavigated, _FrameManager_onFrameNavigatedWithinDocument, _FrameManager_onFrameDetached, _FrameManager_onExecutionContextCreated, _FrameManager_onExecutionContextDestroyed, _FrameManager_onExecutionContextsCleared, _FrameManager_removeFramesRecursively, _Frame_parentFrame, _Frame_url, _Frame_client;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = exports.FrameManager = exports.FrameManagerEmittedEvents = void 0;
const assert_1 = require("./assert");
const Connection_1 = require("./Connection");
const DOMWorld_1 = require("./DOMWorld");
const EventEmitter_1 = require("./EventEmitter");
const ExecutionContext_1 = require("./ExecutionContext");
const LifecycleWatcher_1 = require("./LifecycleWatcher");
const NetworkManager_1 = require("./NetworkManager");
const util_1 = require("./util");
const UTILITY_WORLD_NAME = '__puppeteer_utility_world__';
exports.FrameManagerEmittedEvents = {
    FrameNavigated: Symbol('FrameManager.FrameNavigated'),
    FrameDetached: Symbol('FrameManager.FrameDetached'),
    FrameSwapped: Symbol('FrameManager.FrameSwapped'),
    LifecycleEvent: Symbol('FrameManager.LifecycleEvent'),
    FrameNavigatedWithinDocument: Symbol('FrameManager.FrameNavigatedWithinDocument'),
    ExecutionContextCreated: Symbol('FrameManager.ExecutionContextCreated'),
    ExecutionContextDestroyed: Symbol('FrameManager.ExecutionContextDestroyed'),
};
class FrameManager extends EventEmitter_1.EventEmitter {
    constructor(client, page, timeoutSettings) {
        super();
        _FrameManager_instances.add(this);
        _FrameManager_page.set(this, void 0);
        _FrameManager_networkManager.set(this, void 0);
        _FrameManager_timeoutSettings.set(this, void 0);
        _FrameManager_frames.set(this, new Map());
        _FrameManager_contextIdToContext.set(this, new Map());
        _FrameManager_isolatedWorlds.set(this, new Set());
        _FrameManager_mainFrame.set(this, void 0);
        _FrameManager_client.set(this, void 0);
        __classPrivateFieldSet(this, _FrameManager_client, client, "f");
        __classPrivateFieldSet(this, _FrameManager_page, page, "f");
        __classPrivateFieldSet(this, _FrameManager_networkManager, new NetworkManager_1.NetworkManager(client, this), "f");
        __classPrivateFieldSet(this, _FrameManager_timeoutSettings, timeoutSettings, "f");
        this.setupEventListeners(__classPrivateFieldGet(this, _FrameManager_client, "f"));
    }
    get _timeoutSettings() {
        return __classPrivateFieldGet(this, _FrameManager_timeoutSettings, "f");
    }
    get _client() {
        return __classPrivateFieldGet(this, _FrameManager_client, "f");
    }
    setupEventListeners(session) {
        session.on('Page.frameAttached', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameAttached).call(this, session, event.frameId, event.parentFrameId);
        });
        session.on('Page.frameNavigated', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigated).call(this, event.frame);
        });
        session.on('Page.navigatedWithinDocument', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigatedWithinDocument).call(this, event.frameId, event.url);
        });
        session.on('Page.frameDetached', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameDetached).call(this, event.frameId, event.reason);
        });
        session.on('Page.frameStartedLoading', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameStartedLoading).call(this, event.frameId);
        });
        session.on('Page.frameStoppedLoading', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameStoppedLoading).call(this, event.frameId);
        });
        session.on('Runtime.executionContextCreated', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextCreated).call(this, event.context, session);
        });
        session.on('Runtime.executionContextDestroyed', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextDestroyed).call(this, event.executionContextId, session);
        });
        session.on('Runtime.executionContextsCleared', () => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextsCleared).call(this, session);
        });
        session.on('Page.lifecycleEvent', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onLifecycleEvent).call(this, event);
        });
        session.on('Target.attachedToTarget', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onAttachedToTarget).call(this, event);
        });
        session.on('Target.detachedFromTarget', (event) => {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onDetachedFromTarget).call(this, event);
        });
    }
    async initialize(client = __classPrivateFieldGet(this, _FrameManager_client, "f")) {
        try {
            const result = await Promise.all([
                client.send('Page.enable'),
                client.send('Page.getFrameTree'),
                client === __classPrivateFieldGet(this, _FrameManager_client, "f")
                    ? Promise.resolve()
                    : client.send('Target.setAutoAttach', {
                        autoAttach: true,
                        waitForDebuggerOnStart: false,
                        flatten: true,
                    }),
            ]);
            const { frameTree } = result[1];
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_handleFrameTree).call(this, client, frameTree);
            await Promise.all([
                client.send('Page.setLifecycleEventsEnabled', { enabled: true }),
                client.send('Runtime.enable').then(() => {
                    return this._ensureIsolatedWorld(client, UTILITY_WORLD_NAME);
                }),
                client === __classPrivateFieldGet(this, _FrameManager_client, "f")
                    ? __classPrivateFieldGet(this, _FrameManager_networkManager, "f").initialize()
                    : Promise.resolve(),
            ]);
        }
        catch (error) {
            // The target might have been closed before the initialization finished.
            if ((0, util_1.isErrorLike)(error) &&
                (error.message.includes('Target closed') ||
                    error.message.includes('Session closed'))) {
                return;
            }
            throw error;
        }
    }
    networkManager() {
        return __classPrivateFieldGet(this, _FrameManager_networkManager, "f");
    }
    async navigateFrame(frame, url, options = {}) {
        const { referer = undefined, waitUntil = 'load', timeout = __classPrivateFieldGet(this, _FrameManager_timeoutSettings, "f").navigationTimeout(), } = options;
        const watcher = new LifecycleWatcher_1.LifecycleWatcher(this, frame, waitUntil, timeout);
        let error = await Promise.race([
            navigate(__classPrivateFieldGet(this, _FrameManager_client, "f"), url, referer, frame._id),
            watcher.timeoutOrTerminationPromise(),
        ]);
        if (!error) {
            error = await Promise.race([
                watcher.timeoutOrTerminationPromise(),
                watcher.newDocumentNavigationPromise(),
                watcher.sameDocumentNavigationPromise(),
            ]);
        }
        watcher.dispose();
        if (error) {
            throw error;
        }
        return watcher.navigationResponse();
        async function navigate(client, _url, referrer, frameId) {
            try {
                const response = await client.send('Page.navigate', {
                    url: _url,
                    referrer,
                    frameId,
                });
                return response.errorText
                    ? new Error(`${response.errorText} at ${_url}`)
                    : null;
            }
            catch (_error) {
                if ((0, util_1.isErrorLike)(_error)) {
                    return _error;
                }
                throw _error;
            }
        }
    }
    page() {
        return __classPrivateFieldGet(this, _FrameManager_page, "f");
    }
    mainFrame() {
        (0, assert_1.assert)(__classPrivateFieldGet(this, _FrameManager_mainFrame, "f"), 'Requesting main frame too early!');
        return __classPrivateFieldGet(this, _FrameManager_mainFrame, "f");
    }
    frames() {
        return Array.from(__classPrivateFieldGet(this, _FrameManager_frames, "f").values());
    }
    frame(frameId) {
        return __classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId) || null;
    }
    async _ensureIsolatedWorld(session, name) {
        const key = `${session.id()}:${name}`;
        if (__classPrivateFieldGet(this, _FrameManager_isolatedWorlds, "f").has(key)) {
            return;
        }
        __classPrivateFieldGet(this, _FrameManager_isolatedWorlds, "f").add(key);
        await session.send('Page.addScriptToEvaluateOnNewDocument', {
            source: `//# sourceURL=${ExecutionContext_1.EVALUATION_SCRIPT_URL}`,
            worldName: name,
        });
        // Frames might be removed before we send this.
        await Promise.all(this.frames()
            .filter((frame) => {
            return frame._client() === session;
        })
            .map((frame) => {
            return session
                .send('Page.createIsolatedWorld', {
                frameId: frame._id,
                worldName: name,
                grantUniveralAccess: true,
            })
                .catch(() => undefined);
        }));
    }
    executionContextById(contextId, session = __classPrivateFieldGet(this, _FrameManager_client, "f")) {
        const key = `${session.id()}:${contextId}`;
        const context = __classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").get(key);
        (0, assert_1.assert)(context, 'INTERNAL ERROR: missing context with id = ' + contextId);
        return context;
    }
}
exports.FrameManager = FrameManager;
_FrameManager_page = new WeakMap(), _FrameManager_networkManager = new WeakMap(), _FrameManager_timeoutSettings = new WeakMap(), _FrameManager_frames = new WeakMap(), _FrameManager_contextIdToContext = new WeakMap(), _FrameManager_isolatedWorlds = new WeakMap(), _FrameManager_mainFrame = new WeakMap(), _FrameManager_client = new WeakMap(), _FrameManager_instances = new WeakSet(), _FrameManager_onAttachedToTarget = async function _FrameManager_onAttachedToTarget(event) {
    if (event.targetInfo.type !== 'iframe') {
        return;
    }
    const frame = __classPrivateFieldGet(this, _FrameManager_frames, "f").get(event.targetInfo.targetId);
    const connection = Connection_1.Connection.fromSession(__classPrivateFieldGet(this, _FrameManager_client, "f"));
    (0, assert_1.assert)(connection);
    const session = connection.session(event.sessionId);
    (0, assert_1.assert)(session);
    if (frame) {
        frame._updateClient(session);
    }
    this.setupEventListeners(session);
    await this.initialize(session);
}, _FrameManager_onDetachedFromTarget = function _FrameManager_onDetachedFromTarget(event) {
    if (!event.targetId) {
        return;
    }
    const frame = __classPrivateFieldGet(this, _FrameManager_frames, "f").get(event.targetId);
    if (frame === null || frame === void 0 ? void 0 : frame.isOOPFrame()) {
        // When an OOP iframe is removed from the page, it
        // will only get a Target.detachedFromTarget event.
        __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, frame);
    }
}, _FrameManager_onLifecycleEvent = function _FrameManager_onLifecycleEvent(event) {
    const frame = __classPrivateFieldGet(this, _FrameManager_frames, "f").get(event.frameId);
    if (!frame) {
        return;
    }
    frame._onLifecycleEvent(event.loaderId, event.name);
    this.emit(exports.FrameManagerEmittedEvents.LifecycleEvent, frame);
}, _FrameManager_onFrameStartedLoading = function _FrameManager_onFrameStartedLoading(frameId) {
    const frame = __classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
    if (!frame) {
        return;
    }
    frame._onLoadingStarted();
}, _FrameManager_onFrameStoppedLoading = function _FrameManager_onFrameStoppedLoading(frameId) {
    const frame = __classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
    if (!frame) {
        return;
    }
    frame._onLoadingStopped();
    this.emit(exports.FrameManagerEmittedEvents.LifecycleEvent, frame);
}, _FrameManager_handleFrameTree = function _FrameManager_handleFrameTree(session, frameTree) {
    if (frameTree.frame.parentId) {
        __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameAttached).call(this, session, frameTree.frame.id, frameTree.frame.parentId);
    }
    __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigated).call(this, frameTree.frame);
    if (!frameTree.childFrames) {
        return;
    }
    for (const child of frameTree.childFrames) {
        __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_handleFrameTree).call(this, session, child);
    }
}, _FrameManager_onFrameAttached = function _FrameManager_onFrameAttached(session, frameId, parentFrameId) {
    if (__classPrivateFieldGet(this, _FrameManager_frames, "f").has(frameId)) {
        const _frame = __classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
        if (session && _frame.isOOPFrame()) {
            // If an OOP iframes becomes a normal iframe again
            // it is first attached to the parent page before
            // the target is removed.
            _frame._updateClient(session);
        }
        return;
    }
    (0, assert_1.assert)(parentFrameId);
    const parentFrame = __classPrivateFieldGet(this, _FrameManager_frames, "f").get(parentFrameId);
    (0, assert_1.assert)(parentFrame);
    const frame = new Frame(this, parentFrame, frameId, session);
    __classPrivateFieldGet(this, _FrameManager_frames, "f").set(frame._id, frame);
}, _FrameManager_onFrameNavigated = function _FrameManager_onFrameNavigated(framePayload) {
    const isMainFrame = !framePayload.parentId;
    let frame = isMainFrame
        ? __classPrivateFieldGet(this, _FrameManager_mainFrame, "f")
        : __classPrivateFieldGet(this, _FrameManager_frames, "f").get(framePayload.id);
    (0, assert_1.assert)(isMainFrame || frame, 'We either navigate top level or have old version of the navigated frame');
    // Detach all child frames first.
    if (frame) {
        for (const child of frame.childFrames()) {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, child);
        }
    }
    // Update or create main frame.
    if (isMainFrame) {
        if (frame) {
            // Update frame id to retain frame identity on cross-process navigation.
            __classPrivateFieldGet(this, _FrameManager_frames, "f").delete(frame._id);
            frame._id = framePayload.id;
        }
        else {
            // Initial main frame navigation.
            frame = new Frame(this, null, framePayload.id, __classPrivateFieldGet(this, _FrameManager_client, "f"));
        }
        __classPrivateFieldGet(this, _FrameManager_frames, "f").set(framePayload.id, frame);
        __classPrivateFieldSet(this, _FrameManager_mainFrame, frame, "f");
    }
    // Update frame payload.
    (0, assert_1.assert)(frame);
    frame._navigated(framePayload);
    this.emit(exports.FrameManagerEmittedEvents.FrameNavigated, frame);
}, _FrameManager_onFrameNavigatedWithinDocument = function _FrameManager_onFrameNavigatedWithinDocument(frameId, url) {
    const frame = __classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
    if (!frame) {
        return;
    }
    frame._navigatedWithinDocument(url);
    this.emit(exports.FrameManagerEmittedEvents.FrameNavigatedWithinDocument, frame);
    this.emit(exports.FrameManagerEmittedEvents.FrameNavigated, frame);
}, _FrameManager_onFrameDetached = function _FrameManager_onFrameDetached(frameId, reason) {
    const frame = __classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId);
    if (reason === 'remove') {
        // Only remove the frame if the reason for the detached event is
        // an actual removement of the frame.
        // For frames that become OOP iframes, the reason would be 'swap'.
        if (frame) {
            __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, frame);
        }
    }
    else if (reason === 'swap') {
        this.emit(exports.FrameManagerEmittedEvents.FrameSwapped, frame);
    }
}, _FrameManager_onExecutionContextCreated = function _FrameManager_onExecutionContextCreated(contextPayload, session) {
    const auxData = contextPayload.auxData;
    const frameId = auxData === null || auxData === void 0 ? void 0 : auxData.frameId;
    const frame = typeof frameId === 'string' ? __classPrivateFieldGet(this, _FrameManager_frames, "f").get(frameId) : undefined;
    let world;
    if (frame) {
        // Only care about execution contexts created for the current session.
        if (frame._client() !== session) {
            return;
        }
        if (contextPayload.auxData && Boolean(contextPayload.auxData.isDefault)) {
            world = frame._mainWorld;
        }
        else if (contextPayload.name === UTILITY_WORLD_NAME &&
            !frame._secondaryWorld._hasContext()) {
            // In case of multiple sessions to the same target, there's a race between
            // connections so we might end up creating multiple isolated worlds.
            // We can use either.
            world = frame._secondaryWorld;
        }
    }
    const context = new ExecutionContext_1.ExecutionContext((frame === null || frame === void 0 ? void 0 : frame._client()) || __classPrivateFieldGet(this, _FrameManager_client, "f"), contextPayload, world);
    if (world) {
        world._setContext(context);
    }
    const key = `${session.id()}:${contextPayload.id}`;
    __classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").set(key, context);
}, _FrameManager_onExecutionContextDestroyed = function _FrameManager_onExecutionContextDestroyed(executionContextId, session) {
    const key = `${session.id()}:${executionContextId}`;
    const context = __classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").get(key);
    if (!context) {
        return;
    }
    __classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").delete(key);
    if (context._world) {
        context._world._setContext(null);
    }
}, _FrameManager_onExecutionContextsCleared = function _FrameManager_onExecutionContextsCleared(session) {
    for (const [key, context] of __classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").entries()) {
        // Make sure to only clear execution contexts that belong
        // to the current session.
        if (context._client !== session) {
            continue;
        }
        if (context._world) {
            context._world._setContext(null);
        }
        __classPrivateFieldGet(this, _FrameManager_contextIdToContext, "f").delete(key);
    }
}, _FrameManager_removeFramesRecursively = function _FrameManager_removeFramesRecursively(frame) {
    for (const child of frame.childFrames()) {
        __classPrivateFieldGet(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, child);
    }
    frame._detach();
    __classPrivateFieldGet(this, _FrameManager_frames, "f").delete(frame._id);
    this.emit(exports.FrameManagerEmittedEvents.FrameDetached, frame);
};
class Frame {
    constructor(frameManager, parentFrame, frameId, client) {
        _Frame_parentFrame.set(this, void 0);
        _Frame_url.set(this, '');
        _Frame_client.set(this, void 0);
        this._loaderId = '';
        this._hasStartedLoading = false;
        this._lifecycleEvents = new Set();
        this._frameManager = frameManager;
        __classPrivateFieldSet(this, _Frame_parentFrame, parentFrame !== null && parentFrame !== void 0 ? parentFrame : null, "f");
        __classPrivateFieldSet(this, _Frame_url, '', "f");
        this._id = frameId;
        this._loaderId = '';
        this._childFrames = new Set();
        if (__classPrivateFieldGet(this, _Frame_parentFrame, "f")) {
            __classPrivateFieldGet(this, _Frame_parentFrame, "f")._childFrames.add(this);
        }
        this._updateClient(client);
    }
    _updateClient(client) {
        __classPrivateFieldSet(this, _Frame_client, client, "f");
        this._mainWorld = new DOMWorld_1.DOMWorld(this, this._frameManager._timeoutSettings);
        this._secondaryWorld = new DOMWorld_1.DOMWorld(this, this._frameManager._timeoutSettings);
    }
    isOOPFrame() {
        return __classPrivateFieldGet(this, _Frame_client, "f") !== this._frameManager._client;
    }
    goto(url, options = {}) {
        return this._frameManager.navigateFrame(this, url, options);
    }
    _client() {
        return __classPrivateFieldGet(this, _Frame_client, "f");
    }
    /**
     * @returns a promise that resolves to the frame's default execution context.
     */
    executionContext() {
        return this._mainWorld.executionContext();
    }
    evaluateHandle(pageFunction, ...args) {
        return this._mainWorld.evaluateHandle(pageFunction, ...args);
    }
    evaluate(pageFunction, ...args) {
        return this._mainWorld.evaluate(pageFunction, ...args);
    }
    url() {
        return __classPrivateFieldGet(this, _Frame_url, "f");
    }
    childFrames() {
        return Array.from(this._childFrames);
    }
    waitForFunction(browser, pageFunction, ...args) {
        return this._mainWorld.waitForFunction(browser, pageFunction, ...args);
    }
    _navigated(framePayload) {
        this._name = framePayload.name;
        __classPrivateFieldSet(this, _Frame_url, `${framePayload.url}${framePayload.urlFragment || ''}`, "f");
    }
    _navigatedWithinDocument(url) {
        __classPrivateFieldSet(this, _Frame_url, url, "f");
    }
    _onLifecycleEvent(loaderId, name) {
        if (name === 'init') {
            this._loaderId = loaderId;
            this._lifecycleEvents.clear();
        }
        this._lifecycleEvents.add(name);
    }
    _onLoadingStopped() {
        this._lifecycleEvents.add('load');
    }
    _onLoadingStarted() {
        this._hasStartedLoading = true;
    }
    _detach() {
        this._mainWorld._detach();
        this._secondaryWorld._detach();
        if (__classPrivateFieldGet(this, _Frame_parentFrame, "f")) {
            __classPrivateFieldGet(this, _Frame_parentFrame, "f")._childFrames.delete(this);
        }
        __classPrivateFieldSet(this, _Frame_parentFrame, null, "f");
    }
}
exports.Frame = Frame;
_Frame_parentFrame = new WeakMap(), _Frame_url = new WeakMap(), _Frame_client = new WeakMap();
