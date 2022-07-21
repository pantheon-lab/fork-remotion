"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheExists = exports.getWebpackCacheName = exports.clearCache = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Inlined from https://github.com/webpack/webpack/blob/4c2ee7a4ddb8db2362ca83b6c4190523387ba7ee/lib/config/defaults.js#L265
// An algorithm to determine where Webpack will cache the depencies
const getWebpackCacheDir = () => {
    const cwd = process.cwd();
    let dir = cwd;
    for (;;) {
        try {
            if (fs_1.default.statSync(path_1.default.join(dir, 'package.json')).isFile()) {
                break;
            }
            // eslint-disable-next-line no-empty
        }
        catch (e) { }
        const parent = path_1.default.dirname(dir);
        if (dir === parent) {
            dir = undefined;
            break;
        }
        dir = parent;
    }
    if (!dir) {
        return path_1.default.resolve(cwd, '.cache/webpack');
    }
    if (process.versions.pnp === '1') {
        return path_1.default.resolve(dir, '.pnp/.cache/webpack');
    }
    if (process.versions.pnp === '3') {
        return path_1.default.resolve(dir, '.yarn/.cache/webpack');
    }
    return path_1.default.resolve(dir, 'node_modules/.cache/webpack');
};
const remotionCacheLocation = (environment, hash) => {
    return path_1.default.join(getWebpackCacheDir(), (0, exports.getWebpackCacheName)(environment, hash));
};
const clearCache = () => {
    var _a;
    return ((_a = fs_1.default.promises.rm) !== null && _a !== void 0 ? _a : fs_1.default.promises.rmdir)(getWebpackCacheDir(), {
        recursive: true,
    });
};
exports.clearCache = clearCache;
const getPrefix = (environment) => {
    return `remotion-v4-${environment}`;
};
const getWebpackCacheName = (environment, hash) => {
    if (environment === 'development') {
        return `${getPrefix(environment)}-${hash}`;
    }
    // In production, the cache is independent from input props because
    // they are passed over URL params. Speed is mostly important in production.
    return `${getPrefix(environment)}-${hash}`;
};
exports.getWebpackCacheName = getWebpackCacheName;
const hasOtherCache = (environment) => {
    const cacheDir = fs_1.default.readdirSync(getWebpackCacheDir());
    if (cacheDir.find((c) => {
        return c.startsWith(getPrefix(environment));
    })) {
        return true;
    }
    return false;
};
const cacheExists = (environment, hash) => {
    if (fs_1.default.existsSync(remotionCacheLocation(environment, hash))) {
        return 'exists';
    }
    if (!fs_1.default.existsSync(getWebpackCacheDir())) {
        return 'does-not-exist';
    }
    if (hasOtherCache(environment)) {
        return 'other-exists';
    }
    return 'does-not-exist';
};
exports.cacheExists = cacheExists;
