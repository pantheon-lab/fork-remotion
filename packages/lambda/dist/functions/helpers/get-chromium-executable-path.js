"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.executablePath = void 0;
if (/^AWS_Lambda_nodejs(?:10|12|14)[.]x$/.test((_a = process.env.AWS_EXECUTION_ENV) !== null && _a !== void 0 ? _a : '') === true) {
    if (process.env.FONTCONFIG_PATH === undefined) {
        process.env.FONTCONFIG_PATH = '/opt';
    }
    process.env.LD_LIBRARY_PATH = '/opt/lib:/opt/bin';
}
const executablePath = async () => {
    return '/opt/bin/chromium';
};
exports.executablePath = executablePath;
