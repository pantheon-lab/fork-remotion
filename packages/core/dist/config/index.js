"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const browser_executable_1 = require("./browser-executable");
const chromium_flags_1 = require("./chromium-flags");
const codec_1 = require("./codec");
const concurrency_1 = require("./concurrency");
const crf_1 = require("./crf");
const env_file_1 = require("./env-file");
const every_nth_frame_1 = require("./every-nth-frame");
const ffmpeg_executable_1 = require("./ffmpeg-executable");
const frame_range_1 = require("./frame-range");
const image_format_1 = require("./image-format");
const image_sequence_1 = require("./image-sequence");
const log_1 = require("./log");
const max_timeline_tracks_1 = require("./max-timeline-tracks");
const number_of_gif_loops_1 = require("./number-of-gif-loops");
const override_webpack_1 = require("./override-webpack");
const overwrite_1 = require("./overwrite");
const pixel_format_1 = require("./pixel-format");
const preview_server_1 = require("./preview-server");
const prores_profile_1 = require("./prores-profile");
const quality_1 = require("./quality");
const scale_1 = require("./scale");
const timeout_1 = require("./timeout");
const webpack_caching_1 = require("./webpack-caching");
exports.Config = {
    Preview: {
        /**
         * Change the maximum amount of tracks that are shown in the timeline.
         * @param maxTracks The maximum amount of timeline tracks that you would like to show.
         * @default 15
         */
        setMaxTimelineTracks: max_timeline_tracks_1.setMaxTimelineTracks,
    },
    Bundling: {
        /**
         * Pass in a function which takes the current Webpack config
         * and return a modified Webpack configuration.
         * Docs: http://remotion.dev/docs/webpack
         */
        overrideWebpackConfig: override_webpack_1.overrideWebpackConfig,
        /**
         * Whether Webpack bundles should be cached to make
         * subsequent renders faster. Default: true
         */
        setCachingEnabled: webpack_caching_1.setWebpackCaching,
        /**
         * Define on which port Remotion should start it's HTTP servers during preview and rendering.
         * By default, Remotion will try to find a free port.
         * If you specify a port, but it's not available, Remotion will throw an error.
         */
        setPort: preview_server_1.setPort,
    },
    Log: {
        /**
         * Set the log level.
         * Acceptable values: 'error' | 'warning' | 'info' | 'verbose'
         * Default value: 'info'
         *
         * Set this to 'verbose' to get browser logs and other IO.
         */
        setLevel: log_1.setLogLevel,
    },
    Puppeteer: {
        /**
         * Specify executable path for the browser to use.
         * Default: null, which will make Remotion find or download a version of said browser.
         */
        setBrowserExecutable: browser_executable_1.setBrowserExecutable,
        /**
         * Set how many milliseconds a frame may take to render before it times out.
         * Default: `30000`
         */
        setTimeoutInMilliseconds: timeout_1.setPuppeteerTimeout,
        /**
         * Setting deciding whether to disable CORS and other Chrome security features.
         * Default: false
         */
        setChromiumDisableWebSecurity: chromium_flags_1.setChromiumDisableWebSecurity,
        /**
         * Setting whether to ignore any invalid SSL certificates, such as self-signed ones.
         * Default: false
         */
        setChromiumIgnoreCertificateErrors: chromium_flags_1.setChromiumIgnoreCertificateErrors,
        /**
         * If false, will open an actual browser during rendering to observe progress.
         * Default: true
         */
        setChromiumHeadlessMode: chromium_flags_1.setChromiumHeadlessMode,
        /**
         * Set the OpenGL rendering backend for Chrome. Possible values: 'egl', 'angle', 'swiftshader' and 'swangle'.
         * Default: 'swangle' in Lambda, null elsewhere.
         */
        setChromiumOpenGlRenderer: chromium_flags_1.setChromiumOpenGlRenderer,
    },
    Rendering: {
        /**
         * Set a custom location for a .env file.
         * Default: `.env`
         */
        setDotEnvLocation: env_file_1.setDotEnvLocation,
        /**
         * Sets how many Puppeteer instances will work on rendering your video in parallel.
         * Default: `null`, meaning half of the threads available on your CPU.
         */
        setConcurrency: concurrency_1.setConcurrency,
        /**
         * Set the JPEG quality for the frames.
         * Must be between 0 and 100.
         * Must be between 0 and 100.
         * Default: 80
         */
        setQuality: quality_1.setQuality,
        /** Decide in which image format to render. Can be either 'jpeg' or 'png'.
         * PNG is slower, but supports transparency.
         */
        setImageFormat: image_format_1.setImageFormat,
        /**
         * Render only a subset of a video.
         * Pass in a tuple [20, 30] to only render frames 20-30 into a video.
         * Pass in a single number `20` to only render a single frame as an image.
         * The frame count starts at 0.
         */
        setFrameRange: frame_range_1.setFrameRange,
        /**
         * Specify local ffmpeg executable.
         * Default: null, which will use ffmpeg available in PATH.
         */
        setFfmpegExecutable: ffmpeg_executable_1.setFfmpegExecutable,
        /**
         * Specify local ffprobe executable.
         * Default: null, which will use ffprobe available in PATH.
         */
        setFfprobeExecutable: ffmpeg_executable_1.setFfprobeExecutable,
        /**
         * Scales the output dimensions by a factor.
         * Default: 1.
         */
        setScale: scale_1.setScale,
        /**
         * Specify which frames should be picked for rendering a GIF
         * Default: 1, which means every frame
         * https://remotion.dev/docs/render-as-gif
         */
        setEveryNthFrame: every_nth_frame_1.setEveryNthFrame,
        /**
         * Specify the number of Loop a GIF should have.
         * Default: null (means GIF will loop infinite)
         */
        setNumberOfGifLoops: number_of_gif_loops_1.setNumberOfGifLoops,
    },
    Output: {
        /**
         * If the video file already exists, should Remotion overwrite
         * the output? Default: true
         */
        setOverwriteOutput: overwrite_1.setOverwriteOutput,
        /**
         * Sets the pixel format in FFMPEG.
         * See https://trac.ffmpeg.org/wiki/Chroma%20Subsampling for an explanation.
         * You can override this using the `--pixel-format` Cli flag.
         */
        setPixelFormat: pixel_format_1.setPixelFormat,
        /**
         * @deprecated Use setCodec() and setImageSequence() instead.
         * Specify what kind of output you, either `mp4` or `png-sequence`.
         */
        setOutputFormat: codec_1.setOutputFormat,
        /**
         * Specify the codec for stitching the frames into a video.
         * Can be `h264` (default), `h265`, `vp8` or `vp9`
         */
        setCodec: codec_1.setCodec,
        /**
         * Set the Constant Rate Factor to pass to FFMPEG.
         * Lower values mean better quality, but be aware that the ranges of
         * possible values greatly differs between codecs.
         */
        setCrf: crf_1.setCrf,
        /**
         * Set to true if don't want a video but an image sequence as the output.
         */
        setImageSequence: image_sequence_1.setImageSequence,
        /**
         * Set the ProRes profile.
         * This method is only valid if the codec has been set to 'prores'.
         * Possible values: 4444-xq, 4444, hq, standard, light, proxy. Default: 'hq'
         * See https://avpres.net/FFmpeg/im_ProRes.html for meaning of possible values.
         */
        setProResProfile: prores_profile_1.setProResProfile,
    },
};
