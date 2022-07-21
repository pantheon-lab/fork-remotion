"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderFrames = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const download_and_map_assets_to_file_1 = require("./assets/download-and-map-assets-to-file");
const cycle_browser_tabs_1 = require("./cycle-browser-tabs");
const handle_javascript_exception_1 = require("./error-handling/handle-javascript-exception");
const get_concurrency_1 = require("./get-concurrency");
const get_duration_from_frame_range_1 = require("./get-duration-from-frame-range");
const get_frame_padded_index_1 = require("./get-frame-padded-index");
const get_frame_to_render_1 = require("./get-frame-to-render");
const image_format_1 = require("./image-format");
const legacy_webpack_config_1 = require("./legacy-webpack-config");
const make_assets_download_dir_1 = require("./make-assets-download-dir");
const open_browser_1 = require("./open-browser");
const pool_1 = require("./pool");
const prepare_server_1 = require("./prepare-server");
const provide_screenshot_1 = require("./provide-screenshot");
const puppeteer_evaluate_1 = require("./puppeteer-evaluate");
const seek_to_frame_1 = require("./seek-to-frame");
const set_props_and_env_1 = require("./set-props-and-env");
const validate_scale_1 = require("./validate-scale");
const getComposition = (others) => {
    if ('composition' in others) {
        return others.composition;
    }
    if ('config' in others) {
        return others.config;
    }
    return undefined;
};
const getPool = async (pages) => {
    const puppeteerPages = await Promise.all(pages);
    const pool = new pool_1.Pool(puppeteerPages);
    return pool;
};
const innerRenderFrames = ({ onFrameUpdate, outputDir, onStart, inputProps, quality, imageFormat = image_format_1.DEFAULT_IMAGE_FORMAT, frameRange, puppeteerInstance, onError, envVariables, onBrowserLog, onFrameBuffer, onDownload, pagesArray, serveUrl, composition, timeoutInMilliseconds, scale, actualParallelism, downloadDir, everyNthFrame = 1, proxyPort, cancelSignal, }) => {
    if (!puppeteerInstance) {
        throw new Error('no puppeteer instance passed to innerRenderFrames - internal error');
    }
    if (outputDir) {
        if (!fs_1.default.existsSync(outputDir)) {
            fs_1.default.mkdirSync(outputDir, {
                recursive: true,
            });
        }
    }
    const downloadPromises = [];
    const realFrameRange = (0, get_frame_to_render_1.getRealFrameRange)(composition.durationInFrames, frameRange !== null && frameRange !== void 0 ? frameRange : null);
    const framesToRender = (0, get_duration_from_frame_range_1.getFramesToRender)(realFrameRange, everyNthFrame);
    const lastFrame = framesToRender[framesToRender.length - 1];
    const pages = new Array(actualParallelism).fill(true).map(async () => {
        const page = await puppeteerInstance.newPage();
        pagesArray.push(page);
        await page.setViewport({
            width: composition.width,
            height: composition.height,
            deviceScaleFactor: scale !== null && scale !== void 0 ? scale : 1,
        });
        const logCallback = (log) => {
            onBrowserLog === null || onBrowserLog === void 0 ? void 0 : onBrowserLog({
                stackTrace: log.stackTrace(),
                text: log.text,
                type: log.type,
            });
        };
        if (onBrowserLog) {
            page.on('console', logCallback);
        }
        const initialFrame = realFrameRange[0];
        await (0, set_props_and_env_1.setPropsAndEnv)({
            inputProps,
            envVariables,
            page,
            serveUrl,
            initialFrame,
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
        page.off('console', logCallback);
        return page;
    });
    // If rendering a GIF and skipping frames, we must ensure it starts from 0
    // and then is consecutive so FFMPEG recognizes the sequence
    const countType = everyNthFrame === 1 ? 'actual-frames' : 'from-zero';
    const filePadLength = (0, get_frame_padded_index_1.getFilePadLength)({
        lastFrame,
        totalFrames: framesToRender.length,
        countType,
    });
    let framesRendered = 0;
    const poolPromise = getPool(pages);
    onStart({
        frameCount: framesToRender.length,
    });
    const assets = new Array(framesToRender.length).fill(undefined);
    let stopped = false;
    cancelSignal === null || cancelSignal === void 0 ? void 0 : cancelSignal(() => {
        stopped = true;
    });
    const progress = Promise.all(framesToRender.map(async (frame, index) => {
        const pool = await poolPromise;
        const freePage = await pool.acquire();
        if (stopped) {
            throw new Error('Render was stopped');
        }
        const errorCallbackOnFrame = (err) => {
            onError(err);
        };
        const cleanupPageError = (0, handle_javascript_exception_1.handleJavascriptException)({
            page: freePage,
            onError: errorCallbackOnFrame,
            frame,
        });
        freePage.on('error', errorCallbackOnFrame);
        await (0, seek_to_frame_1.seekToFrame)({ frame, page: freePage });
        if (imageFormat !== 'none') {
            if (onFrameBuffer) {
                const id = remotion_1.Internals.perf.startPerfMeasure('save');
                const buffer = await (0, provide_screenshot_1.provideScreenshot)({
                    page: freePage,
                    imageFormat,
                    quality,
                    options: {
                        frame,
                        output: null,
                    },
                });
                remotion_1.Internals.perf.stopPerfMeasure(id);
                onFrameBuffer(buffer, frame);
            }
            else {
                if (!outputDir) {
                    throw new Error('Called renderFrames() without specifying either `outputDir` or `onFrameBuffer`');
                }
                const output = path_1.default.join(outputDir, (0, get_frame_padded_index_1.getFrameOutputFileName)({
                    frame,
                    imageFormat,
                    index,
                    countType,
                    lastFrame,
                    totalFrames: framesToRender.length,
                }));
                await (0, provide_screenshot_1.provideScreenshot)({
                    page: freePage,
                    imageFormat,
                    quality,
                    options: {
                        frame,
                        output,
                    },
                });
            }
        }
        const collectedAssets = await (0, puppeteer_evaluate_1.puppeteerEvaluateWithCatch)({
            pageFunction: () => {
                return window.remotion_collectAssets();
            },
            args: [],
            frame,
            page: freePage,
        });
        const compressedAssets = collectedAssets.map((asset) => remotion_1.Internals.AssetCompression.compressAsset(assets.filter(remotion_1.Internals.truthy).flat(1), asset));
        assets[index] = compressedAssets;
        compressedAssets.forEach((asset) => {
            (0, download_and_map_assets_to_file_1.downloadAndMapAssetsToFileUrl)({
                asset,
                downloadDir,
                onDownload,
            }).catch((err) => {
                onError(new Error(`Error while downloading asset: ${err.stack}`));
            });
        });
        pool.release(freePage);
        framesRendered++;
        onFrameUpdate(framesRendered, frame);
        cleanupPageError();
        freePage.off('error', errorCallbackOnFrame);
        return compressedAssets;
    }));
    const happyPath = progress.then(() => {
        const returnValue = {
            assetsInfo: {
                assets,
                downloadDir,
                imageSequenceName: `element-%0${filePadLength}d.${imageFormat}`,
                firstFrameIndex: framesToRender[0],
            },
            frameCount: framesToRender.length,
        };
        return returnValue;
    });
    return happyPath
        .then(() => {
        return Promise.all(downloadPromises);
    })
        .then(() => happyPath);
};
const renderFrames = (options) => {
    var _a, _b, _c, _d;
    const composition = getComposition(options);
    if (!composition) {
        throw new Error('No `composition` option has been specified for renderFrames()');
    }
    remotion_1.Internals.validateDimension(composition.height, 'height', 'in the `config` object passed to `renderFrames()`');
    remotion_1.Internals.validateDimension(composition.width, 'width', 'in the `config` object passed to `renderFrames()`');
    remotion_1.Internals.validateFps(composition.fps, 'in the `config` object of `renderFrames()`', null);
    remotion_1.Internals.validateDurationInFrames(composition.durationInFrames, 'in the `config` object passed to `renderFrames()`');
    if (options.quality !== undefined && options.imageFormat !== 'jpeg') {
        throw new Error("You can only pass the `quality` option if `imageFormat` is 'jpeg'.");
    }
    const selectedServeUrl = (0, legacy_webpack_config_1.getServeUrlWithFallback)(options);
    remotion_1.Internals.validateQuality(options.quality);
    (0, validate_scale_1.validateScale)(options.scale);
    const browserInstance = (_a = options.puppeteerInstance) !== null && _a !== void 0 ? _a : (0, open_browser_1.openBrowser)(remotion_1.Internals.DEFAULT_BROWSER, {
        shouldDumpIo: options.dumpBrowserLogs,
        browserExecutable: options.browserExecutable,
        chromiumOptions: options.chromiumOptions,
        forceDeviceScaleFactor: (_b = options.scale) !== null && _b !== void 0 ? _b : 1,
    });
    const downloadDir = (0, make_assets_download_dir_1.makeAssetsDownloadTmpDir)();
    const onDownload = (_c = options.onDownload) !== null && _c !== void 0 ? _c : (() => () => undefined);
    const actualParallelism = (0, get_concurrency_1.getActualConcurrency)((_d = options.parallelism) !== null && _d !== void 0 ? _d : null);
    const openedPages = [];
    return new Promise((resolve, reject) => {
        var _a, _b, _c;
        const cleanup = [];
        const onError = (err) => {
            reject(err);
        };
        Promise.race([
            new Promise((_, rej) => {
                var _a;
                (_a = options.cancelSignal) === null || _a === void 0 ? void 0 : _a.call(options, () => {
                    rej(new Error('renderFrames() got cancelled'));
                });
            }),
            Promise.all([
                (0, prepare_server_1.prepareServer)({
                    webpackConfigOrServeUrl: selectedServeUrl,
                    downloadDir,
                    onDownload,
                    onError,
                    ffmpegExecutable: (_a = options.ffmpegExecutable) !== null && _a !== void 0 ? _a : null,
                    ffprobeExecutable: (_b = options.ffprobeExecutable) !== null && _b !== void 0 ? _b : null,
                    port: (_c = options.port) !== null && _c !== void 0 ? _c : null,
                }),
                browserInstance,
            ]).then(([{ serveUrl, closeServer, offthreadPort }, puppeteerInstance]) => {
                const { stopCycling } = (0, cycle_browser_tabs_1.cycleBrowserTabs)(puppeteerInstance, actualParallelism);
                cleanup.push(stopCycling);
                cleanup.push(closeServer);
                return innerRenderFrames({
                    ...options,
                    puppeteerInstance,
                    onError,
                    pagesArray: openedPages,
                    serveUrl,
                    composition,
                    actualParallelism,
                    onDownload,
                    downloadDir,
                    proxyPort: offthreadPort,
                });
            }),
        ])
            .then((res) => {
            return resolve(res);
        })
            .catch((err) => reject(err))
            .finally(() => {
            // If browser instance was passed in, we close all the pages
            // we opened.
            // If new browser was opened, then closing the browser as a cleanup.
            if (options.puppeteerInstance) {
                Promise.all(openedPages.map((p) => p.close())).catch((err) => {
                    console.log('Unable to close browser tab', err);
                });
            }
            else {
                Promise.resolve(browserInstance)
                    .then((puppeteerInstance) => {
                    return puppeteerInstance.close();
                })
                    .catch((err) => {
                    console.log('Unable to close browser', err);
                });
            }
            cleanup.forEach((c) => {
                c();
            });
        });
    });
};
exports.renderFrames = renderFrames;
