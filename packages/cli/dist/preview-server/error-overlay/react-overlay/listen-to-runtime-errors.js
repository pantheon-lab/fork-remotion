"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenToRuntimeErrors = exports.getErrorRecord = void 0;
const Overlay_1 = require("../remotion-overlay/Overlay");
const format_warning_1 = require("./effects/format-warning");
const proxy_console_1 = require("./effects/proxy-console");
const stack_trace_limit_1 = require("./effects/stack-trace-limit");
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const unhandled_error_1 = require("./effects/unhandled-error");
const unhandled_rejection_1 = require("./effects/unhandled-rejection");
const get_stack_frames_1 = require("./utils/get-stack-frames");
const CONTEXT_SIZE = 3;
const getErrorRecord = async (error) => {
    const stackFrames = await (0, get_stack_frames_1.getStackFrames)(error, CONTEXT_SIZE);
    if (stackFrames === null || stackFrames === undefined) {
        return null;
    }
    return {
        error,
        contextSize: CONTEXT_SIZE,
        stackFrames,
    };
};
exports.getErrorRecord = getErrorRecord;
const crashWithFrames = (crash) => (error) => {
    var _a;
    const didHookOrderChange = error.message.startsWith('Rendered fewer hooks') ||
        error.message.startsWith('Rendered more hooks');
    if (didHookOrderChange) {
        // eslint-disable-next-line no-console
        console.log('Hook order changed. Reloading app...');
        window.location.reload();
    }
    else {
        (_a = Overlay_1.setErrorsRef.current) === null || _a === void 0 ? void 0 : _a.addError(error);
        crash();
    }
};
function listenToRuntimeErrors(crash) {
    const crashWithFramesRunTime = crashWithFrames(crash);
    (0, unhandled_error_1.register)(window, (error) => {
        return crashWithFramesRunTime({
            message: error.message,
            stack: error.stack,
            name: error.name,
        });
    });
    (0, unhandled_rejection_1.register)(window, (error) => {
        return crashWithFramesRunTime(error);
    });
    (0, stack_trace_limit_1.register)();
    (0, proxy_console_1.registerReactStack)();
    (0, proxy_console_1.permanentRegister)('error', (d) => {
        if (d.type === 'webpack-error') {
            const { message, frames } = d;
            const data = (0, format_warning_1.massageWarning)(message, frames);
            crashWithFramesRunTime({
                message: data.message,
                stack: data.stack,
                name: '',
            });
        }
        if (d.type === 'build-error') {
            crashWithFramesRunTime(d.error);
        }
    });
    return function () {
        (0, stack_trace_limit_1.unregister)();
        (0, unhandled_rejection_1.unregister)(window);
        (0, unhandled_error_1.unregister)(window);
        (0, proxy_console_1.unregisterReactStack)();
    };
}
exports.listenToRuntimeErrors = listenToRuntimeErrors;