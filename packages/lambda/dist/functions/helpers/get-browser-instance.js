"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowserInstance = void 0;
const renderer_1 = require("@remotion/renderer");
const get_chromium_executable_path_1 = require("./get-chromium-executable-path");
let _browserInstance;
let launching = false;
const waitForLaunched = () => {
    return new Promise((resolve, reject) => {
        const check = () => setTimeout(() => {
            if (launching) {
                resolve();
            }
            else {
                check();
            }
        }, 16);
        setTimeout(() => reject(new Error('Timeout launching browser')), 5000);
        check();
    });
};
const getBrowserInstance = async (shouldDumpIo, chromiumOptions) => {
    var _a;
    if (launching) {
        await waitForLaunched();
        if (!_browserInstance) {
            throw new Error('expected to launch');
        }
        return _browserInstance;
    }
    if (_browserInstance) {
        return _browserInstance;
    }
    launching = true;
    const execPath = await (0, get_chromium_executable_path_1.executablePath)();
    const actualChromiumOptions = {
        ...chromiumOptions,
        // Override the `null` value, which might come from CLI with swANGLE
        gl: (_a = chromiumOptions.gl) !== null && _a !== void 0 ? _a : 'swangle',
    };
    _browserInstance = await (0, renderer_1.openBrowser)('chrome', {
        browserExecutable: execPath,
        shouldDumpIo,
        chromiumOptions: actualChromiumOptions,
    });
    _browserInstance.on('disconnected', () => {
        console.log('Browser disconnected / crashed');
        _browserInstance === null || _browserInstance === void 0 ? void 0 : _browserInstance.close().catch(() => undefined);
        _browserInstance = null;
    });
    launching = false;
    return _browserInstance;
};
exports.getBrowserInstance = getBrowserInstance;
