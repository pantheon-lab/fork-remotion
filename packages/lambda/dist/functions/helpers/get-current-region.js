"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentRegionInFunction = void 0;
const is_in_lambda_1 = require("../../shared/is-in-lambda");
const getCurrentRegionInFunction = () => {
    if (!(0, is_in_lambda_1.isInsideLambda)()) {
        throw new Error('Should not call getCurrentRegion() if not inside a lambda function');
    }
    if (!process.env.AWS_REGION) {
        throw new Error('Expected process.env.AWS_REGION to be defined');
    }
    return process.env.AWS_REGION;
};
exports.getCurrentRegionInFunction = getCurrentRegionInFunction;
