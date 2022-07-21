declare const _default: {
    rules: {
        "no-mp4-import": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"NoMP4Import", [], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
        "warn-native-media-tag": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"NoNativeImgTag" | "NoNativeIFrameTag" | "NoNativeAudioTag" | "NoNativeVideoTag", [], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
        "deterministic-randomness": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"DeterministicRandomness", [], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
        "no-string-assets": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"NoStringAssets", [], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
        "even-dimensions": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"EvenDimensions", [], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
        "duration-in-frames": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"DurationInFrames", [], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
        "volume-callback": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"VolumeCallback", [], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    };
    configs: {
        recommended: {
            rules: {
                "@remotion/no-mp4-import": string;
                "@remotion/warn-native-media-tag": string;
                "@remotion/deterministic-randomness": string;
                "@remotion/no-string-assets": string;
                "@remotion/even-dimensions": string;
                "@remotion/duration-in-frames": string;
                "@remotion/volume-callback": string;
            };
        };
    };
};
export = _default;
