"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const remotion_1 = require("remotion");
const chalk_1 = require("./chalk");
exports.Log = {
    verbose: (...args) => {
        if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose')) {
            return console.log(...args.map((a) => chalk_1.chalk.blueBright(a)));
        }
    },
    info: (...args) => {
        if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'info')) {
            return console.log(...args);
        }
    },
    warn: (...args) => {
        if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'warn')) {
            return console.warn(...args.map((a) => chalk_1.chalk.yellow(a)));
        }
    },
    error: (...args) => {
        if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'error')) {
            return console.error(...args.map((a) => chalk_1.chalk.red(a)));
        }
    },
};
