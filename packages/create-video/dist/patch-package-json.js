"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchPackageJson = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const patchPackageJson = (projectRoot, projectName) => {
    const fileName = path_1.default.join(projectRoot, 'package.json');
    const contents = fs_1.default.readFileSync(fileName, 'utf-8');
    const packageJson = JSON.parse(contents);
    const newPackageJson = JSON.stringify({
        ...packageJson,
        name: projectName,
    }, undefined, 2);
    fs_1.default.writeFileSync(fileName, newPackageJson);
};
exports.patchPackageJson = patchPackageJson;
