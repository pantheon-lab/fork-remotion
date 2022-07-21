"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoHandler = void 0;
const constants_1 = require("../shared/constants");
const infoHandler = (lambdaParams) => {
    if (lambdaParams.type !== constants_1.LambdaRoutines.info) {
        throw new TypeError('Expected info type');
    }
    const returnValue = {
        version: constants_1.CURRENT_VERSION,
    };
    return Promise.resolve(returnValue);
};
exports.infoHandler = infoHandler;
