"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqualOrBelowLogLevel = exports.isValidLogLevel = exports.setLogLevel = exports.getLogLevel = exports.DEFAULT_LOG_LEVEL = exports.logLevels = void 0;
exports.logLevels = ['verbose', 'info', 'warn', 'error'];
exports.DEFAULT_LOG_LEVEL = 'info';
let logLevel = exports.DEFAULT_LOG_LEVEL;
const getLogLevel = () => {
    return logLevel;
};
exports.getLogLevel = getLogLevel;
const setLogLevel = (newLogLevel) => {
    logLevel = newLogLevel;
};
exports.setLogLevel = setLogLevel;
const getNumberForLogLevel = (level) => {
    return exports.logLevels.indexOf(level);
};
const isValidLogLevel = (level) => {
    return getNumberForLogLevel(level) > -1;
};
exports.isValidLogLevel = isValidLogLevel;
const isEqualOrBelowLogLevel = (currentLevel, level) => {
    return getNumberForLogLevel(currentLevel) <= getNumberForLogLevel(level);
};
exports.isEqualOrBelowLogLevel = isEqualOrBelowLogLevel;
