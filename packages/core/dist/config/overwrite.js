"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShouldOverwrite = exports.setOverwriteOutput = exports.DEFAULT_OVERWRITE = void 0;
exports.DEFAULT_OVERWRITE = true;
let shouldOverwrite = exports.DEFAULT_OVERWRITE;
const setOverwriteOutput = (newOverwrite) => {
    if (typeof newOverwrite !== 'boolean') {
        throw new Error(`overwriteExisting must be a boolean but got ${typeof newOverwrite} (${JSON.stringify(newOverwrite)})`);
    }
    shouldOverwrite = newOverwrite;
};
exports.setOverwriteOutput = setOverwriteOutput;
const getShouldOverwrite = () => shouldOverwrite;
exports.getShouldOverwrite = getShouldOverwrite;
