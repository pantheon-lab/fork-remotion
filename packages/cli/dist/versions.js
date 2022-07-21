"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionsCommand = exports.validateVersionsBeforeCommand = exports.VERSIONS_COMMAND = void 0;
const fs_1 = __importDefault(require("fs"));
const remotion_1 = require("remotion");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const resolve_from_1 = require("./resolve-from");
const packages = [
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
];
const getVersion = async (p) => {
    try {
        const remotionPkgJson = (0, resolve_from_1.resolveFrom)(process.cwd(), `${p}/package.json`);
        const file = await fs_1.default.promises.readFile(remotionPkgJson, 'utf-8');
        const packageJson = JSON.parse(file);
        return packageJson.version;
    }
    catch (err) {
        return null;
    }
};
const groupBy = (vals) => {
    const groups = {};
    for (const [pkg, version] of vals) {
        if (!groups[version]) {
            groups[version] = [];
        }
        groups[version].push(pkg);
    }
    return groups;
};
const getAllVersions = async () => {
    return (await Promise.all(packages.map(async (p) => [p, await getVersion(p)]))).filter(([, version]) => version);
};
exports.VERSIONS_COMMAND = 'versions';
const validateVersionsBeforeCommand = async () => {
    const versions = await getAllVersions();
    const grouped = groupBy(versions);
    const installedVersions = Object.keys(grouped);
    if (installedVersions.length === 1) {
        return;
    }
    log_1.Log.warn('-------------');
    log_1.Log.warn('Version mismatch:');
    for (const version of installedVersions) {
        log_1.Log.warn(`- On version: ${version}`);
        for (const pkg of grouped[version]) {
            log_1.Log.warn(`  - ${pkg}`);
        }
        log_1.Log.info();
    }
    log_1.Log.warn('You may experience breakages such as:');
    log_1.Log.warn('- React context and hooks not working');
    log_1.Log.warn('- Type errors and feature incompatibilities');
    log_1.Log.warn('- Failed renders and unclear errors');
    log_1.Log.warn();
    log_1.Log.warn('To resolve:');
    log_1.Log.warn('- Make sure your package.json has all Remotion packages pointing to the same version.');
    log_1.Log.warn('- Remove the `^` character in front of a version to pin a package.');
    if (!remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose')) {
        log_1.Log.warn('- Run `npx remotion versions --log=verbose` to see the path of the modules resolved.');
    }
    log_1.Log.warn('-------------');
    log_1.Log.info();
};
exports.validateVersionsBeforeCommand = validateVersionsBeforeCommand;
const versionsCommand = async () => {
    (0, parse_command_line_1.parseCommandLine)('versions');
    const versions = await getAllVersions();
    const grouped = groupBy(versions);
    const installedVersions = Object.keys(grouped);
    log_1.Log.info(`Node.JS = ${process.version}, OS = ${process.platform}`);
    log_1.Log.info();
    for (const version of installedVersions) {
        log_1.Log.info(`On version: ${version}`);
        for (const pkg of grouped[version]) {
            log_1.Log.info(`- ${pkg}`);
            log_1.Log.verbose(`  ${(0, resolve_from_1.resolveFrom)(process.cwd(), `${pkg}/package.json`)}`);
        }
        log_1.Log.info();
    }
    if (installedVersions.length === 1) {
        log_1.Log.info(`✅ Great! All packages have the same version.`);
    }
    else {
        log_1.Log.error('Version mismatch: Not all Remotion packages have the same version.');
        log_1.Log.info('- Make sure your package.json has all Remotion packages pointing to the same version.');
        log_1.Log.info('- Remove the `^` character in front of a version to pin a package.');
        if (!remotion_1.Internals.Logging.isEqualOrBelowLogLevel(remotion_1.Internals.Logging.getLogLevel(), 'verbose')) {
            log_1.Log.info('- Rerun this command with --log=verbose to see the path of the modules resolved.');
        }
        process.exit(1);
    }
};
exports.versionsCommand = versionsCommand;
