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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Internals = void 0;
const shared_audio_tags_1 = require("./audio/shared-audio-tags");
const CanUseRemotionHooks_1 = require("./CanUseRemotionHooks");
const CompositionManager_1 = require("./CompositionManager");
const AssetCompression = __importStar(require("./compress-assets"));
const browser_1 = require("./config/browser");
const browser_executable_1 = require("./config/browser-executable");
const chromium_flags_1 = require("./config/chromium-flags");
const codec_1 = require("./config/codec");
const concurrency_1 = require("./config/concurrency");
const crf_1 = require("./config/crf");
const env_file_1 = require("./config/env-file");
const every_nth_frame_1 = require("./config/every-nth-frame");
const ffmpeg_executable_1 = require("./config/ffmpeg-executable");
const frame_range_1 = require("./config/frame-range");
const image_format_1 = require("./config/image-format");
const image_sequence_1 = require("./config/image-sequence");
const Logging = __importStar(require("./config/log"));
const max_timeline_tracks_1 = require("./config/max-timeline-tracks");
const number_of_gif_loops_1 = require("./config/number-of-gif-loops");
const override_webpack_1 = require("./config/override-webpack");
const overwrite_1 = require("./config/overwrite");
const pixel_format_1 = require("./config/pixel-format");
const preview_server_1 = require("./config/preview-server");
const prores_profile_1 = require("./config/prores-profile");
const quality_1 = require("./config/quality");
const scale_1 = require("./config/scale");
const still_frame_1 = require("./config/still-frame");
const timeout_1 = require("./config/timeout");
const webpack_caching_1 = require("./config/webpack-caching");
const CSSUtils = __importStar(require("./default-css"));
const delay_render_1 = require("./delay-render");
const feature_flags_1 = require("./feature-flags");
const get_environment_1 = require("./get-environment");
const get_preview_dom_element_1 = require("./get-preview-dom-element");
const is_audio_codec_1 = require("./is-audio-codec");
const perf = __importStar(require("./perf"));
const portal_node_1 = require("./portal-node");
const register_root_1 = require("./register-root");
const RemotionRoot_1 = require("./RemotionRoot");
const Sequence_1 = require("./Sequence");
const setup_env_variables_1 = require("./setup-env-variables");
const TimelineInOutPosition = __importStar(require("./timeline-inout-position-state"));
const TimelinePosition = __importStar(require("./timeline-position-state"));
const timeout_2 = require("./timeout");
const truthy_1 = require("./truthy");
const use_current_frame_1 = require("./use-current-frame");
const use_lazy_component_1 = require("./use-lazy-component");
const use_unsafe_video_config_1 = require("./use-unsafe-video-config");
const use_video_1 = require("./use-video");
const validate_composition_id_1 = require("./validation/validate-composition-id");
const validate_dimensions_1 = require("./validation/validate-dimensions");
const validate_duration_in_frames_1 = require("./validation/validate-duration-in-frames");
const validate_fps_1 = require("./validation/validate-fps");
const validate_frame_1 = require("./validation/validate-frame");
const validate_image_format_1 = require("./validation/validate-image-format");
const validate_offthreadvideo_image_format_1 = require("./validation/validate-offthreadvideo-image-format");
const validate_opengl_renderer_1 = require("./validation/validate-opengl-renderer");
const validate_quality_1 = require("./validation/validate-quality");
const volume_position_state_1 = require("./volume-position-state");
const wrap_remotion_context_1 = require("./wrap-remotion-context");
const Timeline = { ...TimelinePosition, ...TimelineInOutPosition };
// Mark them as Internals so use don't assume this is public
// API and are less likely to use it
exports.Internals = {
    perf,
    useUnsafeVideoConfig: use_unsafe_video_config_1.useUnsafeVideoConfig,
    Timeline,
    CompositionManager: CompositionManager_1.CompositionManager,
    RemotionRoot: RemotionRoot_1.RemotionRoot,
    useVideo: use_video_1.useVideo,
    getRoot: register_root_1.getRoot,
    getBrowserExecutable: browser_executable_1.getBrowserExecutable,
    getCustomFfmpegExecutable: ffmpeg_executable_1.getCustomFfmpegExecutable,
    getCustomFfprobeExecutable: ffmpeg_executable_1.getCustomFfprobeExecutable,
    getPixelFormat: pixel_format_1.getPixelFormat,
    getConcurrency: concurrency_1.getConcurrency,
    getRange: frame_range_1.getRange,
    getShouldOverwrite: overwrite_1.getShouldOverwrite,
    getOutputCodecOrUndefined: codec_1.getOutputCodecOrUndefined,
    getWebpackOverrideFn: override_webpack_1.getWebpackOverrideFn,
    getQuality: quality_1.getQuality,
    getAndValidateEveryNthFrame: every_nth_frame_1.getAndValidateEveryNthFrame,
    getAndValidateNumberOfGifLoops: number_of_gif_loops_1.getAndValidateNumberOfGifLoops,
    getScale: scale_1.getScale,
    getShouldOutputImageSequence: image_sequence_1.getShouldOutputImageSequence,
    validateSelectedCrfAndCodecCombination: crf_1.validateSelectedCrfAndCodecCombination,
    getFinalOutputCodec: codec_1.getFinalOutputCodec,
    useMediaVolumeState: volume_position_state_1.useMediaVolumeState,
    useMediaMutedState: volume_position_state_1.useMediaMutedState,
    DEFAULT_CODEC: codec_1.DEFAULT_CODEC,
    DEFAULT_PIXEL_FORMAT: pixel_format_1.DEFAULT_PIXEL_FORMAT,
    FEATURE_FLAG_FIREFOX_SUPPORT: feature_flags_1.FEATURE_FLAG_FIREFOX_SUPPORT,
    DEFAULT_WEBPACK_CACHE_ENABLED: webpack_caching_1.DEFAULT_WEBPACK_CACHE_ENABLED,
    getBrowser: browser_1.getBrowser,
    DEFAULT_BROWSER: browser_1.DEFAULT_BROWSER,
    getDefaultCrfForCodec: crf_1.getDefaultCrfForCodec,
    getActualCrf: crf_1.getActualCrf,
    setFrameRangeFromCli: frame_range_1.setFrameRangeFromCli,
    getUserPreferredImageFormat: image_format_1.getUserPreferredImageFormat,
    validateSelectedPixelFormatAndImageFormatCombination: image_format_1.validateSelectedPixelFormatAndImageFormatCombination,
    validateSelectedPixelFormatAndCodecCombination: pixel_format_1.validateSelectedPixelFormatAndCodecCombination,
    validateFrameRange: frame_range_1.validateFrameRange,
    validateNonNullImageFormat: validate_image_format_1.validateNonNullImageFormat,
    getWebpackCaching: webpack_caching_1.getWebpackCaching,
    useLazyComponent: use_lazy_component_1.useLazyComponent,
    truthy: truthy_1.truthy,
    isAudioCodec: is_audio_codec_1.isAudioCodec,
    Logging,
    SequenceContext: Sequence_1.SequenceContext,
    useRemotionContexts: wrap_remotion_context_1.useRemotionContexts,
    RemotionContextProvider: wrap_remotion_context_1.RemotionContextProvider,
    CSSUtils,
    setupEnvVariables: setup_env_variables_1.setupEnvVariables,
    ENV_VARIABLES_ENV_NAME: setup_env_variables_1.ENV_VARIABLES_ENV_NAME,
    getDotEnvLocation: env_file_1.getDotEnvLocation,
    getServerPort: preview_server_1.getServerPort,
    MediaVolumeContext: volume_position_state_1.MediaVolumeContext,
    SetMediaVolumeContext: volume_position_state_1.SetMediaVolumeContext,
    validateDurationInFrames: validate_duration_in_frames_1.validateDurationInFrames,
    validateFps: validate_fps_1.validateFps,
    validateDimension: validate_dimensions_1.validateDimension,
    getRemotionEnvironment: get_environment_1.getRemotionEnvironment,
    getProResProfile: prores_profile_1.getProResProfile,
    setProResProfile: prores_profile_1.setProResProfile,
    validateSelectedCodecAndProResCombination: prores_profile_1.validateSelectedCodecAndProResCombination,
    getMaxTimelineTracks: max_timeline_tracks_1.getMaxTimelineTracks,
    SharedAudioContext: shared_audio_tags_1.SharedAudioContext,
    SharedAudioContextProvider: shared_audio_tags_1.SharedAudioContextProvider,
    validateQuality: validate_quality_1.validateQuality,
    validateFrame: validate_frame_1.validateFrame,
    setStillFrame: still_frame_1.setStillFrame,
    getStillFrame: still_frame_1.getStillFrame,
    invalidCompositionErrorMessage: validate_composition_id_1.invalidCompositionErrorMessage,
    isCompositionIdValid: validate_composition_id_1.isCompositionIdValid,
    DEFAULT_OVERWRITE: overwrite_1.DEFAULT_OVERWRITE,
    AssetCompression,
    defaultOverrideFunction: override_webpack_1.defaultOverrideFunction,
    DEFAULT_PUPPETEER_TIMEOUT: timeout_2.DEFAULT_PUPPETEER_TIMEOUT,
    setupPuppeteerTimeout: timeout_2.setupPuppeteerTimeout,
    setPuppeteerTimeout: timeout_1.setPuppeteerTimeout,
    getCurrentPuppeteerTimeout: timeout_1.getCurrentPuppeteerTimeout,
    getChromiumDisableWebSecurity: chromium_flags_1.getChromiumDisableWebSecurity,
    getIgnoreCertificateErrors: chromium_flags_1.getIgnoreCertificateErrors,
    validateOpenGlRenderer: validate_opengl_renderer_1.validateOpenGlRenderer,
    getChromiumOpenGlRenderer: chromium_flags_1.getChromiumOpenGlRenderer,
    getChromiumHeadlessMode: chromium_flags_1.getChromiumHeadlessMode,
    DEFAULT_OPENGL_RENDERER: chromium_flags_1.DEFAULT_OPENGL_RENDERER,
    getPreviewDomElement: get_preview_dom_element_1.getPreviewDomElement,
    compositionsRef: CompositionManager_1.compositionsRef,
    DELAY_RENDER_CALLSTACK_TOKEN: delay_render_1.DELAY_RENDER_CALLSTACK_TOKEN,
    useAbsoluteCurrentFrame: use_current_frame_1.useAbsoluteCurrentFrame,
    portalNode: portal_node_1.portalNode,
    waitForRoot: register_root_1.waitForRoot,
    validateOffthreadVideoImageFormat: validate_offthreadvideo_image_format_1.validateOffthreadVideoImageFormat,
    CanUseRemotionHooksProvider: CanUseRemotionHooks_1.CanUseRemotionHooksProvider,
    CanUseRemotionHooks: CanUseRemotionHooks_1.CanUseRemotionHooks,
};
