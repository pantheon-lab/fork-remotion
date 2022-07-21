"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableLogs = exports.disableLogs = void 0;
const disableLogs = () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    jest.spyOn(console, 'debug').mockImplementation(jest.fn());
};
exports.disableLogs = disableLogs;
const enableLogs = () => {
    jest.spyOn(console, 'log').mockRestore();
    jest.spyOn(console, 'debug').mockRestore();
};
exports.enableLogs = enableLogs;
