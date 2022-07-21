"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.puppeteerEvaluateWithCatch = void 0;
const JSHandle_1 = require("./browser/JSHandle");
const symbolicateable_error_1 = require("./error-handling/symbolicateable-error");
const parse_browser_error_stack_1 = require("./parse-browser-error-stack");
const EVALUATION_SCRIPT_URL = '__puppeteer_evaluation_script__';
const SOURCE_URL_REGEX = /^[\040\t]*\/\/[@#] sourceURL=\s*(\S*?)\s*$/m;
function valueFromRemoteObject(remoteObject) {
    if (remoteObject.unserializableValue) {
        if (remoteObject.type === 'bigint' && typeof BigInt !== 'undefined')
            return BigInt(remoteObject.unserializableValue.replace('n', ''));
        switch (remoteObject.unserializableValue) {
            case '-0':
                return -0;
            case 'NaN':
                return NaN;
            case 'Infinity':
                return Infinity;
            case '-Infinity':
                return -Infinity;
            default:
                throw new Error('Unsupported unserializable value: ' +
                    remoteObject.unserializableValue);
        }
    }
    return remoteObject.value;
}
function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}
async function puppeteerEvaluateWithCatch({ page, pageFunction, frame, args, }) {
    var _a, _b, _c, _d, _e, _f, _g;
    const contextId = (await page.mainFrame().executionContext())._contextId;
    const client = page._client();
    const suffix = `//# sourceURL=${EVALUATION_SCRIPT_URL}`;
    if (isString(pageFunction)) {
        const expression = pageFunction;
        const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression)
            ? expression
            : expression + '\n' + suffix;
        const { exceptionDetails: exceptDetails, result: remotObject } = (await client.send('Runtime.evaluate', {
            expression: expressionWithSourceUrl,
            contextId,
            returnByValue: true,
            awaitPromise: true,
            userGesture: true,
        }));
        if (exceptDetails === null || exceptDetails === void 0 ? void 0 : exceptDetails.exception) {
            const err = new symbolicateable_error_1.SymbolicateableError({
                stack: exceptDetails.exception.description,
                name: exceptDetails.exception.className,
                message: (_b = (_a = exceptDetails.exception.description) === null || _a === void 0 ? void 0 : _a.split('\n')) === null || _b === void 0 ? void 0 : _b[0],
                frame,
                stackFrame: (0, parse_browser_error_stack_1.parseStack)(exceptDetails.exception.description.split('\n')),
            });
            throw err;
        }
        return valueFromRemoteObject(remotObject);
    }
    if (typeof pageFunction !== 'function')
        throw new Error(`Expected to get |string| or |function| as the first argument, but got "${pageFunction}" instead.`);
    let functionText = pageFunction.toString();
    try {
        // eslint-disable-next-line no-new-func
        new Function('(' + functionText + ')');
    }
    catch (error) {
        // This means we might have a function shorthand. Try another
        // time prefixing 'function '.
        if (functionText.startsWith('async '))
            functionText =
                'async function ' + functionText.substring('async '.length);
        else
            functionText = 'function ' + functionText;
        try {
            // eslint-disable-next-line no-new-func
            new Function('(' + functionText + ')');
        }
        catch (err) {
            // We tried hard to serialize, but there's a weird beast here.
            throw new Error('Passed function is not well-serializable!');
        }
    }
    let callFunctionOnPromise;
    try {
        callFunctionOnPromise = client.send('Runtime.callFunctionOn', {
            functionDeclaration: functionText + '\n' + suffix + '\n',
            executionContextId: contextId,
            arguments: args.map((a) => convertArgument(a)),
            returnByValue: true,
            awaitPromise: true,
            userGesture: true,
        });
    }
    catch (error) {
        if (error instanceof TypeError &&
            error.message.startsWith('Converting circular structure to JSON'))
            error.message += ' Are you passing a nested JSHandle?';
        throw error;
    }
    const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise;
    if (exceptionDetails) {
        const err = new symbolicateable_error_1.SymbolicateableError({
            stack: (_c = exceptionDetails.exception) === null || _c === void 0 ? void 0 : _c.description,
            name: (_d = exceptionDetails.exception) === null || _d === void 0 ? void 0 : _d.className,
            message: (_f = (_e = exceptionDetails.exception) === null || _e === void 0 ? void 0 : _e.description) === null || _f === void 0 ? void 0 : _f.split('\n')[0],
            frame,
            stackFrame: (0, parse_browser_error_stack_1.parseStack)(((_g = exceptionDetails.exception) === null || _g === void 0 ? void 0 : _g.description).split('\n')),
        });
        throw err;
    }
    return valueFromRemoteObject(remoteObject);
}
exports.puppeteerEvaluateWithCatch = puppeteerEvaluateWithCatch;
/**
 * @param {*} arg
 * @returns {*}
 * @this {ExecutionContext}
 */
function convertArgument(arg) {
    if (typeof arg === 'number') {
        return { value: arg };
    }
    if (typeof arg === 'string') {
        return { value: arg };
    }
    if (typeof arg === 'boolean') {
        return { value: arg };
    }
    if (typeof arg === 'bigint')
        // eslint-disable-line valid-typeof
        return { unserializableValue: `${arg.toString()}n` };
    if (Object.is(arg, -0))
        return { unserializableValue: '-0' };
    if (Object.is(arg, Infinity))
        return { unserializableValue: 'Infinity' };
    if (Object.is(arg, -Infinity))
        return { unserializableValue: '-Infinity' };
    if (Object.is(arg, NaN))
        return { unserializableValue: 'NaN' };
    const objectHandle = arg && arg instanceof JSHandle_1.JSHandle ? arg : null;
    if (objectHandle) {
        if (objectHandle._disposed)
            throw new Error('JSHandle is disposed!');
        if (objectHandle._remoteObject.unserializableValue)
            return {
                unserializableValue: objectHandle._remoteObject.unserializableValue,
            };
        if (!objectHandle._remoteObject.objectId)
            return { value: objectHandle._remoteObject.value };
        return { objectId: objectHandle._remoteObject.objectId };
    }
    return { value: arg };
}
