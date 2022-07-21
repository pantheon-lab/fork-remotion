"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommonError = void 0;
const log_1 = require("./log");
const print_error_1 = require("./print-error");
const handleCommonError = async (err) => {
    await (0, print_error_1.printError)(err);
    if (err.message.includes('Could not play video with')) {
        log_1.Log.info();
        log_1.Log.info('💡 Get help for this issue at https://remotion.dev/docs/media-playback-error');
    }
    if (err.message.includes('A delayRender was called')) {
        log_1.Log.info();
        log_1.Log.info('💡 Get help for this issue at https://remotion.dev/docs/timeout');
    }
    if (err.message.includes('Target closed')) {
        log_1.Log.info();
        log_1.Log.info('💡 Get help for this issue at https://remotion.dev/docs/target-closed');
    }
    if (err.message.includes('ENAMETOOLONG')) {
        log_1.Log.info();
        log_1.Log.info('💡 Get help for this issue at https://remotion.dev/docs/enametoolong');
    }
};
exports.handleCommonError = handleCommonError;
