"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbolicateError = void 0;
const symbolicate_stacktrace_1 = require("../symbolicate-stacktrace");
const handle_javascript_exception_1 = require("./handle-javascript-exception");
const symbolicateError = async (symbolicateableError) => {
    const { delayRenderCall, stackFrame } = symbolicateableError;
    const [mainErrorFrames, delayRenderFrames] = await Promise.all([
        stackFrame ? (0, symbolicate_stacktrace_1.symbolicateStackTrace)(stackFrame) : null,
        delayRenderCall ? (0, symbolicate_stacktrace_1.symbolicateStackTrace)(delayRenderCall) : null,
    ]);
    const symbolicatedErr = new handle_javascript_exception_1.ErrorWithStackFrame({
        message: symbolicateableError.message,
        symbolicatedStackFrames: mainErrorFrames,
        frame: symbolicateableError.frame,
        name: symbolicateableError.name,
        delayRenderCall: delayRenderFrames,
    });
    return symbolicatedErr;
};
exports.symbolicateError = symbolicateError;
