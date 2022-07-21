"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/**
 * Source code is adapted from
 * https://github.com/webpack-contrib/webpack-hot-middleware#readme
 * and rewritten in TypeScript. This file is MIT licensed
 */
const process_update_1 = require("./process-update");
const strip_ansi_1 = require("./strip-ansi");
const types_1 = require("./types");
if (typeof window === 'undefined') {
    // do nothing
}
else if (typeof window.EventSource === 'undefined') {
    console.warn('Unsupported browser: You need a browser that supports EventSource ');
}
else {
    connect();
}
function eventSourceWrapper() {
    let source;
    let lastActivity = Date.now();
    const listeners = [];
    init();
    const timer = setInterval(() => {
        if (Date.now() - lastActivity > types_1.hotMiddlewareOptions.timeout) {
            handleDisconnect();
        }
    }, types_1.hotMiddlewareOptions.timeout / 2);
    function init() {
        source = new window.EventSource(types_1.hotMiddlewareOptions.path);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    function handleOnline() {
        lastActivity = Date.now();
    }
    function handleMessage(event) {
        lastActivity = Date.now();
        for (let i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    }
    function handleDisconnect() {
        clearInterval(timer);
        source.close();
        setTimeout(init, types_1.hotMiddlewareOptions.timeout);
    }
    return {
        addMessageListener(fn) {
            listeners.push(fn);
        },
    };
}
function getEventSourceWrapper() {
    if (!window.__whmEventSourceWrapper) {
        window.__whmEventSourceWrapper = {};
    }
    if (!window.__whmEventSourceWrapper[types_1.hotMiddlewareOptions.path]) {
        // cache the wrapper for other entries loaded on
        // the same page with the same hotMiddlewareOptions.path
        window.__whmEventSourceWrapper[types_1.hotMiddlewareOptions.path] =
            eventSourceWrapper();
    }
    return window.__whmEventSourceWrapper[types_1.hotMiddlewareOptions.path];
}
function connect() {
    getEventSourceWrapper().addMessageListener(handleMessage);
    function handleMessage(event) {
        if (event.data === '\uD83D\uDC93') {
            return;
        }
        try {
            processMessage(JSON.parse(event.data));
        }
        catch (ex) {
            if (types_1.hotMiddlewareOptions.warn) {
                console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
            }
        }
    }
}
// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
const singletonKey = '__webpack_hot_middleware_reporter__';
let reporter;
if (typeof window !== 'undefined') {
    if (!window[singletonKey]) {
        window[singletonKey] = createReporter();
    }
    reporter = window[singletonKey];
}
function createReporter() {
    const styles = {
        errors: 'color: #ff0000;',
        warnings: 'color: #999933;',
    };
    let previousProblems = null;
    function log(type, obj) {
        if (obj.action === 'building') {
            console.log('[Fast Refresh] Building');
            return;
        }
        const newProblems = obj[type]
            .map((msg) => {
            return (0, strip_ansi_1.stripAnsi)(msg);
        })
            .join('\n');
        if (previousProblems === newProblems) {
            return;
        }
        previousProblems = newProblems;
        const style = styles[type];
        const name = obj.name ? "'" + obj.name + "' " : '';
        const title = '[Fast Refresh] bundle ' + name + 'has ' + obj[type].length + ' ' + type;
        // NOTE: console.warn or console.error will print the stack trace
        // which isn't helpful here, so using console.log to escape it.
        if (console.group && console.groupEnd) {
            console.group('%c' + title, style);
            console.log('%c' + newProblems, style);
            console.groupEnd();
        }
        else {
            console.log('%c' + title + '\n\t%c' + newProblems.replace(/\n/g, '\n\t'), style + 'font-weight: bold;', style + 'font-weight: normal;');
        }
    }
    return {
        cleanProblemsCache() {
            previousProblems = null;
        },
        problems(type, obj) {
            if (types_1.hotMiddlewareOptions.warn) {
                log(type, obj);
            }
            return true;
        },
        success: () => undefined,
    };
}
function processMessage(obj) {
    var _a, _b;
    switch (obj.action) {
        case 'building':
            (_a = window.remotion_isBuilding) === null || _a === void 0 ? void 0 : _a.call(window);
            break;
        case 'sync':
        case 'built': {
            let applyUpdate = true;
            if (obj.errors.length > 0) {
                if (reporter)
                    reporter.problems('errors', obj);
                applyUpdate = false;
            }
            else if (obj.warnings.length > 0) {
                if (reporter) {
                    const overlayShown = reporter.problems('warnings', obj);
                    applyUpdate = overlayShown;
                }
            }
            else if (reporter) {
                reporter.cleanProblemsCache();
                reporter.success();
            }
            if (applyUpdate) {
                (_b = window.remotion_finishedBuilding) === null || _b === void 0 ? void 0 : _b.call(window);
                (0, process_update_1.processUpdate)(obj.hash, obj.modules, types_1.hotMiddlewareOptions);
            }
            break;
        }
        default:
            break;
    }
}
