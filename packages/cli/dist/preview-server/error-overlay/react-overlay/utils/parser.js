"use strict";
/*
    Source code adapted from https://github.com/facebook/create-react-app/tree/main/packages/react-error-overlay and refactored in Typescript. This file is MIT-licensed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseError = void 0;
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const map_error_to_react_stack_1 = require("../effects/map-error-to-react-stack");
const resolve_file_source_1 = require("../effects/resolve-file-source");
const stack_frame_1 = require("./stack-frame");
const regexExtractLocation = /\(?(.+?)(?::(\d+))?(?::(\d+))?\)?$/;
function extractLocation(token) {
    const execed = regexExtractLocation.exec(token);
    if (!execed) {
        throw new Error('Could not match in extractLocation');
    }
    return execed.slice(1).map((v) => {
        const p = Number(v);
        if (!isNaN(p)) {
            return p;
        }
        return v;
    });
}
const regexValidFrame_Chrome = /^\s*(at|in)\s.+(:\d+)/;
const regexValidFrame_FireFox = /(^|@)\S+:\d+|.+line\s+\d+\s+>\s+(eval|Function).+/;
function parseStack(stack) {
    const frames = stack
        .filter((e) => regexValidFrame_Chrome.test(e) || regexValidFrame_FireFox.test(e))
        .map((e) => {
        if (regexValidFrame_FireFox.test(e)) {
            // Strip eval, we don't care about it
            let isEval = false;
            if (/ > (eval|Function)/.test(e)) {
                e = e.replace(/ line (\d+)(?: > eval line \d+)* > (eval|Function):\d+:\d+/g, ':$1');
                isEval = true;
            }
            const _data = e.split(/[@]/g);
            const _last = _data.pop();
            if (!_last) {
                throw new Error('could not get last');
            }
            const [_fileName, _lineNumber, _columnNumber] = extractLocation(_last);
            return (0, stack_frame_1.makeStackFrame)({
                functionName: _data.join('@') || (isEval ? 'eval' : null),
                fileName: _fileName,
                lineNumber: _lineNumber,
                columnNumber: _columnNumber,
            });
        }
        // Strip eval, we don't care about it
        if (e.indexOf('(eval ') !== -1) {
            e = e.replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
        }
        if (e.indexOf('(at ') !== -1) {
            e = e.replace(/\(at /, '(');
        }
        const data = e.trim().split(/\s+/g).slice(1);
        const last = data.pop();
        if (!last) {
            throw new Error('could not get last');
        }
        const [fileName, lineNumber, columnNumber] = extractLocation(last);
        return (0, stack_frame_1.makeStackFrame)({
            functionName: data.join(' ') || null,
            fileName,
            lineNumber,
            columnNumber,
        });
    });
    return frames;
}
const parseError = async (error, contextLines) => {
    if (error === null) {
        throw new Error('You cannot pass a null object.');
    }
    if (typeof error === 'string') {
        return parseStack(error.split('\n')).map((frame) => {
            return {
                type: 'transpiled',
                frame,
            };
        });
    }
    if (Array.isArray(error)) {
        return parseStack(error).map((frame) => {
            return {
                type: 'transpiled',
                frame,
            };
        });
    }
    const errorLocation = (0, map_error_to_react_stack_1.getLocationFromBuildError)(error);
    if (errorLocation) {
        return [
            {
                type: 'symbolicated',
                frame: await (0, resolve_file_source_1.resolveFileSource)(errorLocation, contextLines),
            },
        ];
    }
    if (typeof error.stack === 'string') {
        return parseStack(error.stack.split('\n')).map((frame) => {
            return {
                type: 'transpiled',
                frame,
            };
        });
    }
    return [];
};
exports.parseError = parseError;