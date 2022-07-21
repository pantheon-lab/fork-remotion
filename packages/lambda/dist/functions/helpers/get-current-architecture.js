"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentArchitecture = void 0;
const is_in_lambda_1 = require("../../shared/is-in-lambda");
const getCurrentArchitecture = () => {
    if (!(0, is_in_lambda_1.isInsideLambda)()) {
        throw new Error('Should not call getCurrentArchitecture() if not inside a lambda function');
    }
    return process.arch.includes('arm') ? 'arm64' : 'x86_64';
};
exports.getCurrentArchitecture = getCurrentArchitecture;
