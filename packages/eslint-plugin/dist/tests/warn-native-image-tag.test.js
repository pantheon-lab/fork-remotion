"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const warn_native_media_tag_1 = __importDefault(require("../rules/warn-native-media-tag"));
const ruleTester = new utils_1.ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run("warn-native-media-tag", warn_native_media_tag_1.default, {
    valid: [
        "const hi = <div></div>",
        "const hi = <Img></Img>",
        "const hi = <IFrame/>",
        "const hi = <Audio/>",
        "const hi = styled(Audio)``",
    ],
    invalid: [
        {
            code: "const hi = <img/>",
            errors: [
                {
                    messageId: "NoNativeImgTag",
                },
            ],
        },
        {
            code: "const hi = <img></img>",
            errors: [
                {
                    messageId: "NoNativeImgTag",
                },
            ],
        },
        {
            code: "const hi = <iframe></iframe>",
            errors: [
                {
                    messageId: "NoNativeIFrameTag",
                },
            ],
        },
        {
            code: "const hi = styled.img`color: blue;`",
            errors: [
                {
                    messageId: "NoNativeImgTag",
                },
            ],
        },
        {
            code: "const hi = styled.iframe`color: blue;`",
            errors: [
                {
                    messageId: "NoNativeIFrameTag",
                },
            ],
        },
        {
            code: "const hi = styled.video<{type: string}>`color: blue;`",
            errors: [
                {
                    messageId: "NoNativeVideoTag",
                },
            ],
        },
        // TODO: Enable this example
        /*
        {
          code: "const hi = styled.audio<{type: string}>.attrs({})`color: blue;`",
          errors: [
            {
              messageId: "NoNativeAudioTag",
            },
          ],
        },
        */
    ],
});
