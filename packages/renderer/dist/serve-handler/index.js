"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveHandler = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const mime_types_1 = require("../mime-types");
// Packages
const is_path_inside_1 = require("./is-path-inside");
const range_parser_1 = require("./range-parser");
const getHeaders = (absolutePath, stats) => {
    const { base } = path_1.default.parse(absolutePath);
    let defaultHeaders = {};
    if (stats) {
        defaultHeaders = {
            'Content-Length': String(stats.size),
            'Accept-Ranges': 'bytes',
        };
        defaultHeaders['Last-Modified'] = stats.mtime.toUTCString();
        const _contentType = (0, mime_types_1.mimeContentType)(base);
        if (_contentType) {
            defaultHeaders['Content-Type'] = _contentType;
        }
    }
    return defaultHeaders;
};
const getPossiblePaths = (relativePath, extension) => [
    path_1.default.join(relativePath, `index${extension}`),
    relativePath.endsWith('/')
        ? relativePath.replace(/\/$/g, extension)
        : relativePath + extension,
].filter((item) => path_1.default.basename(item) !== extension);
const findRelated = async (current, relativePath) => {
    const possible = getPossiblePaths(relativePath, '.html');
    let stats = null;
    for (let index = 0; index < possible.length; index++) {
        const related = possible[index];
        const absolutePath = path_1.default.join(current, related);
        try {
            stats = await fs_1.promises.lstat(absolutePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT' &&
                err.code !== 'ENOTDIR') {
                throw err;
            }
        }
        if (stats) {
            return {
                stats,
                absolutePath,
            };
        }
    }
    return null;
};
const sendError = (absolutePath, response, spec) => {
    const { message, statusCode } = spec;
    response.statusCode = statusCode;
    const headers = getHeaders(absolutePath, null);
    response.writeHead(statusCode, headers);
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify({ statusCode, message }));
};
const internalError = (absolutePath, response) => {
    return sendError(absolutePath, response, {
        statusCode: 500,
        code: 'internal_server_error',
        message: 'A server error has occurred',
    });
};
const serveHandler = async (request, response, config) => {
    const cwd = process.cwd();
    const current = path_1.default.resolve(cwd, config.public);
    let relativePath = null;
    try {
        relativePath = decodeURIComponent(url_1.default.parse(request.url).pathname);
    }
    catch (err) {
        return sendError('/', response, {
            statusCode: 400,
            code: 'bad_request',
            message: 'Bad Request',
        });
    }
    let absolutePath = path_1.default.join(current, relativePath);
    // Prevent path traversal vulnerabilities. We could do this
    // by ourselves, but using the package covers all the edge cases.
    if (!(0, is_path_inside_1.isPathInside)(absolutePath, current)) {
        return sendError(absolutePath, response, {
            statusCode: 400,
            code: 'bad_request',
            message: 'Bad Request',
        });
    }
    let stats = null;
    // It's extremely important that we're doing multiple stat calls. This one
    // right here could technically be removed, but then the program
    // would be slower. Because for directories, we always want to see if a related file
    // exists and then (after that), fetch the directory itself if no
    // related file was found. However (for files, of which most have extensions), we should
    // always stat right away.
    //
    // When simulating a file system without directory indexes, calculating whether a
    // directory exists requires loading all the file paths and then checking if
    // one of them includes the path of the directory. As that's a very
    // performance-expensive thing to do, we need to ensure it's not happening if not really necessary.
    if (path_1.default.extname(relativePath) !== '') {
        try {
            stats = await fs_1.promises.lstat(absolutePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT' &&
                err.code !== 'ENOTDIR') {
                return internalError(absolutePath, response);
            }
        }
    }
    if (!stats) {
        try {
            const related = await findRelated(current, relativePath);
            if (related) {
                ({ stats, absolutePath } = related);
            }
        }
        catch (err) {
            if (err.code !== 'ENOENT' &&
                err.code !== 'ENOTDIR') {
                return internalError(absolutePath, response);
            }
        }
        try {
            stats = await fs_1.promises.lstat(absolutePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT' &&
                err.code !== 'ENOTDIR') {
                return internalError(absolutePath, response);
            }
        }
    }
    if (stats === null || stats === void 0 ? void 0 : stats.isDirectory()) {
        const directory = null;
        const singleFile = null;
        if (directory) {
            const _contentType = 'text/html; charset=utf-8';
            response.statusCode = 200;
            response.setHeader('Content-Type', _contentType);
            response.end('Is a directory');
            return;
        }
        if (!singleFile) {
            // The directory listing is disabled, so we want to
            // render a 404 error.
            stats = null;
        }
    }
    const isSymLink = stats === null || stats === void 0 ? void 0 : stats.isSymbolicLink();
    // There are two scenarios in which we want to reply with
    // a 404 error: Either the path does not exist, or it is a
    // symlink while the `symlinks` option is disabled (which it is by default).
    if (!stats || isSymLink) {
        // allow for custom 404 handling
        return sendError(absolutePath, response, {
            statusCode: 404,
            code: 'not_found',
            message: 'The requested path could not be found',
        });
    }
    let streamOpts = null;
    if (request.headers.range && stats.size) {
        const range = (0, range_parser_1.rangeParser)(stats.size, request.headers.range);
        if (typeof range === 'object' && range.type === 'bytes') {
            const { start, end } = range.ranges[0];
            streamOpts = {
                start,
                end,
            };
            response.statusCode = 206;
        }
        else {
            response.statusCode = 416;
            response.setHeader('Content-Range', `bytes */${stats.size}`);
        }
    }
    let stream = null;
    try {
        stream = (0, fs_1.createReadStream)(absolutePath, streamOpts !== null && streamOpts !== void 0 ? streamOpts : {});
    }
    catch (err) {
        return internalError(absolutePath, response);
    }
    const headers = getHeaders(absolutePath, stats);
    if (streamOpts !== null) {
        headers['Content-Range'] = `bytes ${streamOpts.start}-${streamOpts.end}/${stats.size}`;
        headers['Content-Length'] = String(streamOpts.end - streamOpts.start + 1);
    }
    response.writeHead(response.statusCode || 200, headers);
    stream.pipe(response);
};
exports.serveHandler = serveHandler;
