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
var _JSHandle_client, _JSHandle_disposed, _JSHandle_context, _JSHandle_remoteObject;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementHandle = exports.JSHandle = exports._createJSHandle = void 0;
const util_1 = require("./util");
function _createJSHandle(context, remoteObject) {
    const frame = context.frame();
    if (remoteObject.subtype === 'node' && frame) {
        return new ElementHandle(context, context._client, remoteObject);
    }
    return new JSHandle(context, context._client, remoteObject);
}
exports._createJSHandle = _createJSHandle;
class JSHandle {
    constructor(context, client, remoteObject) {
        _JSHandle_client.set(this, void 0);
        _JSHandle_disposed.set(this, false);
        _JSHandle_context.set(this, void 0);
        _JSHandle_remoteObject.set(this, void 0);
        __classPrivateFieldSet(this, _JSHandle_context, context, "f");
        __classPrivateFieldSet(this, _JSHandle_client, client, "f");
        __classPrivateFieldSet(this, _JSHandle_remoteObject, remoteObject, "f");
    }
    get _disposed() {
        return __classPrivateFieldGet(this, _JSHandle_disposed, "f");
    }
    get _remoteObject() {
        return __classPrivateFieldGet(this, _JSHandle_remoteObject, "f");
    }
    get _context() {
        return __classPrivateFieldGet(this, _JSHandle_context, "f");
    }
    executionContext() {
        return __classPrivateFieldGet(this, _JSHandle_context, "f");
    }
    evaluateHandle(pageFunction, ...args) {
        return this.executionContext().evaluateHandle(pageFunction, this, ...args);
    }
    asElement() {
        return null;
    }
    async dispose() {
        if (__classPrivateFieldGet(this, _JSHandle_disposed, "f")) {
            return;
        }
        __classPrivateFieldSet(this, _JSHandle_disposed, true, "f");
        await (0, util_1.releaseObject)(__classPrivateFieldGet(this, _JSHandle_client, "f"), __classPrivateFieldGet(this, _JSHandle_remoteObject, "f"));
    }
    toString() {
        if (__classPrivateFieldGet(this, _JSHandle_remoteObject, "f").objectId) {
            const type = __classPrivateFieldGet(this, _JSHandle_remoteObject, "f").subtype || __classPrivateFieldGet(this, _JSHandle_remoteObject, "f").type;
            return 'JSHandle@' + type;
        }
        return 'JSHandle:' + (0, util_1.valueFromRemoteObject)(__classPrivateFieldGet(this, _JSHandle_remoteObject, "f"));
    }
}
exports.JSHandle = JSHandle;
_JSHandle_client = new WeakMap(), _JSHandle_disposed = new WeakMap(), _JSHandle_context = new WeakMap(), _JSHandle_remoteObject = new WeakMap();
class ElementHandle extends JSHandle {
    asElement() {
        return this;
    }
}
exports.ElementHandle = ElementHandle;
