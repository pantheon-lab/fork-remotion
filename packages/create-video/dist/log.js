"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.Log = {
    chalk: chalk_1.default,
    verbose: (...args) => {
        return console.log(chalk_1.default.blueBright(...args));
    },
    info: (...args) => {
        return console.log(...args);
    },
    warn: (...args) => {
        return console.warn(chalk_1.default.yellow(...args));
    },
    error: (...args) => {
        return console.error(chalk_1.default.red(...args));
    },
    newLine: () => {
        return console.log();
    },
};
