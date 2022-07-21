"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.isColorSupported = void 0;
const tty = __importStar(require("tty"));
const argv = process.argv || [];
const env = process.env || {};
const isDisabled = 'NO_COLOR' in env || argv.includes('--no-color');
const isForced = 'FORCE_COLOR' in env || argv.includes('--color');
const isWindows = process.platform === 'win32';
const isCompatibleTerminal = ((_a = tty === null || tty === void 0 ? void 0 : tty.isatty) === null || _a === void 0 ? void 0 : _a.call(tty, 1)) && env.TERM && env.TERM !== 'dumb';
const isCI = 'CI' in env &&
    ('GITHUB_ACTIONS' in env || 'GITLAB_CI' in env || 'CIRCLECI' in env);
exports.isColorSupported = !isDisabled && (isForced || isWindows || isCompatibleTerminal || isCI);
