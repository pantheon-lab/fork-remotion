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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmpDir = void 0;
const fs_1 = __importStar(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
const randomHash = () => {
    return new Array(10)
        .fill(1)
        .map(() => {
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    })
        .join('');
};
const tmpDir = (str) => {
    var _a;
    const newDir = path_1.default.join(os_1.default.tmpdir(), str + randomHash());
    if (fs_1.default.existsSync(newDir)) {
        ((_a = fs_1.default.rmSync) !== null && _a !== void 0 ? _a : fs_1.default.rmdirSync)(newDir, {
            recursive: true,
            force: true,
        });
    }
    (0, fs_1.mkdirSync)(newDir);
    return newDir;
};
exports.tmpDir = tmpDir;
