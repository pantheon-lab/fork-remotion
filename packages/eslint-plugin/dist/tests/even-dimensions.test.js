"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const even_dimensions_1 = __importDefault(require("../rules/even-dimensions"));
const ruleTester = new utils_1.ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run("even-dimensions", even_dimensions_1.default, {
    valid: [
        `
import {Composition} from 'remotion';

export const Re = () => {
  return (
    <Composition height={1000} />
  );
}
          `,
        `
import {Composition} from 'remotion';

export const Re = () => {
  return (
    <Composition width={1000} height={20} />
  );
}
          `,
        `
import {Still} from 'remotion';

export const Re = () => {
  return (
    <Still width={1001} height={20} />
  );
}
          `,
    ],
    invalid: [
        {
            code: `
import {Composition} from 'remotion';

export const Re = () => {
  return (
    <Composition height={1001} />
  );
}
      `,
            errors: [
                {
                    messageId: "EvenDimensions",
                },
            ],
        },
        {
            code: `
import {Composition} from 'remotion';

export const Re = () => {
  return (
    <Composition width={1001} />
  );
}
      `,
            errors: [
                {
                    messageId: "EvenDimensions",
                },
            ],
        },
    ],
});
