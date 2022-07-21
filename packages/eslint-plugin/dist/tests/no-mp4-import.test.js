"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const no_mp4_import_1 = __importDefault(require("../rules/no-mp4-import"));
const ruleTester = new utils_1.ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
});
ruleTester.run("no-mp4-import", no_mp4_import_1.default, {
    valid: [
        'const hi = require("hi")',
        'import hi from "hi.mp3"',
        'const falsePosition = ".mp4"; require("hi"+1+".png") ',
    ],
    invalid: [
        {
            code: 'const hi = require("hi.mp4")',
            errors: [
                {
                    messageId: "NoMP4Import",
                },
            ],
        },
        {
            code: 'const hi = require("hi" + 2 + ".mp4")',
            errors: [
                {
                    messageId: "NoMP4Import",
                },
            ],
        },
        {
            code: 'import "hi.mp4"',
            errors: [
                {
                    messageId: "NoMP4Import",
                },
            ],
        },
        {
            code: 'import hi from "hi.mp4"',
            errors: [
                {
                    messageId: "NoMP4Import",
                },
            ],
        },
    ],
});
