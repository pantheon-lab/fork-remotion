/// <reference types="react" />
import type { CompProps } from './Composition';
import type { CompositionManagerContext, RenderAssetInfo, TAsset, TCompMetadata, TComposition, TSequence } from './CompositionManager';
import * as AssetCompression from './compress-assets';
import * as Logging from './config/log';
import type { WebpackOverrideFn } from './config/override-webpack';
import type { ProResProfile } from './config/prores-profile';
import * as CSSUtils from './default-css';
import type { RemotionEnvironment } from './get-environment';
import * as perf from './perf';
import type { SetTimelineInOutContextValue, TimelineInOutContextValue } from './timeline-inout-position-state';
import type { SetTimelineContextValue, TimelineContextValue } from './timeline-position-state';
import { truthy } from './truthy';
import type { OpenGlRenderer } from './validation/validate-opengl-renderer';
import type { MediaVolumeContextValue, SetMediaVolumeContextValue } from './volume-position-state';
import { useRemotionContexts } from './wrap-remotion-context';
declare const Timeline: {
    TimelineInOutContext: import("react").Context<TimelineInOutContextValue>;
    SetTimelineInOutContext: import("react").Context<SetTimelineInOutContextValue>;
    useTimelineInOutFramePosition: () => TimelineInOutContextValue;
    useTimelineSetInOutFramePosition: () => SetTimelineInOutContextValue;
    TimelineContext: import("react").Context<TimelineContextValue>;
    SetTimelineContext: import("react").Context<SetTimelineContextValue>;
    useTimelinePosition: () => number;
    useTimelineSetFrame: () => (u: import("react").SetStateAction<number>) => void;
    usePlayingState: () => readonly [boolean, (u: import("react").SetStateAction<boolean>) => void, import("react").MutableRefObject<boolean>];
};
export declare const Internals: {
    perf: typeof perf;
    useUnsafeVideoConfig: () => import("./video-config").VideoConfig | null;
    Timeline: {
        TimelineInOutContext: import("react").Context<TimelineInOutContextValue>;
        SetTimelineInOutContext: import("react").Context<SetTimelineInOutContextValue>;
        useTimelineInOutFramePosition: () => TimelineInOutContextValue;
        useTimelineSetInOutFramePosition: () => SetTimelineInOutContextValue;
        TimelineContext: import("react").Context<TimelineContextValue>;
        SetTimelineContext: import("react").Context<SetTimelineContextValue>;
        useTimelinePosition: () => number;
        useTimelineSetFrame: () => (u: import("react").SetStateAction<number>) => void;
        usePlayingState: () => readonly [boolean, (u: import("react").SetStateAction<boolean>) => void, import("react").MutableRefObject<boolean>];
    };
    CompositionManager: import("react").Context<CompositionManagerContext>;
    RemotionRoot: import("react").FC<{
        children: import("react").ReactNode;
    }>;
    useVideo: () => TComposition<unknown> | null;
    getRoot: () => import("react").FC<{}> | null;
    getBrowserExecutable: () => import("./config/browser-executable").BrowserExecutable;
    getCustomFfmpegExecutable: () => import("./config/ffmpeg-executable").FfmpegExecutable;
    getCustomFfprobeExecutable: () => import("./config/ffmpeg-executable").FfmpegExecutable;
    getPixelFormat: () => "yuv420p" | "yuva420p" | "yuv422p" | "yuv444p" | "yuv420p10le" | "yuv422p10le" | "yuv444p10le" | "yuva444p10le";
    getConcurrency: () => number | null;
    getRange: () => import("./config/frame-range").FrameRange | null;
    getShouldOverwrite: () => boolean;
    getOutputCodecOrUndefined: () => import("./config/codec").CodecOrUndefined;
    getWebpackOverrideFn: () => WebpackOverrideFn;
    getQuality: () => number | undefined;
    getAndValidateEveryNthFrame: (codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif") => number;
    getAndValidateNumberOfGifLoops: (codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif") => number | null;
    getScale: () => number;
    getShouldOutputImageSequence: (frameRange: import("./config/frame-range").FrameRange | null) => boolean;
    validateSelectedCrfAndCodecCombination: (crf: unknown, codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif") => void;
    getFinalOutputCodec: ({ codec: inputCodec, fileExtension, emitWarning, }: {
        codec: import("./config/codec").CodecOrUndefined;
        fileExtension: string | null;
        emitWarning: boolean;
    }) => "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif";
    useMediaVolumeState: () => readonly [number, (u: number) => void];
    useMediaMutedState: () => readonly [boolean, (u: import("react").SetStateAction<boolean>) => void];
    DEFAULT_CODEC: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif";
    DEFAULT_PIXEL_FORMAT: "yuv420p" | "yuva420p" | "yuv422p" | "yuv444p" | "yuv420p10le" | "yuv422p10le" | "yuv444p10le" | "yuva444p10le";
    FEATURE_FLAG_FIREFOX_SUPPORT: boolean;
    DEFAULT_WEBPACK_CACHE_ENABLED: boolean;
    getBrowser: () => import("./config/browser").Browser | null;
    DEFAULT_BROWSER: import("./config/browser").Browser;
    getDefaultCrfForCodec: (codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif") => number;
    getActualCrf: (codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif") => number;
    setFrameRangeFromCli: (newFrameRange: string | number) => void;
    getUserPreferredImageFormat: () => "none" | "png" | "jpeg" | undefined;
    validateSelectedPixelFormatAndImageFormatCombination: (pixelFormat: "yuv420p" | "yuva420p" | "yuv422p" | "yuv444p" | "yuv420p10le" | "yuv422p10le" | "yuv444p10le" | "yuva444p10le", imageFormat: "none" | "png" | "jpeg") => "none" | "valid";
    validateSelectedPixelFormatAndCodecCombination: (pixelFormat: "yuv420p" | "yuva420p" | "yuv422p" | "yuv444p" | "yuv420p10le" | "yuv422p10le" | "yuv444p10le" | "yuva444p10le", codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif") => void;
    validateFrameRange: (frameRange: import("./config/frame-range").FrameRange | null) => void;
    validateNonNullImageFormat: (imageFormat: "none" | "png" | "jpeg") => void;
    getWebpackCaching: () => boolean;
    useLazyComponent: <T>(compProps: CompProps<T>) => import("react").ExoticComponent<(import("react").PropsWithoutRef<T> & import("react").RefAttributes<import("react").Component<T, any, any>>) | import("react").PropsWithRef<T>> & {
        readonly _result: import("react").ComponentType<T>;
    };
    truthy: typeof truthy;
    isAudioCodec: (codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif" | undefined) => boolean;
    Logging: typeof Logging;
    SequenceContext: import("react").Context<import("./Sequence").SequenceContextType | null>;
    useRemotionContexts: typeof useRemotionContexts;
    RemotionContextProvider: (props: import("./wrap-remotion-context").RemotionContextProviderProps) => JSX.Element;
    CSSUtils: typeof CSSUtils;
    setupEnvVariables: () => void;
    ENV_VARIABLES_ENV_NAME: "ENV_VARIABLES";
    getDotEnvLocation: () => string | null;
    getServerPort: () => number | undefined;
    MediaVolumeContext: import("react").Context<MediaVolumeContextValue>;
    SetMediaVolumeContext: import("react").Context<SetMediaVolumeContextValue>;
    validateDurationInFrames: (durationInFrames: number, component: string) => void;
    validateFps: (fps: number, location: string, codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif" | null) => void;
    validateDimension: (amount: number, nameOfProp: string, location: string) => void;
    getRemotionEnvironment: () => RemotionEnvironment;
    getProResProfile: () => "light" | "4444-xq" | "4444" | "hq" | "standard" | "proxy" | undefined;
    setProResProfile: (profile: "light" | "4444-xq" | "4444" | "hq" | "standard" | "proxy" | undefined) => void;
    validateSelectedCodecAndProResCombination: (actualCodec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv" | "gif", actualProResProfile: "light" | "4444-xq" | "4444" | "hq" | "standard" | "proxy" | undefined) => void;
    getMaxTimelineTracks: () => number;
    SharedAudioContext: import("react").Context<{
        registerAudio: (aud: import("./audio").RemotionAudioProps) => {
            id: number;
            props: import("./audio").RemotionAudioProps;
            el: import("react").RefObject<HTMLAudioElement>;
        };
        unregisterAudio: (id: number) => void;
        updateAudio: (id: number, aud: import("./audio").RemotionAudioProps) => void;
        playAllAudios: () => void;
        numberOfAudioTags: number;
    } | null>;
    SharedAudioContextProvider: import("react").FC<{
        numberOfAudioTags: number;
        children: import("react").ReactNode;
    }>;
    validateQuality: (q: number | undefined) => void;
    validateFrame: (frame: number, durationInFrames: number) => void;
    setStillFrame: (frame: number) => void;
    getStillFrame: () => number;
    invalidCompositionErrorMessage: string;
    isCompositionIdValid: (id: string) => RegExpMatchArray | null;
    DEFAULT_OVERWRITE: boolean;
    AssetCompression: typeof AssetCompression;
    defaultOverrideFunction: WebpackOverrideFn;
    DEFAULT_PUPPETEER_TIMEOUT: number;
    setupPuppeteerTimeout: () => void;
    setPuppeteerTimeout: (newPuppeteerTimeout: number) => void;
    getCurrentPuppeteerTimeout: () => number;
    getChromiumDisableWebSecurity: () => boolean;
    getIgnoreCertificateErrors: () => boolean;
    validateOpenGlRenderer: (option: "swangle" | "angle" | "egl" | "swiftshader" | null) => "swangle" | "angle" | "egl" | "swiftshader" | null;
    getChromiumOpenGlRenderer: () => "swangle" | "angle" | "egl" | "swiftshader" | null;
    getChromiumHeadlessMode: () => boolean;
    DEFAULT_OPENGL_RENDERER: "swangle" | "angle" | "egl" | "swiftshader" | null;
    getPreviewDomElement: () => HTMLElement | null;
    compositionsRef: import("react").RefObject<{
        getCompositions: () => TCompMetadata[];
    }>;
    DELAY_RENDER_CALLSTACK_TOKEN: string;
    useAbsoluteCurrentFrame: () => number;
    portalNode: () => HTMLElement;
    waitForRoot: (fn: (comp: import("react").FC<{}>) => void) => () => void;
    validateOffthreadVideoImageFormat: (input: unknown) => void;
    CanUseRemotionHooksProvider: import("react").FC<{
        children: import("react").ReactNode;
    }>;
    CanUseRemotionHooks: import("react").Context<boolean>;
};
export type { TComposition, Timeline, TCompMetadata, TSequence, WebpackOverrideFn, TAsset, RenderAssetInfo, TimelineContextValue, SetTimelineContextValue, TimelineInOutContextValue, SetTimelineInOutContextValue, CompProps, CompositionManagerContext, MediaVolumeContextValue, SetMediaVolumeContextValue, RemotionEnvironment, ProResProfile, OpenGlRenderer, };
