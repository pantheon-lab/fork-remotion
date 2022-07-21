"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const volume_callback_1 = __importDefault(require("../rules/volume-callback"));
const ruleTester = new utils_1.ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run("volume-callback", volume_callback_1.default, {
    valid: [
        `
import {Video} from 'remotion';

export const Re = () => {
  return (
    <Video volume={1} />
  );
}
          `,
        `
import {Video} from 'remotion';

export const Re = () => {
  return (
    <Video volume={f => f / 29} />
  );
}
          `,
        `
import {Audio} from 'remotion';

export const Re = () => {
  return (
    <Audio volume={1} />
  );
}
          `,
        `
const RandomComp = () => null;

export const Re = () => {
  return (
    <RandomComp volume={1} />
  );
}
          `,
    ],
    invalid: [
        {
            code: `
import {Video, useCurrentFrame} from 'remotion';

export const Re = () => {
  const frame = useCurrentFrame();

  return (
    <Video volume={frame / 20} />
  );
}
      `,
            errors: [
                {
                    messageId: "VolumeCallback",
                },
            ],
        },
        {
            code: `
import {Video, useCurrentFrame} from 'remotion';

export const Re = () => {
  const frame = useCurrentFrame();

  return (
    <Audio volume={frame / 20} />
  );
}
      `,
            errors: [
                {
                    messageId: "VolumeCallback",
                },
            ],
        },
    ],
});
