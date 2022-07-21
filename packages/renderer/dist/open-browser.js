"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openBrowser = exports.killAllBrowsers = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const node_1 = require("./browser/node");
const get_local_browser_executable_1 = require("./get-local-browser-executable");
const validRenderers = ['swangle', 'angle', 'egl', 'swiftshader'];
const getOpenGlRenderer = (option) => {
    const renderer = option !== null && option !== void 0 ? option : remotion_1.Internals.DEFAULT_OPENGL_RENDERER;
    remotion_1.Internals.validateOpenGlRenderer(renderer);
    if (renderer === 'swangle') {
        return [`--use-gl=angle`, `--use-angle=swiftshader`];
    }
    if (renderer === null) {
        return [];
    }
    return [`--use-gl=${renderer}`];
};
const browserInstances = [];
const killAllBrowsers = async () => {
    for (const browser of browserInstances) {
        try {
            await browser.close();
        }
        catch (err) { }
    }
};
exports.killAllBrowsers = killAllBrowsers;
const openBrowser = async (browser, options) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (browser === 'firefox' && !remotion_1.Internals.FEATURE_FLAG_FIREFOX_SUPPORT) {
        throw new TypeError('Firefox supported is not yet turned on. Stay tuned for the future.');
    }
    await (0, get_local_browser_executable_1.ensureLocalBrowser)(browser, (_a = options === null || options === void 0 ? void 0 : options.browserExecutable) !== null && _a !== void 0 ? _a : null);
    const executablePath = (0, get_local_browser_executable_1.getLocalBrowserExecutable)(browser, (_b = options === null || options === void 0 ? void 0 : options.browserExecutable) !== null && _b !== void 0 ? _b : null);
    const customGlRenderer = getOpenGlRenderer((_d = (_c = options === null || options === void 0 ? void 0 : options.chromiumOptions) === null || _c === void 0 ? void 0 : _c.gl) !== null && _d !== void 0 ? _d : null);
    const browserInstance = await node_1.puppeteer.launch({
        executablePath,
        product: browser,
        dumpio: (_e = options === null || options === void 0 ? void 0 : options.shouldDumpIo) !== null && _e !== void 0 ? _e : false,
        args: [
            'about:blank',
            '--allow-pre-commit-input',
            '--disable-background-networking',
            '--enable-features=NetworkService,NetworkServiceInProcess',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-extensions-with-background-pages',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            '--no-proxy-server',
            "--proxy-server='direct://'",
            '--proxy-bypass-list=*',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-popup-blocking',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-sync',
            '--force-color-profile=srgb',
            '--metrics-recording-only',
            '--no-first-run',
            '--video-threads=16',
            '--enable-automation',
            '--password-store=basic',
            '--use-mock-keychain',
            '--enable-blink-features=IdleDetection',
            '--export-tagged-pdf',
            '--intensive-wake-up-throttling-policy=0',
            ((_g = (_f = options === null || options === void 0 ? void 0 : options.chromiumOptions) === null || _f === void 0 ? void 0 : _f.headless) !== null && _g !== void 0 ? _g : true) ? '--headless' : null,
            '--no-sandbox',
            '--disable-setuid-sandbox',
            ...customGlRenderer,
            '--disable-background-media-suspend',
            process.platform === 'linux' ? '--single-process' : null,
            '--allow-running-insecure-content',
            '--disable-component-update',
            '--disable-domain-reliability',
            '--disable-features=AudioServiceOutOfProcess,IsolateOrigins,site-per-process,Translate,BackForwardCache,AvoidUnnecessaryBeforeUnloadCheckSync,IntensiveWakeUpThrottling',
            '--disable-print-preview',
            '--disable-site-isolation-trials',
            '--disk-cache-size=268435456',
            '--hide-scrollbars',
            '--no-default-browser-check',
            '--no-pings',
            '--font-render-hinting=none',
            '--no-zygote',
            (options === null || options === void 0 ? void 0 : options.forceDeviceScaleFactor)
                ? `--force-device-scale-factor=${options.forceDeviceScaleFactor}`
                : null,
            ((_h = options === null || options === void 0 ? void 0 : options.chromiumOptions) === null || _h === void 0 ? void 0 : _h.ignoreCertificateErrors)
                ? '--ignore-certificate-errors'
                : null,
            ...(((_j = options === null || options === void 0 ? void 0 : options.chromiumOptions) === null || _j === void 0 ? void 0 : _j.disableWebSecurity)
                ? [
                    '--disable-web-security',
                    '--user-data-dir=' +
                        (await fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'chrome-user-dir'))),
                ]
                : []),
        ].filter(Boolean),
        defaultViewport: (_k = options === null || options === void 0 ? void 0 : options.viewport) !== null && _k !== void 0 ? _k : {
            height: 720,
            width: 1280,
            deviceScaleFactor: 1,
        },
    });
    const pages = await browserInstance.pages();
    await pages[0].close();
    browserInstances.push(browserInstance);
    return browserInstance;
};
exports.openBrowser = openBrowser;
