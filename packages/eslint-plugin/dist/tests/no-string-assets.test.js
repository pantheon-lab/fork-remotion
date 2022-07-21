"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const no_string_assets_1 = __importDefault(require("../rules/no-string-assets"));
const ruleTester = new utils_1.ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run("no-string-assets", no_string_assets_1.default, {
    valid: [
        // Network image should be allowed
        `
import {Img} from 'remotion';

export const Re = () => {
  return (
    <Img src="https://google.com/favicon.ico" />
  );
}
          `,
        `
import {Img} from 'remotion';

export const Re = () => {
  return (
    <Img src="data:image/png;base64,
    iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGP
    C/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IA
    AAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1J
    REFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jq
    ch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0
    vr4MkhoXe0rZigAAAABJRU5ErkJggg==" />
  );
}
          `,
        `
import {Img} from 'remotion';
import img from './img.png';

export const Re = () => {
  return (
    <Img src={img} />
  );
}
                `,
    ],
    invalid: [
        {
            code: `
import {Img} from 'remotion';

export const Re = () => {
  return (
    <Img src="hithere" />
  );
}
      `,
            errors: [
                {
                    messageId: "NoStringAssets",
                },
            ],
        },
        {
            code: `
import {Img} from 'remotion';

export const Re = () => {
  return (
    <Img src={"curly"} />
  );
}
      `,
            errors: [
                {
                    messageId: "NoStringAssets",
                },
            ],
        },
        {
            code: `
import {Audio} from 'remotion';

export const Re = () => {
  return (
    <Audio src="hithere" />
  );
}
      `,
            errors: [
                {
                    messageId: "NoStringAssets",
                },
            ],
        },
    ],
});
