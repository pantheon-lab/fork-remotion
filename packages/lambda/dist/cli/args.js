"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceFlagProvided = exports.parsedLambdaCli = void 0;
const cli_1 = require("@remotion/cli");
const minimist_1 = __importDefault(require("minimist"));
exports.parsedLambdaCli = (0, minimist_1.default)(process.argv.slice(2), {
    boolean: cli_1.CliInternals.BooleanFlags,
});
exports.forceFlagProvided = exports.parsedLambdaCli.f ||
    exports.parsedLambdaCli.force ||
    exports.parsedLambdaCli.yes ||
    exports.parsedLambdaCli.y;
