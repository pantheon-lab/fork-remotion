"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompositions = void 0;
const handle_javascript_exception_1 = require("./error-handling/handle-javascript-exception");
const get_browser_instance_1 = require("./get-browser-instance");
const make_assets_download_dir_1 = require("./make-assets-download-dir");
const prepare_server_1 = require("./prepare-server");
const puppeteer_evaluate_1 = require("./puppeteer-evaluate");
const set_props_and_env_1 = require("./set-props-and-env");
const validate_puppeteer_timeout_1 = require("./validate-puppeteer-timeout");
const innerGetCompositions = async (serveUrl, page, config, proxyPort) => {
    if (config === null || config === void 0 ? void 0 : config.onBrowserLog) {
        page.on('console', (log) => {
            var _a;
            (_a = config.onBrowserLog) === null || _a === void 0 ? void 0 : _a.call(config, {
                stackTrace: log.stackTrace(),
                text: log.text,
                type: log.type,
            });
        });
    }
    (0, validate_puppeteer_timeout_1.validatePuppeteerTimeout)(config === null || config === void 0 ? void 0 : config.timeoutInMilliseconds);
    await (0, set_props_and_env_1.setPropsAndEnv)({
        inputProps: config === null || config === void 0 ? void 0 : config.inputProps,
        envVariables: config === null || config === void 0 ? void 0 : config.envVariables,
        page,
        serveUrl,
        initialFrame: 0,
        timeoutInMilliseconds: config === null || config === void 0 ? void 0 : config.timeoutInMilliseconds,
        proxyPort,
        retriesRemaining: 2,
    });
    await (0, puppeteer_evaluate_1.puppeteerEvaluateWithCatch)({
        page,
        pageFunction: () => {
            window.setBundleMode({
                type: 'evaluation',
            });
        },
        frame: null,
        args: [],
    });
    await page.waitForFunction(page.browser, 'window.ready === true');
    const result = await (0, puppeteer_evaluate_1.puppeteerEvaluateWithCatch)({
        pageFunction: () => {
            return window.getStaticCompositions();
        },
        frame: null,
        page,
        args: [],
    });
    return result;
};
const getCompositions = async (serveUrlOrWebpackUrl, config) => {
    var _a, _b;
    const downloadDir = (0, make_assets_download_dir_1.makeAssetsDownloadTmpDir)();
    const { page, cleanup } = await (0, get_browser_instance_1.getPageAndCleanupFn)({
        passedInInstance: config === null || config === void 0 ? void 0 : config.puppeteerInstance,
        browserExecutable: (_a = config === null || config === void 0 ? void 0 : config.browserExecutable) !== null && _a !== void 0 ? _a : null,
        chromiumOptions: (_b = config === null || config === void 0 ? void 0 : config.chromiumOptions) !== null && _b !== void 0 ? _b : {},
    });
    return new Promise((resolve, reject) => {
        var _a, _b, _c;
        const onError = (err) => reject(err);
        const cleanupPageError = (0, handle_javascript_exception_1.handleJavascriptException)({
            page,
            frame: null,
            onError,
        });
        let close = null;
        (0, prepare_server_1.prepareServer)({
            webpackConfigOrServeUrl: serveUrlOrWebpackUrl,
            downloadDir,
            onDownload: () => undefined,
            onError,
            ffmpegExecutable: (_a = config === null || config === void 0 ? void 0 : config.ffmpegExecutable) !== null && _a !== void 0 ? _a : null,
            ffprobeExecutable: (_b = config === null || config === void 0 ? void 0 : config.ffprobeExecutable) !== null && _b !== void 0 ? _b : null,
            port: (_c = config === null || config === void 0 ? void 0 : config.port) !== null && _c !== void 0 ? _c : null,
        })
            .then(({ serveUrl, closeServer, offthreadPort }) => {
            close = closeServer;
            return innerGetCompositions(serveUrl, page, config !== null && config !== void 0 ? config : {}, offthreadPort);
        })
            .then((comp) => resolve(comp))
            .catch((err) => {
            reject(err);
        })
            .finally(() => {
            cleanup();
            close === null || close === void 0 ? void 0 : close();
            cleanupPageError();
        });
    });
};
exports.getCompositions = getCompositions;
