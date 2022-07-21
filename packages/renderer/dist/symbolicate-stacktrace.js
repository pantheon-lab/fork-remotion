"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbolicateStackTrace = void 0;
const remotion_1 = require("remotion");
const source_map_1 = require("source-map");
const read_file_1 = require("./assets/read-file");
function extractSourceMapUrl(fileContents) {
    const regex = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;
    let match = null;
    for (;;) {
        const next = regex.exec(fileContents);
        if (next === null || next === undefined) {
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
    const obj = await fetchUrl(url);
    return new source_map_1.SourceMapConsumer(obj);
}
const fetchUrl = async (url) => {
    const res = await (0, read_file_1.readFile)(url);
    return new Promise((resolve, reject) => {
        let downloaded = '';
        res.on('data', (d) => {
            downloaded += d;
        });
        res.on('end', () => {
            resolve(downloaded);
        });
        res.on('error', (err) => reject(err));
    });
};
function getLinesAround(line, count, lines) {
    const result = [];
    for (let index = Math.max(0, line - 1 - count) + 1; index <= Math.min(lines.length - 1, line - 1 + count); ++index) {
        result.push({
            lineNumber: index + 1,
            content: lines[index],
            highlight: index + 1 === line,
        });
    }
    return result;
}
const getOriginalPosition = (source_map, line, column) => {
    const result = source_map.originalPositionFor({
        line,
        column,
    });
    return { line: result.line, column: result.column, source: result.source };
};
const symbolicateStackTrace = async (frames) => {
    const uniqueFileNames = [
        ...new Set(frames
            .map((f) => f.fileName)
            .filter((f) => f.startsWith('http://') || f.startsWith('https://'))
            .filter(remotion_1.Internals.truthy)),
    ];
    const maps = await Promise.all(uniqueFileNames.map(async (fileName) => {
        const fileContents = await fetchUrl(fileName);
        return getSourceMap(fileName, fileContents);
    }));
    const mapValues = {};
    for (let i = 0; i < uniqueFileNames.length; i++) {
        mapValues[uniqueFileNames[i]] = maps[i];
    }
    return frames
        .map((frame) => {
        const map = mapValues[frame.fileName];
        if (!map) {
            return null;
        }
        const pos = getOriginalPosition(map, frame.lineNumber, frame.columnNumber);
        const { functionName } = frame;
        let hasSource = null;
        hasSource = pos.source ? map.sourceContentFor(pos.source, false) : null;
        const scriptCode = hasSource && pos.line
            ? getLinesAround(pos.line, 3, hasSource.split('\n'))
            : null;
        return {
            originalColumnNumber: pos.column,
            originalFileName: pos.source,
            originalFunctionName: functionName,
            originalLineNumber: pos.line ? pos.line : null,
            originalScriptCode: scriptCode,
        };
    })
        .filter(remotion_1.Internals.truthy);
};
exports.symbolicateStackTrace = symbolicateStackTrace;
