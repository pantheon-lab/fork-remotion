"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUpdateAvailableWithTimeout = exports.getRemotionVersion = void 0;
const semver_1 = __importDefault(require("semver"));
const get_latest_remotion_version_1 = require("../get-latest-remotion-version");
const get_package_manager_1 = require("./get-package-manager");
const isUpdateAvailable = async (currentVersion) => {
    const latest = await (0, get_latest_remotion_version_1.getLatestRemotionVersion)();
    const pkgManager = (0, get_package_manager_1.getPackageManager)();
    return {
        updateAvailable: semver_1.default.lt(currentVersion, latest),
        currentVersion,
        latestVersion: latest,
        timedOut: false,
        packageManager: pkgManager === 'unknown' ? 'unknown' : pkgManager.manager,
    };
};
const getRemotionVersion = () => {
    // careful when refactoring this file, path must be adjusted
    const packageJson = require('../../package.json');
    const { version } = packageJson;
    return version;
};
exports.getRemotionVersion = getRemotionVersion;
const isUpdateAvailableWithTimeout = () => {
    const version = (0, exports.getRemotionVersion)();
    const threeSecTimeout = new Promise((resolve) => {
        const pkgManager = (0, get_package_manager_1.getPackageManager)();
        setTimeout(() => {
            resolve({
                currentVersion: version,
                latestVersion: version,
                updateAvailable: false,
                timedOut: true,
                packageManager: pkgManager === 'unknown' ? 'unknown' : pkgManager.manager,
            });
        }, 3000);
    });
    return Promise.race([threeSecTimeout, isUpdateAvailable(version)]);
};
exports.isUpdateAvailableWithTimeout = isUpdateAvailableWithTimeout;
