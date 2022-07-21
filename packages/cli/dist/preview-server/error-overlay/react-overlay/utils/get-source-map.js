"use strict";
/*
    Source code adapted from https://github.com/facebook/create-react-app/tree/main/packages/react-error-overlay and refactored in Typescript. This file is MIT-licensed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceMap = exports.getOriginalPosition = void 0;
const source_map_1 = require("source-map");
const getOriginalPosition = (source_map, line, column) => {
    const result = source_map.originalPositionFor({
        line,
        column,
    });
    return { line: result.line, column: result.column, source: result.source };
};
exports.getOriginalPosition = getOriginalPosition;
function extractSourceMapUrl(fileContents) {
    const regex = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;
    let match = null;
    for (;;) {
        const next = regex.exec(fileContents);
        if (next == null) {
            break;
        }
        match = next;
    }
    if (!(match === null || match === void 0 ? void 0 : match[1])) {
        return null;
    }
    return match[1].toString();
}
async function getSourceMap(fileUri, fileContents) {
    const sm = extractSourceMapUrl(fileContents);
    if (sm === null) {
        return null;
    }
    if (sm.indexOf('data:') === 0) {
        const base64 = /^data:application\/json;([\w=:"-]+;)*base64,/;
        const match2 = sm.match(base64);
        if (!match2) {
            throw new Error('Sorry, non-base64 inline source-map encoding is not supported.');
        }
        const converted = window.atob(sm.substring(match2[0].length));
        return new source_map_1.SourceMapConsumer(JSON.parse(converted));
    }
    const index = fileUri.lastIndexOf('/');
    const url = fileUri.substring(0, index + 1) + sm;
    const obj = await fetch(url).then((res) => res.json());
    return new source_map_1.SourceMapConsumer(obj);
}
exports.getSourceMap = getSourceMap;