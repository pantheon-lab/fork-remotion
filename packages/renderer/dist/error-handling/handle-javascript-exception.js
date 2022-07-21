"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJavascriptException = exports.ErrorWithStackFrame = void 0;
const remotion_1 = require("remotion");
const symbolicateable_error_1 = require("./symbolicateable-error");
class ErrorWithStackFrame extends Error {
    constructor({ message, symbolicatedStackFrames, frame, name, delayRenderCall, }) {
        super(message);
        this.symbolicatedStackFrames = symbolicatedStackFrames;
        this.frame = frame;
        this.name = name;
        this.delayRenderCall = delayRenderCall;
    }
}
exports.ErrorWithStackFrame = ErrorWithStackFrame;
const cleanUpErrorMessage = (exception) => {
    var _a, _b, _c, _d;
    let errorMessage = (_a = exception.exceptionDetails.exception) === null || _a === void 0 ? void 0 : _a.description;
    const errorType = (_b = exception.exceptionDetails.exception) === null || _b === void 0 ? void 0 : _b.className;
    const prefix = `${errorType}: `;
    if (errorMessage.startsWith(prefix)) {
        errorMessage = errorMessage.substring(prefix.length);
    }
    const frames = (_d = (_c = exception.exceptionDetails.stackTrace) === null || _c === void 0 ? void 0 : _c.callFrames.length) !== null && _d !== void 0 ? _d : 0;
    const split = errorMessage.split('\n');
    return split.slice(0, Math.max(1, split.length - frames)).join('\n');
};
const removeDelayRenderStack = (message) => {
    const index = message.indexOf(remotion_1.Internals.DELAY_RENDER_CALLSTACK_TOKEN);
    if (index === -1) {
        return message;
    }
    return message.substring(0, index);
};
const callFrameToStackFrame = (callFrame) => {
    return {
        columnNumber: callFrame.columnNumber,
        fileName: callFrame.url,
        functionName: callFrame.functionName,
        lineNumber: callFrame.lineNumber,
    };
};
const handleJavascriptException = ({ page, onError, frame, }) => {
    const client = page._client();
    const handler = (exception) => {
        var _a, _b, _c;
        const rawErrorMessage = (_a = exception.exceptionDetails.exception) === null || _a === void 0 ? void 0 : _a.description;
        const cleanErrorMessage = cleanUpErrorMessage(exception);
        if (!exception.exceptionDetails.stackTrace) {
            const err = new Error(removeDelayRenderStack(cleanErrorMessage));
            err.stack = rawErrorMessage;
            onError(err);
            return;
        }
        const errorType = (_b = exception.exceptionDetails.exception) === null || _b === void 0 ? void 0 : _b.className;
        const symbolicatedErr = new symbolicateable_error_1.SymbolicateableError({
            message: removeDelayRenderStack(cleanErrorMessage),
            stackFrame: exception.exceptionDetails.stackTrace.callFrames.map((f) => callFrameToStackFrame(f)),
            frame,
            name: errorType,
            stack: (_c = exception.exceptionDetails.exception) === null || _c === void 0 ? void 0 : _c.description,
        });
        onError(symbolicatedErr);
    };
    client.on('Runtime.exceptionThrown', handler);
    return () => {
        client.off('Runtime.exceptionThrown', handler);
    };
};
exports.handleJavascriptException = handleJavascriptException;
