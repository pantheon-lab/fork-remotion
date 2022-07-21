"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpack = exports.bundle = exports.BundlerInternals = void 0;
const index_html_1 = require("./index-html");
const webpack_cache_1 = require("./webpack-cache");
const webpack_config_1 = require("./webpack-config");
const esbuild = require("esbuild");
const webpack = require("webpack");
exports.webpack = webpack;
exports.BundlerInternals = {
    esbuild,
    webpackConfig: webpack_config_1.webpackConfig,
    indexHtml: index_html_1.indexHtml,
    cacheExists: webpack_cache_1.cacheExists,
    clearCache: webpack_cache_1.clearCache,
};
var bundle_1 = require("./bundle");
Object.defineProperty(exports, "bundle", { enumerable: true, get: function () { return bundle_1.bundle; } });
