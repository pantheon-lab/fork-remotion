"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgrade = void 0;
const renderer_1 = require("@remotion/renderer");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const get_latest_remotion_version_1 = require("./get-latest-remotion-version");
const log_1 = require("./log");
const get_package_manager_1 = require("./preview-server/get-package-manager");
const getUpgradeCommand = ({ manager, packages, version, }) => {
    const pkgList = packages.map((p) => `${p}@^${version}`);
    const commands = {
        npm: ['i', ...pkgList],
        pnpm: ['i', ...pkgList],
        yarn: ['add', ...pkgList],
    };
    return commands[manager];
};
const upgrade = async () => {
    var _a;
    const packageJsonFilePath = path_1.default.join(process.cwd(), 'package.json');
    if (!fs_1.default.existsSync(packageJsonFilePath)) {
        log_1.Log.error('Could not upgrade because no package.json could be found in your project.');
        process.exit(1);
    }
    const packageJson = require(packageJsonFilePath);
    const dependencies = Object.keys(packageJson.dependencies);
    const latestRemotionVersion = await (0, get_latest_remotion_version_1.getLatestRemotionVersion)();
    const manager = (0, get_package_manager_1.getPackageManager)();
    if (manager === 'unknown') {
        throw new Error(`No lockfile was found in your project (one of ${get_package_manager_1.lockFilePaths
            .map((p) => p.path)
            .join(', ')}). Install dependencies using your favorite manager!`);
    }
    const toUpgrade = [
        '@remotion/bundler',
        '@remotion/cli',
        '@remotion/eslint-config',
        '@remotion/renderer',
        '@remotion/skia',
        '@remotion/media-utils',
        '@remotion/babel-loader',
        '@remotion/lambda',
        '@remotion/preload',
        '@remotion/three',
        '@remotion/gif',
        'remotion',
    ].filter((u) => dependencies.includes(u));
    const prom = renderer_1.RenderInternals.execa(manager.manager, getUpgradeCommand({
        manager: manager.manager,
        packages: toUpgrade,
        version: latestRemotionVersion,
    }), {
        stdio: 'inherit',
    });
    if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'info')) {
        (_a = prom.stdout) === null || _a === void 0 ? void 0 : _a.pipe(process.stdout);
    }
    await prom;
    log_1.Log.info('⏫ Remotion has been upgraded!');
};
exports.upgrade = upgrade;
