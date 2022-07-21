"use strict";
/* eslint-disable no-new-func */
/* eslint-disable no-new */
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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExecutionContext_instances, _ExecutionContext_evaluate;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionContext = exports.EVALUATION_SCRIPT_URL = void 0;
const JSHandle_1 = require("./JSHandle");
const util_1 = require("./util");
exports.EVALUATION_SCRIPT_URL = 'pptr://__puppeteer_evaluation_script__';
const SOURCE_URL_REGEX = /^[\040\t]*\/\/[@#] sourceURL=\s*(\S*?)\s*$/m;
class ExecutionContext {
    constructor(client, contextPayload, world) {
        _ExecutionContext_instances.add(this);
        this._client = client;
        this._world = world;
        this._contextId = contextPayload.id;
        this._contextName = contextPayload.name;
    }
    frame() {
        return this._world ? this._world.frame() : null;
    }
    evaluate(pageFunction, ...args) {
        return __classPrivateFieldGet(this, _ExecutionContext_instances, "m", _ExecutionContext_evaluate).call(this, true, pageFunction, ...args);
    }
    evaluateHandle(pageFunction, ...args) {
        return __classPrivateFieldGet(this, _ExecutionContext_instances, "m", _ExecutionContext_evaluate).call(this, false, pageFunction, ...args);
    }
}
exports.ExecutionContext = ExecutionContext;
_ExecutionContext_instances = new WeakSet(), _ExecutionContext_evaluate = async function _ExecutionContext_evaluate(returnByValue, pageFunction, ...args) {
    const suffix = `//# sourceURL=${exports.EVALUATION_SCRIPT_URL}`;
    if ((0, util_1.isString)(pageFunction)) {
        const contextId = this._contextId;
        const expression = pageFunction;
        const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression)
            ? expression
            : expression + '\n' + suffix;
        const { exceptionDetails: _details, result: _remoteObject } = await this._client
            .send('Runtime.evaluate', {
            expression: expressionWithSourceUrl,
            contextId,
            returnByValue,
            awaitPromise: true,
            userGesture: true,
        })
            .catch(rewriteError);
        if (_details) {
            throw new Error('Evaluation failed: ' + (0, util_1.getExceptionMessage)(_details));
        }
        return returnByValue
            ? (0, util_1.valueFromRemoteObject)(_remoteObject)
            : (0, JSHandle_1._createJSHandle)(this, _remoteObject);
    }
    if (typeof pageFunction !== 'function') {
        throw new Error(`Expected to get |string| or |function| as the first argument, but got "${pageFunction}" instead.`);
    }
    let functionText = pageFunction.toString();
    try {
        new Function('(' + functionText + ')');
    }
    catch (error) {
        // This means we might have a function shorthand. Try another
        // time prefixing 'function '.
        if (functionText.startsWith('async ')) {
            functionText =
                'async function ' + functionText.substring('async '.length);
        }
        else {
            functionText = 'function ' + functionText;
        }
        try {
            new Function('(' + functionText + ')');
        }
        catch (_error) {
            // We tried hard to serialize, but there's a weird beast here.
            throw new Error('Passed function is not well-serializable!');
        }
    }
    let callFunctionOnPromise;
    try {
        callFunctionOnPromise = this._client.send('Runtime.callFunctionOn', {
            functionDeclaration: functionText + '\n' + suffix + '\n',
            executionContextId: this._contextId,
            arguments: args.map(convertArgument.bind(this)),
            returnByValue,
            awaitPromise: true,
            userGesture: true,
        });
    }
    catch (error) {
        if (error instanceof TypeError &&
            error.message.startsWith('Converting circular structure to JSON')) {
            error.message += ' Recursive objects are not allowed.';
        }
        throw error;
    }
    const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError);
    if (exceptionDetails) {
        throw new Error('Evaluation failed: ' + (0, util_1.getExceptionMessage)(exceptionDetails));
    }
    return returnByValue
        ? (0, util_1.valueFromRemoteObject)(remoteObject)
        : (0, JSHandle_1._createJSHandle)(this, remoteObject);
    function convertArgument(arg) {
        if (typeof arg === 'bigint') {
            // eslint-disable-line valid-typeof
            return { unserializableValue: `${arg.toString()}n` };
        }
        if (Object.is(arg, -0)) {
            return { unserializableValue: '-0' };
        }
        if (Object.is(arg, Infinity)) {
            return { unserializableValue: 'Infinity' };
        }
        if (Object.is(arg, -Infinity)) {
            return { unserializableValue: '-Infinity' };
        }
        if (Object.is(arg, NaN)) {
            return { unserializableValue: 'NaN' };
        }
        const objectHandle = arg && arg instanceof JSHandle_1.JSHandle ? arg : null;
        if (objectHandle) {
            if (objectHandle._context !== this) {
                throw new Error('JSHandles can be evaluated only in the context they were created!');
            }
            if (objectHandle._disposed) {
                throw new Error('JSHandle is disposed!');
            }
            if (objectHandle._remoteObject.unserializableValue) {
                return {
                    unserializableValue: objectHandle._remoteObject.unserializableValue,
                };
            }
            if (!objectHandle._remoteObject.objectId) {
                return { value: objectHandle._remoteObject.value };
            }
            return { objectId: objectHandle._remoteObject.objectId };
        }
        return { value: arg };
    }
    function rewriteError(error) {
        if (error.message.includes('Object reference chain is too long')) {
            return { result: { type: 'undefined' } };
        }
        if (error.message.includes("Object couldn't be returned by value")) {
            return { result: { type: 'undefined' } };
        }
        if (error.message.endsWith('Cannot find context with specified id') ||
            error.message.endsWith('Inspected target navigated or closed')) {
            throw new Error('Execution context was destroyed, most likely because of a navigation.');
        }
        throw error;
    }
};