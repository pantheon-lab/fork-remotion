"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUNCTION_ZIP = void 0;
const path_1 = __importDefault(require("path"));
exports.FUNCTION_ZIP = path_1.default.join(path_1.default.resolve(__dirname, '..', '..'), `remotionlambda.zip`);
