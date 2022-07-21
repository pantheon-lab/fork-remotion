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
var _ConsoleMessage_stackTraceLocations;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleMessage = void 0;
class ConsoleMessage {
    constructor(type, text, args, stackTraceLocations) {
        _ConsoleMessage_stackTraceLocations.set(this, void 0);
        this.type = type;
        this.text = text;
        this.args = args;
        __classPrivateFieldSet(this, _ConsoleMessage_stackTraceLocations, stackTraceLocations, "f");
    }
    location() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _ConsoleMessage_stackTraceLocations, "f")[0]) !== null && _a !== void 0 ? _a : {};
    }
    stackTrace() {
        return __classPrivateFieldGet(this, _ConsoleMessage_stackTraceLocations, "f");
    }
}
exports.ConsoleMessage = ConsoleMessage;
_ConsoleMessage_stackTraceLocations = new WeakMap();
