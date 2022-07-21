"use strict";
/* eslint-disable no-console */
/**
 * Source code is adapted from
 * https://github.com/webpack-contrib/webpack-hot-middleware#readme
 * and rewritten in TypeScript. This file is MIT licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUpdate = void 0;
/* global  __webpack_hash__ */
if (!module.hot) {
    throw new Error('[Fast refresh] Hot Module Replacement is disabled.');
}
const hmrDocsUrl = 'https://webpack.js.org/concepts/hot-module-replacement/'; // eslint-disable-line max-len
let lastHash;
const failureStatuses = { abort: 1, fail: 1 };
const applyOptions = {
    ignoreUnaccepted: true,
    ignoreDeclined: true,
    ignoreErrored: true,
    onUnaccepted(data) {
        var _a;
        console.warn('Ignored an update to unaccepted module ' +
            ((_a = data.chain) !== null && _a !== void 0 ? _a : []).join(' -> '));
    },
    onDeclined(data) {
        var _a;
        console.warn('Ignored an update to declined module ' + ((_a = data.chain) !== null && _a !== void 0 ? _a : []).join(' -> '));
    },
    onErrored(data) {
        console.error(data.error);
        console.warn('Ignored an error while updating module ' +
            data.moduleId +
            ' (' +
            data.type +
            ')');
    },
};
function upToDate(hash) {
    if (hash)
        lastHash = hash;
    return lastHash === __webpack_hash__;
}
const processUpdate = function (hash, moduleMap, options) {
    var _a;
    const { reload } = options;
    if (!upToDate(hash) && ((_a = module.hot) === null || _a === void 0 ? void 0 : _a.status()) === 'idle') {
        check();
    }
    async function check() {
        var _a;
        const cb = function (err, updatedModules) {
            var _a;
            if (err)
                return handleError(err);
            if (!updatedModules) {
                if (options.warn) {
                    console.warn('[Fast refresh] Cannot find update (Full reload needed)');
                    console.warn('[Fast refresh] (Probably because of restarting the server)');
                }
                performReload();
                return null;
            }
            const applyCallback = function (applyErr, renewedModules) {
                if (applyErr)
                    return handleError(applyErr);
                if (!upToDate()) {
                    check();
                }
                logUpdates(updatedModules, renewedModules);
            };
            const applyResult = (_a = module.hot) === null || _a === void 0 ? void 0 : _a.apply(applyOptions, applyCallback);
            if (applyResult === null || applyResult === void 0 ? void 0 : applyResult.then) {
                // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
                applyResult
                    .then((outdatedModules) => {
                    applyCallback(null, outdatedModules);
                })
                    .catch((_err) => applyCallback(_err, []));
            }
        };
        try {
            const result = await ((_a = module.hot) === null || _a === void 0 ? void 0 : _a.check(false, cb));
            cb(null, result);
        }
        catch (err) {
            cb(err, []);
        }
    }
    function logUpdates(updatedModules, renewedModules) {
        var _a;
        const unacceptedModules = (_a = updatedModules === null || updatedModules === void 0 ? void 0 : updatedModules.filter((moduleId) => {
            return renewedModules && renewedModules.indexOf(moduleId) < 0;
        })) !== null && _a !== void 0 ? _a : [];
        if (unacceptedModules.length > 0) {
            if (options.warn) {
                console.warn("[Fast refresh] The following modules couldn't be hot updated: " +
                    '(Full reload needed)\n' +
                    'This is usually because the modules which have changed ' +
                    '(and their parents) do not know how to hot reload themselves. ' +
                    'See ' +
                    hmrDocsUrl +
                    ' for more details.');
                unacceptedModules.forEach((moduleId) => {
                    console.warn('[Fast refresh]  - ' + (moduleMap[moduleId] || moduleId));
                });
            }
            performReload();
            return;
        }
        if (!renewedModules || renewedModules.length === 0) {
            console.log('[Fast refresh] Nothing hot updated.');
        }
        else {
            renewedModules.forEach((moduleId) => {
                console.log(`[Fast refresh] ${moduleMap[moduleId] || moduleId} fast refreshed.`);
            });
        }
    }
    function handleError(err) {
        var _a, _b;
        if (((_b = (_a = module.hot) === null || _a === void 0 ? void 0 : _a.status()) !== null && _b !== void 0 ? _b : 'nope') in failureStatuses) {
            if (options.warn) {
                console.warn('[Fast refresh] Cannot check for update (Full reload needed)');
                console.warn('[Fast refresh] ' + (err.stack || err.message));
            }
            performReload();
            return;
        }
        if (options.warn) {
            console.warn('[Fast refresh] Update check failed: ' + (err.stack || err.message));
            window.location.reload();
        }
    }
    function performReload() {
        if (!reload) {
            return;
        }
        if (options.warn)
            console.warn('[Fast refresh] Reloading page');
        window.location.reload();
    }
};
exports.processUpdate = processUpdate;
