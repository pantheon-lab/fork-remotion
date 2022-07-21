"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpgradeCommand = exports.getRenderCommand = exports.getStartCommand = exports.getInstallCommand = exports.selectPackageManager = void 0;
const path_1 = __importDefault(require("path"));
const shouldUseYarn = () => {
    var _a, _b;
    return Boolean(((_a = process.env.npm_execpath) === null || _a === void 0 ? void 0 : _a.includes('yarn.js')) ||
        ((_b = process.env.npm_config_user_agent) === null || _b === void 0 ? void 0 : _b.includes('yarn')));
};
const shouldUsePnpm = () => {
    if (__dirname.includes(path_1.default.join('.pnpm', 'create-video'))) {
        return true;
    }
    if (!process.env.npm_config_argv) {
        return false;
    }
    try {
        const conf = JSON.parse(process.env.npm_config_argv);
        return conf.remain[0] === 'dlx';
    }
    catch (err) {
        return false;
    }
};
const selectPackageManager = () => {
    if (shouldUseYarn()) {
        return 'yarn';
    }
    if (shouldUsePnpm()) {
        return 'pnpm';
    }
    return 'npm';
};
exports.selectPackageManager = selectPackageManager;
const getInstallCommand = (manager) => {
    if (manager === 'npm') {
        return `npm i`;
    }
    if (manager === 'yarn') {
        return `yarn`;
    }
    if (manager === 'pnpm') {
        return `pnpm i`;
    }
};
exports.getInstallCommand = getInstallCommand;
const getStartCommand = (manager) => {
    if (manager === 'npm') {
        return `npm start`;
    }
    if (manager === 'yarn') {
        return `yarn start`;
    }
    if (manager === 'pnpm') {
        return `pnpm start`;
    }
};
exports.getStartCommand = getStartCommand;
const getRenderCommand = (manager) => {
    if (manager === 'npm') {
        return `npm run build`;
    }
    if (manager === 'yarn') {
        return `yarn build`;
    }
    if (manager === 'pnpm') {
        return `pnpm build`;
    }
};
exports.getRenderCommand = getRenderCommand;
const getUpgradeCommand = (manager) => {
    if (manager === 'npm') {
        return `npm run upgrade`;
    }
    if (manager === 'yarn') {
        return `yarn run upgrade`;
    }
    if (manager === 'pnpm') {
        return `pnpm run upgrade`;
    }
};
exports.getUpgradeCommand = getUpgradeCommand;
