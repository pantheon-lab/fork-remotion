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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderStill = void 0;
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const ensure_output_directory_1 = require("./ensure-output-directory");
const handle_javascript_exception_1 = require("./error-handling/handle-javascript-exception");
const legacy_webpack_config_1 = require("./legacy-webpack-config");
const make_assets_download_dir_1 = require("./make-assets-download-dir");
const open_browser_1 = require("./open-browser");
const prepare_server_1 = require("./prepare-server");
const provide_screenshot_1 = require("./provide-screenshot");
const puppeteer_evaluate_1 = require("./puppeteer-evaluate");
const seek_to_frame_1 = require("./seek-to-frame");
const set_props_and_env_1 = require("./set-props-and-env");
const validate_puppeteer_timeout_1 = require("./validate-puppeteer-timeout");
const validate_scale_1 = require("./validate-scale");
const innerRenderStill = async ({ composition, quality, imageFormat = 'png', serveUrl, puppeteerInstance, dumpBrowserLogs = false, onError, inputProps, envVariables, output, frame = 0, overwrite = true, browserExecutable, timeoutInMilliseconds, chromiumOptions, scale, proxyPort, cancelSignal, }) => {
    remotion_1.Internals.validateDimension(composition.height, 'height', 'in the `config` object passed to `renderStill()`');
    remotion_1.Internals.validateDimension(composition.width, 'width', 'in the `config` object passed to `renderStill()`');
    remotion_1.Internals.validateFps(composition.fps, 'in the `config` object of `renderStill()`', null);
    remotion_1.Internals.validateDurationInFrames(composition.durationInFrames, 'in the `config` object passed to `renderStill()`');
    remotion_1.Internals.validateNonNullImageFormat(imageFormat);
    remotion_1.Internals.validateFrame(frame, composition.durationInFrames);
    (0, validate_puppeteer_timeout_1.validatePuppeteerTimeout)(timeoutInMilliseconds);
    (0, validate_scale_1.validateScale)(scale);
    if (typeof output !== 'string') {
        throw new TypeError('`output` parameter was not passed or is not a string');
    }
    output = path_1.default.resolve(process.cwd(), output);
    if (quality !== undefined && imageFormat !== 'jpeg') {
        throw new Error("You can only pass the `quality` option if `imageFormat` is 'jpeg'.");
    }
    remotion_1.Internals.validateQuality(quality);
    if (fs_1.default.existsSync(output)) {
        if (!overwrite) {
            throw new Error(`Cannot render still - "overwrite" option was set to false, but the output destination ${output} already exists.`);
        }
        const stat = (0, fs_1.statSync)(output);
        if (!stat.isFile()) {
            throw new Error(`The output location ${output} already exists, but is not a file, but something else (e.g. folder). Cannot save to it.`);
        }
    }
    (0, ensure_output_directory_1.ensureOutputDirectory)(output);
    const browserInstance = puppeteerInstance !== null && puppeteerInstance !== void 0 ? puppeteerInstance : (await (0, open_browser_1.openBrowser)(remotion_1.Internals.DEFAULT_BROWSER, {
        browserExecutable,
        shouldDumpIo: dumpBrowserLogs,
        chromiumOptions,
        forceDeviceScaleFactor: scale !== null && scale !== void 0 ? scale : 1,
    }));
    const page = await browserInstance.newPage();
    await page.setViewport({
        width: composition.width,
        height: composition.height,
        deviceScaleFactor: scale !== null && scale !== void 0 ? scale : 1,
    });
    const errorCallback = (err) => {
        onError(err);
        cleanup();
    };
    const cleanUpJSException = (0, handle_javascript_exception_1.handleJavascriptException)({
        page,
        onError: errorCallback,
        frame: null,
    });
    const cleanup = async () => {
        cleanUpJSException();
        if (puppeteerInstance) {
            await page.close();
        }
        else {
            browserInstance.close().catch((err) => {
                console.log('Unable to close browser', err);
            });
        }
    };
    cancelSignal === null || cancelSignal === void 0 ? void 0 : cancelSignal(() => {
        cleanup();
    });
    await (0, set_props_and_env_1.setPropsAndEnv)({
        inputProps,
        envVariables,
        page,
        serveUrl,
        initialFrame: frame,
        timeoutInMilliseconds,
        proxyPort,
        retriesRemaining: 2,
    });
    await (0, puppeteer_evaluate_1.puppeteerEvaluateWithCatch)({
        pageFunction: (id) => {
            window.setBundleMode({
                type: 'composition',
                compositionName: id,
            });
        },
        args: [composition.id],
        frame: null,
        page,
    });
    await (0, seek_to_frame_1.seekToFrame)({ frame, page });
    await (0, provide_screenshot_1.provideScreenshot)({
        page,
        imageFormat,
        quality,
        options: {
            frame,
            output,
        },
    });
    await cleanup();
};
/**
 *
 * @description Render a still frame from a composition
 * @link https://www.remotion.dev/docs/renderer/render-still
 */
const renderStill = (options) => {
    var _a;
    const selectedServeUrl = (0, legacy_webpack_config_1.getServeUrlWithFallback)(options);
    const downloadDir = (0, make_assets_download_dir_1.makeAssetsDownloadTmpDir)();
    const onDownload = (_a = options.onDownload) !== null && _a !== void 0 ? _a : (() => () => undefined);
    const happyPath = new Promise((resolve, reject) => {
        var _a, _b, _c;
        const onError = (err) => reject(err);
        let close = null;
        (0, prepare_server_1.prepareServer)({
            webpackConfigOrServeUrl: selectedServeUrl,
            downloadDir,
            onDownload,
            onError,
            ffmpegExecutable: (_a = options.ffmpegExecutable) !== null && _a !== void 0 ? _a : null,
            ffprobeExecutable: (_b = options.ffprobeExecutable) !== null && _b !== void 0 ? _b : null,
            port: (_c = options.port) !== null && _c !== void 0 ? _c : null,
        })
            .then(({ serveUrl, closeServer, offthreadPort }) => {
            close = closeServer;
            return innerRenderStill({
                ...options,
                serveUrl,
                onError: (err) => reject(err),
                proxyPort: offthreadPort,
            });
        })
            .then((res) => resolve(res))
            .catch((err) => reject(err))
            .finally(() => close === null || close === void 0 ? void 0 : close());
    });
    return Promise.race([
        happyPath,
        new Promise((_resolve, reject) => {
            var _a;
            (_a = options.cancelSignal) === null || _a === void 0 ? void 0 : _a.call(options, () => {
                reject(new Error('renderStill() got cancelled'));
            });
        }),
    ]);
};
exports.renderStill = renderStill;
