"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const no_duration_frames_infinity_1 = __importDefault(require("../rules//no-duration-frames-infinity"));
const ruleTester = new utils_1.ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run("no-duration-frames-infinity", no_duration_frames_infinity_1.default, {
    valid: [
        `
      import {Sequence} from 'remotion';

      export const Re = () => {
        return (
          <Sequence durationInFrames={1}>
            Hi
          </Sequence>
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
            <Sequence durationInFrames={Infinity}>
              Hi
            </Sequence>
          );
        }
      `,
            output: `
        import {Composition} from 'remotion';

        export const Re = () => {
          return (
            <Sequence >
              Hi
            </Sequence>
          );
        }
      `,
            errors: [
                {
                    messageId: "DurationInFrames",
                },
            ],
        },
    ],
});
