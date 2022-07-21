"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleOnCli = void 0;
const bundler_1 = require("@remotion/bundler");
const remotion_1 = require("remotion");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const progress_bar_1 = require("./progress-bar");
const bundleOnCli = async ({ fullPath, steps, }) => {
    var _a;
    const shouldCache = remotion_1.Internals.getWebpackCaching();
    const cacheExistedBefore = bundler_1.BundlerInternals.cacheExists('production');
    if (cacheExistedBefore && !shouldCache) {
        log_1.Log.info('🧹 Cache disabled but found. Deleting... ');
        await bundler_1.BundlerInternals.clearCache('production');
    }
    const bundleStartTime = Date.now();
    const bundlingProgress = (0, progress_bar_1.createOverwriteableCliOutput)((0, parse_command_line_1.quietFlagProvided)());
    const bundled = await (0, bundler_1.bundle)(fullPath, (progress) => {
        bundlingProgress.update((0, progress_bar_1.makeBundlingProgress)({
            progress: progress / 100,
            steps,
            doneIn: null,
        }));
    }, {
        enableCaching: shouldCache,
        webpackOverride: (_a = remotion_1.Internals.getWebpackOverrideFn()) !== null && _a !== void 0 ? _a : remotion_1.Internals.defaultOverrideFunction,
    });
    bundlingProgress.update((0, progress_bar_1.makeBundlingProgress)({
        progress: 1,
        steps,
        doneIn: Date.now() - bundleStartTime,
    }) + '\n');
    log_1.Log.verbose('Bundled under', bundled);
    const cacheExistedAfter = bundler_1.BundlerInternals.cacheExists('production');
    if (cacheExistedAfter && !cacheExistedBefore) {
        log_1.Log.info('⚡️ Cached bundle. Subsequent renders will be faster.');
    }
    return bundled;
};
exports.bundleOnCli = bundleOnCli;
