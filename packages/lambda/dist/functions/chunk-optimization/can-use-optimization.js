"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUseOptimization = void 0;
const defaults_1 = require("../../defaults");
const canUseOptimization = ({ optimization, framesPerLambda, frameRange, }) => {
    if (!optimization) {
        return false;
    }
    if (optimization.framesPerLambda !== framesPerLambda) {
        return false;
    }
    if (optimization.lambdaVersion !== defaults_1.CURRENT_VERSION) {
        return false;
    }
    if (optimization.frameRange[0] !== frameRange[0]) {
        return false;
    }
    if (optimization.frameRange[1] !== frameRange[1]) {
        return false;
    }
    return true;
};
exports.canUseOptimization = canUseOptimization;
