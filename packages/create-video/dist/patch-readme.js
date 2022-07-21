"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchReadmeMd = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pkg_managers_1 = require("./pkg-managers");
const patchReadmeMd = (projectRoot, packageManager) => {
    const fileName = path_1.default.join(projectRoot, 'README.md');
    const contents = fs_1.default.readFileSync(fileName, 'utf8');
    const newContents = contents
        .split('\n')
        .map((c) => {
        if (c.startsWith('npm install') || c.startsWith('npm i')) {
            return (0, pkg_managers_1.getInstallCommand)(packageManager);
        }
        if (c.startsWith('npm start')) {
            return (0, pkg_managers_1.getStartCommand)(packageManager);
        }
        if (c.startsWith('npm run build')) {
            return (0, pkg_managers_1.getRenderCommand)(packageManager);
        }
        if (c.startsWith('npm run upgrade')) {
            return (0, pkg_managers_1.getUpgradeCommand)(packageManager);
        }
        return c;
    })
        .join('\n');
    fs_1.default.writeFileSync(fileName, newContents);
};
exports.patchReadmeMd = patchReadmeMd;
