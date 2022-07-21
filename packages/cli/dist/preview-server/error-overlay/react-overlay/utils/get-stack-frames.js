"use strict";
/*
    Source code adapted from https://github.com/facebook/create-react-app/tree/main/packages/react-error-overlay and refactored in Typescript. This file is MIT-licensed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStackFrames = void 0;
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const parser_1 = require("./parser");
const unmapper_1 = require("./unmapper");
const getStackFrames = async (error, contextSize) => {
    const parsedFrames = await (0, parser_1.parseError)(error, contextSize);
    const enhancedFrames = await (0, unmapper_1.unmap)(parsedFrames, contextSize);
    if (enhancedFrames
        .map((f) => f.originalFileName)
        .filter((f_1) => f_1 !== null &&
        f_1 !== undefined &&
        f_1.indexOf('node_modules') === -1).length === 0) {
        return null;
    }
    return enhancedFrames;
};
exports.getStackFrames = getStackFrames;
