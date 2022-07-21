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
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const assert_1 = require("./assert");
const Browser_1 = require("./Browser");
const BrowserFetcher_1 = require("./BrowserFetcher");
const BrowserRunner_1 = require("./BrowserRunner");
const copyFileAsync = fs.promises.copyFile;
const mkdtempAsync = fs.promises.mkdtemp;
const writeFileAsync = fs.promises.writeFile;
const tmpDir = () => {
    return process.env.PUPPETEER_TMP_DIR || os.tmpdir();
};
class ChromeLauncher {
    constructor(preferredRevision) {
        this._preferredRevision = preferredRevision;
    }
    async launch(options) {
        const { args = [], dumpio = false, executablePath, pipe = false, env = process.env, handleSIGINT = true, handleSIGTERM = true, handleSIGHUP = true, defaultViewport, timeout = 60000, debuggingPort, } = options;
        const chromeArguments = args;
        if (!chromeArguments.some((argument) => {
            return argument.startsWith('--remote-debugging-');
        })) {
            if (pipe) {
                (0, assert_1.assert)(!debuggingPort, 'Browser should be launched with either pipe or debugging port - not both.');
                chromeArguments.push('--remote-debugging-pipe');
            }
            else {
                chromeArguments.push(`--remote-debugging-port=${debuggingPort || 0}`);
            }
        }
        let isTempUserDataDir = true;
        // Check for the user data dir argument, which will always be set even
        // with a custom directory specified via the userDataDir option.
        let userDataDirIndex = chromeArguments.findIndex((arg) => {
            return arg.startsWith('--user-data-dir');
        });
        if (userDataDirIndex < 0) {
            chromeArguments.push(`--user-data-dir=${await mkdtempAsync(path.join(tmpDir(), 'puppeteer_dev_chrome_profile-'))}`);
            userDataDirIndex = chromeArguments.length - 1;
        }
        const userDataDir = chromeArguments[userDataDirIndex].split('=', 2)[1];
        (0, assert_1.assert)(typeof userDataDir === 'string', '`--user-data-dir` is malformed');
        isTempUserDataDir = false;
        let chromeExecutable = executablePath;
        if (!chromeExecutable) {
            const { missingText, executablePath: exPath } = resolveExecutablePath(this);
            if (missingText) {
                throw new Error(missingText);
            }
            chromeExecutable = exPath;
        }
        const runner = new BrowserRunner_1.BrowserRunner({
            product: this.product,
            executablePath: chromeExecutable,
            processArguments: chromeArguments,
            userDataDir,
            isTempUserDataDir,
        });
        runner.start({
            handleSIGHUP,
            handleSIGTERM,
            handleSIGINT,
            dumpio,
            env,
            pipe: false,
        });
        let browser;
        try {
            const connection = await runner.setupConnection({
                timeout,
                preferredRevision: this._preferredRevision,
            });
            browser = await Browser_1.Browser._create({
                connection,
                contextIds: [],
                defaultViewport,
                closeCallback: runner.close.bind(runner),
            });
        }
        catch (error) {
            runner.kill();
            throw error;
        }
        try {
            await browser.waitForTarget((t) => {
                return t.type() === 'page';
            }, { timeout });
        }
        catch (error) {
            await browser.close();
            throw error;
        }
        return browser;
    }
    executablePath() {
        const results = resolveExecutablePath(this);
        return results.executablePath;
    }
    get product() {
        return 'chrome';
    }
}
class FirefoxLauncher {
    constructor(preferredRevision) {
        this._preferredRevision = preferredRevision;
    }
    async launch(options) {
        const { dumpio = false, executablePath = null, env = process.env, handleSIGINT = true, handleSIGTERM = true, handleSIGHUP = true, defaultViewport, timeout = 30000, extraPrefsFirefox = {}, debuggingPort = null, } = options;
        const firefoxArguments = [];
        firefoxArguments.push(...this.defaultArgs(options));
        if (!firefoxArguments.some((argument) => {
            return argument.startsWith('--remote-debugging-');
        })) {
            firefoxArguments.push(`--remote-debugging-port=${debuggingPort || 0}`);
        }
        let userDataDir;
        let isTempUserDataDir = true;
        // Check for the profile argument, which will always be set even
        // with a custom directory specified via the userDataDir option.
        const profileArgIndex = firefoxArguments.findIndex((arg) => {
            return ['-profile', '--profile'].includes(arg);
        });
        if (profileArgIndex === -1) {
            userDataDir = await this._createProfile(extraPrefsFirefox);
            firefoxArguments.push('--profile');
            firefoxArguments.push(userDataDir);
        }
        else {
            userDataDir = firefoxArguments[profileArgIndex + 1];
            if (!userDataDir || !fs.existsSync(userDataDir)) {
                throw new Error(`Firefox profile not found at '${userDataDir}'`);
            }
            // When using a custom Firefox profile it needs to be populated
            // with required preferences.
            isTempUserDataDir = false;
            const prefs = this.defaultPreferences(extraPrefsFirefox);
            this.writePreferences(prefs, userDataDir);
        }
        await this._updateRevision();
        let firefoxExecutable = executablePath;
        if (!executablePath) {
            const { missingText, executablePath: exPath } = resolveExecutablePath(this);
            if (missingText) {
                throw new Error(missingText);
            }
            firefoxExecutable = exPath;
        }
        if (!firefoxExecutable) {
            throw new Error('firefoxExecutable is not found.');
        }
        const runner = new BrowserRunner_1.BrowserRunner({
            product: this.product,
            executablePath: firefoxExecutable,
            processArguments: firefoxArguments,
            userDataDir,
            isTempUserDataDir,
        });
        runner.start({
            handleSIGHUP,
            handleSIGTERM,
            handleSIGINT,
            dumpio,
            env,
        });
        let browser;
        try {
            const connection = await runner.setupConnection({
                timeout,
                preferredRevision: this._preferredRevision,
            });
            browser = await Browser_1.Browser._create({
                connection,
                contextIds: [],
                defaultViewport,
                closeCallback: runner.close.bind(runner),
            });
        }
        catch (error) {
            runner.kill();
            throw error;
        }
        try {
            await browser.waitForTarget((t) => {
                return t.type() === 'page';
            }, { timeout });
        }
        catch (error) {
            await browser.close();
            throw error;
        }
        return browser;
    }
    executablePath() {
        return resolveExecutablePath(this).executablePath;
    }
    async _updateRevision() {
        // replace 'latest' placeholder with actual downloaded revision
        if (this._preferredRevision === 'latest') {
            const browserFetcher = new BrowserFetcher_1.BrowserFetcher({
                product: this.product,
                path: null,
                platform: null,
            });
            const localRevisions = await browserFetcher.localRevisions();
            if (localRevisions[0]) {
                this._preferredRevision = localRevisions[0];
            }
        }
    }
    get product() {
        return 'firefox';
    }
    defaultArgs(options) {
        const { devtools = false, headless = !devtools, args = [], userDataDir = null, } = options;
        const firefoxArguments = ['--no-remote'];
        if (os.platform() === 'darwin') {
            firefoxArguments.push('--foreground');
        }
        else if (os.platform().startsWith('win')) {
            firefoxArguments.push('--wait-for-browser');
        }
        if (userDataDir) {
            firefoxArguments.push('--profile');
            firefoxArguments.push(userDataDir);
        }
        if (headless) {
            firefoxArguments.push('--headless');
        }
        if (devtools) {
            firefoxArguments.push('--devtools');
        }
        if (args.every((arg) => {
            return arg.startsWith('-');
        })) {
            firefoxArguments.push('about:blank');
        }
        firefoxArguments.push(...args);
        return firefoxArguments;
    }
    defaultPreferences(extraPrefs) {
        const server = 'dummy.test';
        const defaultPrefs = {
            // Make sure Shield doesn't hit the network.
            'app.normandy.api_url': '',
            // Disable Firefox old build background check
            'app.update.checkInstallTime': false,
            // Disable automatically upgrading Firefox
            'app.update.disabledForTesting': true,
            // Increase the APZ content response timeout to 1 minute
            'apz.content_response_timeout': 60000,
            // Prevent various error message on the console
            // jest-puppeteer asserts that no error message is emitted by the console
            'browser.contentblocking.features.standard': '-tp,tpPrivate,cookieBehavior0,-cm,-fp',
            // Enable the dump function: which sends messages to the system
            // console
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1543115
            'browser.dom.window.dump.enabled': true,
            // Disable topstories
            'browser.newtabpage.activity-stream.feeds.system.topstories': false,
            // Always display a blank page
            'browser.newtabpage.enabled': false,
            // Background thumbnails in particular cause grief: and disabling
            // thumbnails in general cannot hurt
            'browser.pagethumbnails.capturing_disabled': true,
            // Disable safebrowsing components.
            'browser.safebrowsing.blockedURIs.enabled': false,
            'browser.safebrowsing.downloads.enabled': false,
            'browser.safebrowsing.malware.enabled': false,
            'browser.safebrowsing.passwords.enabled': false,
            'browser.safebrowsing.phishing.enabled': false,
            // Disable updates to search engines.
            'browser.search.update': false,
            // Do not restore the last open set of tabs if the browser has crashed
            'browser.sessionstore.resume_from_crash': false,
            // Skip check for default browser on startup
            'browser.shell.checkDefaultBrowser': false,
            // Disable newtabpage
            'browser.startup.homepage': 'about:blank',
            // Do not redirect user when a milstone upgrade of Firefox is detected
            'browser.startup.homepage_override.mstone': 'ignore',
            // Start with a blank page about:blank
            'browser.startup.page': 0,
            // Do not allow background tabs to be zombified on Android: otherwise for
            // tests that open additional tabs: the test harness tab itself might get
            // unloaded
            'browser.tabs.disableBackgroundZombification': false,
            // Do not warn when closing all other open tabs
            'browser.tabs.warnOnCloseOtherTabs': false,
            // Do not warn when multiple tabs will be opened
            'browser.tabs.warnOnOpen': false,
            // Disable the UI tour.
            'browser.uitour.enabled': false,
            // Turn off search suggestions in the location bar so as not to trigger
            // network connections.
            'browser.urlbar.suggest.searches': false,
            // Disable first run splash page on Windows 10
            'browser.usedOnWindows10.introURL': '',
            // Do not warn on quitting Firefox
            'browser.warnOnQuit': false,
            // Defensively disable data reporting systems
            'datareporting.healthreport.documentServerURI': `http://${server}/dummy/healthreport/`,
            'datareporting.healthreport.logging.consoleEnabled': false,
            'datareporting.healthreport.service.enabled': false,
            'datareporting.healthreport.service.firstRun': false,
            'datareporting.healthreport.uploadEnabled': false,
            // Do not show datareporting policy notifications which can interfere with tests
            'datareporting.policy.dataSubmissionEnabled': false,
            'datareporting.policy.dataSubmissionPolicyBypassNotification': true,
            // DevTools JSONViewer sometimes fails to load dependencies with its require.js.
            // This doesn't affect Puppeteer but spams console (Bug 1424372)
            'devtools.jsonview.enabled': false,
            // Disable popup-blocker
            'dom.disable_open_during_load': false,
            // Enable the support for File object creation in the content process
            // Required for |Page.setFileInputFiles| protocol method.
            'dom.file.createInChild': true,
            // Disable the ProcessHangMonitor
            'dom.ipc.reportProcessHangs': false,
            // Disable slow script dialogues
            'dom.max_chrome_script_run_time': 0,
            'dom.max_script_run_time': 0,
            // Only load extensions from the application and user profile
            // AddonManager.SCOPE_PROFILE + AddonManager.SCOPE_APPLICATION
            'extensions.autoDisableScopes': 0,
            'extensions.enabledScopes': 5,
            // Disable metadata caching for installed add-ons by default
            'extensions.getAddons.cache.enabled': false,
            // Disable installing any distribution extensions or add-ons.
            'extensions.installDistroAddons': false,
            // Disabled screenshots extension
            'extensions.screenshots.disabled': true,
            // Turn off extension updates so they do not bother tests
            'extensions.update.enabled': false,
            // Turn off extension updates so they do not bother tests
            'extensions.update.notifyUser': false,
            // Make sure opening about:addons will not hit the network
            'extensions.webservice.discoverURL': `http://${server}/dummy/discoveryURL`,
            // Temporarily force disable BFCache in parent (https://bit.ly/bug-1732263)
            'fission.bfcacheInParent': false,
            // Force all web content to use a single content process
            'fission.webContentIsolationStrategy': 0,
            // Allow the application to have focus even it runs in the background
            'focusmanager.testmode': true,
            // Disable useragent updates
            'general.useragent.updates.enabled': false,
            // Always use network provider for geolocation tests so we bypass the
            // macOS dialog raised by the corelocation provider
            'geo.provider.testing': true,
            // Do not scan Wifi
            'geo.wifi.scan': false,
            // No hang monitor
            'hangmonitor.timeout': 0,
            // Show chrome errors and warnings in the error console
            'javascript.options.showInConsole': true,
            // Disable download and usage of OpenH264: and Widevine plugins
            'media.gmp-manager.updateEnabled': false,
            // Prevent various error message on the console
            // jest-puppeteer asserts that no error message is emitted by the console
            'network.cookie.cookieBehavior': 0,
            // Disable experimental feature that is only available in Nightly
            'network.cookie.sameSite.laxByDefault': false,
            // Do not prompt for temporary redirects
            'network.http.prompt-temp-redirect': false,
            // Disable speculative connections so they are not reported as leaking
            // when they are hanging around
            'network.http.speculative-parallel-limit': 0,
            // Do not automatically switch between offline and online
            'network.manage-offline-status': false,
            // Make sure SNTP requests do not hit the network
            'network.sntp.pools': server,
            // Disable Flash.
            'plugin.state.flash': 0,
            'privacy.trackingprotection.enabled': false,
            // Can be removed once Firefox 89 is no longer supported
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1710839
            'remote.enabled': true,
            // Don't do network connections for mitm priming
            'security.certerrors.mitm.priming.enabled': false,
            // Local documents have access to all other local documents,
            // including directory listings
            'security.fileuri.strict_origin_policy': false,
            // Do not wait for the notification button security delay
            'security.notification_enable_delay': 0,
            // Ensure blocklist updates do not hit the network
            'services.settings.server': `http://${server}/dummy/blocklist/`,
            // Do not automatically fill sign-in forms with known usernames and
            // passwords
            'signon.autofillForms': false,
            // Disable password capture, so that tests that include forms are not
            // influenced by the presence of the persistent doorhanger notification
            'signon.rememberSignons': false,
            // Disable first-run welcome page
            'startup.homepage_welcome_url': 'about:blank',
            // Disable first-run welcome page
            'startup.homepage_welcome_url.additional': '',
            // Disable browser animations (tabs, fullscreen, sliding alerts)
            'toolkit.cosmeticAnimations.enabled': false,
            // Prevent starting into safe mode after application crashes
            'toolkit.startup.max_resumed_crashes': -1,
        };
        return Object.assign(defaultPrefs, extraPrefs);
    }
    /**
     * Populates the user.js file with custom preferences as needed to allow
     * Firefox's CDP support to properly function. These preferences will be
     * automatically copied over to prefs.js during startup of Firefox. To be
     * able to restore the original values of preferences a backup of prefs.js
     * will be created.
     *
     * @param prefs - List of preferences to add.
     * @param profilePath - Firefox profile to write the preferences to.
     */
    async writePreferences(prefs, profilePath) {
        const lines = Object.entries(prefs).map(([key, value]) => {
            return `user_pref(${JSON.stringify(key)}, ${JSON.stringify(value)});`;
        });
        await writeFileAsync(path.join(profilePath, 'user.js'), lines.join('\n'));
        // Create a backup of the preferences file if it already exitsts.
        const prefsPath = path.join(profilePath, 'prefs.js');
        if (fs.existsSync(prefsPath)) {
            const prefsBackupPath = path.join(profilePath, 'prefs.js.puppeteer');
            await copyFileAsync(prefsPath, prefsBackupPath);
        }
    }
    async _createProfile(extraPrefs) {
        const temporaryProfilePath = await mkdtempAsync(path.join(tmpDir(), 'puppeteer_dev_firefox_profile-'));
        const prefs = this.defaultPreferences(extraPrefs);
        await this.writePreferences(prefs, temporaryProfilePath);
        return temporaryProfilePath;
    }
}
function resolveExecutablePath(launcher) {
    const { product, _preferredRevision } = launcher;
    const browserFetcher = new BrowserFetcher_1.BrowserFetcher({
        product,
        path: null,
        platform: null,
    });
    const revisionInfo = browserFetcher.revisionInfo(_preferredRevision);
    const firefoxHelp = `Run \`PUPPETEER_PRODUCT=firefox npm install\` to download a supported Firefox browser binary.`;
    const chromeHelp = `Run \`npm install\` to download the correct Chromium revision (${launcher._preferredRevision}).`;
    const missingText = revisionInfo.local
        ? undefined
        : `Could not find expected browser (${product}) locally. ${product === 'chrome' ? chromeHelp : firefoxHelp}`;
    return { executablePath: revisionInfo.executablePath, missingText };
}
function Launcher(preferredRevision, product) {
    switch (product) {
        case 'firefox':
            return new FirefoxLauncher(preferredRevision);
        case 'chrome':
        default:
            if (typeof product !== 'undefined' && product !== 'chrome') {
                /* The user gave us an incorrect product name
                 * we'll default to launching Chrome, but log to the console
                 * to let the user know (they've probably typoed).
                 */
                console.warn(`Warning: unknown product name ${product}. Falling back to chrome.`);
            }
            return new ChromeLauncher(preferredRevision);
    }
}
exports.default = Launcher;
