"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInsideLambda = void 0;
const isInsideLambda = () => { var _a; return Boolean(typeof process !== 'undefined' && ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.REMOTION_LAMBDA)); };
exports.isInsideLambda = isInsideLambda;
