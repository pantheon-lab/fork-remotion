"use strict";
/**
 * Source code is adapted from
 * https://github.com/webpack-contrib/webpack-hot-middleware#readme
 * and rewritten in TypeScript. This file is MIT licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackHotMiddleware = void 0;
const url_1 = require("url");
const log_1 = require("../../log");
const types_1 = require("./types");
const pathMatch = function (url, path) {
    try {
        return (0, url_1.parse)(url).pathname === path;
    }
    catch (e) {
        return false;
    }
};
const webpackHotMiddleware = (compiler) => {
    const eventStream = createEventStream(types_1.hotMiddlewareOptions.heartbeat);
    let latestStats = null;
    compiler.hooks.invalid.tap('remotion', onInvalid);
    compiler.hooks.done.tap('remotion', onDone);
    function onInvalid() {
        latestStats = null;
        log_1.Log.info('webpack building...');
        eventStream === null || eventStream === void 0 ? void 0 : eventStream.publish({
            action: 'building',
        });
    }
    function onDone(statsResult) {
        // Keep hold of latest stats so they can be propagated to new clients
        latestStats = statsResult;
        publishStats('built', latestStats, eventStream);
    }
    const middleware = function (req, res, next) {
        if (!pathMatch(req.url, types_1.hotMiddlewareOptions.path))
            return next();
        eventStream === null || eventStream === void 0 ? void 0 : eventStream.handler(req, res);
        if (latestStats) {
            publishStats('sync', latestStats, eventStream);
        }
    };
    return middleware;
};
exports.webpackHotMiddleware = webpackHotMiddleware;
function createEventStream(heartbeat) {
    let clientId = 0;
    let clients = {};
    function everyClient(fn) {
        Object.keys(clients).forEach((id) => {
            fn(clients[id]);
        });
    }
    const interval = setInterval(() => {
        everyClient((client) => {
            client.write('data: \uD83D\uDC93\n\n');
        });
    }, heartbeat).unref();
    return {
        close() {
            clearInterval(interval);
            everyClient((client) => {
                if (!client.finished)
                    client.end();
            });
            clients = {};
        },
        handler(req, res) {
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/event-stream;charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
            };
            const isHttp1 = !(parseInt(req.httpVersion, 10) >= 2);
            if (isHttp1) {
                req.socket.setKeepAlive(true);
                Object.assign(headers, {
                    Connection: 'keep-alive',
                });
            }
            res.writeHead(200, headers);
            res.write('\n');
            const id = clientId++;
            clients[id] = res;
            req.on('close', () => {
                if (!res.finished)
                    res.end();
                delete clients[id];
            });
        },
        publish(payload) {
            everyClient((client) => {
                client.write('data: ' + JSON.stringify(payload) + '\n\n');
            });
        },
    };
}
function publishStats(action, statsResult, eventStream) {
    const stats = statsResult.toJson({
        all: false,
        cached: true,
        children: true,
        modules: true,
        timings: true,
        hash: true,
    });
    // For multi-compiler, stats will be an object with a 'children' array of stats
    const bundles = extractBundles(stats);
    bundles.forEach((_stats) => {
        let name = _stats.name || '';
        // Fallback to compilation name in case of 1 bundle (if it exists)
        if (bundles.length === 1 && !name && statsResult.compilation) {
            name = statsResult.compilation.name || '';
        }
        log_1.Log.info(`webpack built in ${_stats.time}ms`);
        eventStream === null || eventStream === void 0 ? void 0 : eventStream.publish({
            name,
            action,
            time: _stats.time,
            hash: _stats.hash,
            warnings: _stats.warnings || [],
            errors: _stats.errors || [],
            modules: buildModuleMap(_stats.modules),
        });
    });
}
function extractBundles(stats) {
    var _a;
    // Stats has modules, single bundle
    if (stats.modules)
        return [stats];
    // Stats has children, multiple bundles
    if ((_a = stats.children) === null || _a === void 0 ? void 0 : _a.length)
        return stats.children;
    // Not sure, assume single
    return [stats];
}
function buildModuleMap(modules) {
    const map = {};
    if (!modules) {
        return map;
    }
    modules.forEach((module) => {
        const id = module.id;
        map[id] = module.name;
    });
    return map;
}
