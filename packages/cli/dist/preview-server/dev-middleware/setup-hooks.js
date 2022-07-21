"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupHooks = void 0;
const log_1 = require("../../log");
const is_color_supported_1 = require("./is-color-supported");
function setupHooks(context) {
    function invalid() {
        // We are now in invalid state
        context.state = false;
        context.stats = undefined;
    }
    function done(stats) {
        context.state = true;
        context.stats = stats;
        // Do the stuff in nextTick, because bundle may be invalidated if a change happened while compiling
        process.nextTick(() => {
            const { logger, state, callbacks } = context;
            // Check if still in valid state
            if (!state || !stats) {
                return;
            }
            logger.log('Compilation finished');
            const statsOptions = {
                preset: 'normal',
                colors: is_color_supported_1.isColorSupported,
            };
            const printedStats = stats.toString(statsOptions);
            // Avoid extra empty line when `stats: 'none'`
            if (printedStats) {
                log_1.Log.info(printedStats);
            }
            context.callbacks = [];
            callbacks.forEach((callback) => {
                callback(stats);
            });
        });
    }
    context.compiler.hooks.watchRun.tap('remotion', invalid);
    context.compiler.hooks.invalid.tap('remotion', invalid);
    context.compiler.hooks.done.tap('remotion', done);
}
exports.setupHooks = setupHooks;
