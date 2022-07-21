"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageManager = exports.lockFilePaths = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.lockFilePaths = [
    { path: 'package-lock.json', manager: 'npm', installCommand: 'npm i' },
    {
        path: 'yarn.lock',
        manager: 'yarn',
        installCommand: 'yarn add',
    },
    {
        path: 'pnpm-lock.yaml',
        manager: 'pnpm',
        installCommand: 'pnpm i',
    },
];
const getPackageManager = () => {
    const existingPkgManagers = exports.lockFilePaths.filter((p) => fs_1.default.existsSync(path_1.default.join(process.cwd(), p.path)));
    if (existingPkgManagers.length === 0) {
        return 'unknown';
    }
    if (existingPkgManagers.length > 1) {
        const error = [
            `Found multiple lockfiles:`,
            ...existingPkgManagers.map((m) => {
                return `- ${m.path}`;
            }),
            '',
            'This can lead to bugs, delete all but one of these files and run this command again.',
        ].join('\n');
        throw new Error(error);
    }
    return existingPkgManagers[0];
};
exports.getPackageManager = getPackageManager;
