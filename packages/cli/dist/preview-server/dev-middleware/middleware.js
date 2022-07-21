"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.getValueContentRangeHeader = exports.getFilenameFromUrl = void 0;
const renderer_1 = require("@remotion/renderer");
const path_1 = __importDefault(require("path"));
const compatible_api_1 = require("./compatible-api");
const range_parser_1 = require("./range-parser");
const ready_1 = require("./ready");
// eslint-disable-next-line no-restricted-imports
const querystring_1 = __importDefault(require("querystring"));
const url_1 = require("url");
const get_paths_1 = require("./get-paths");
const cacheStore = new WeakMap();
const mem = (fn, { cache = new Map() } = {}) => {
    const memoized = (...arguments_) => {
        const [key] = arguments_;
        const cacheItem = cache.get(key);
        if (cacheItem) {
            return cacheItem.data;
        }
        const result = fn.apply(this, arguments_);
        cache.set(key, {
            data: result,
        });
        return result;
    };
    cacheStore.set(memoized, cache);
    return memoized;
};
const memoizedParse = mem(url_1.parse);
function getFilenameFromUrl(context, url) {
    var _a, _b;
    const paths = (0, get_paths_1.getPaths)(context);
    let foundFilename;
    let urlObject;
    try {
        // The `url` property of the `request` is contains only  `pathname`, `search` and `hash`
        urlObject = memoizedParse(url, false, true);
    }
    catch (_ignoreError) {
        return;
    }
    for (const { publicPath, outputPath } of paths) {
        let filename;
        let publicPathObject;
        try {
            publicPathObject = memoizedParse(publicPath !== 'auto' && publicPath ? publicPath : '/', false, true);
        }
        catch (_ignoreError) {
            continue;
        }
        if ((_a = urlObject.pathname) === null || _a === void 0 ? void 0 : _a.startsWith(publicPathObject.pathname)) {
            filename = outputPath;
            // Strip the `pathname` property from the `publicPath` option from the start of requested url
            // `/complex/foo.js` => `foo.js`
            const pathname = urlObject.pathname.substr(publicPathObject.pathname.length);
            if (pathname) {
                filename = path_1.default.join(outputPath, querystring_1.default.unescape(pathname));
            }
            if (!context.outputFileSystem) {
                continue;
            }
            try {
                let fsStats = (_b = context.outputFileSystem) === null || _b === void 0 ? void 0 : _b.statSync(filename);
                if (fsStats.isFile()) {
                    foundFilename = filename;
                    break;
                }
                else if (fsStats.isDirectory()) {
                    const indexValue = 'index.html';
                    filename = path_1.default.join(filename, indexValue);
                    // eslint-disable-next-line max-depth
                    try {
                        fsStats = context.outputFileSystem.statSync(filename);
                    }
                    catch (__ignoreError) {
                        continue;
                    }
                    // eslint-disable-next-line max-depth
                    if (fsStats.isFile()) {
                        foundFilename = filename;
                        break;
                    }
                }
            }
            catch (_ignoreError) {
                continue;
            }
        }
    }
    return foundFilename;
}
exports.getFilenameFromUrl = getFilenameFromUrl;
function getValueContentRangeHeader(type, size, range) {
    return `${type} ${range ? `${range.start}-${range.end}` : '*'}/${size}`;
}
exports.getValueContentRangeHeader = getValueContentRangeHeader;
function createHtmlDocument(title, body) {
    return (`${'<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '<meta charset="utf-8">\n' +
        '<title>'}${title}</title>\n` +
        `</head>\n` +
        `<body>\n` +
        `<pre>${body}</pre>\n` +
        `</body>\n` +
        `</html>\n`);
}
const BYTES_RANGE_REGEXP = /^ *bytes/i;
function middleware(context) {
    return function (req, res, next) {
        const acceptedMethods = ['GET', 'HEAD'];
        if (req.method && !acceptedMethods.includes(req.method)) {
            goNext();
            return;
        }
        (0, ready_1.ready)(context, processRequest);
        function goNext() {
            return next();
        }
        async function processRequest() {
            var _a;
            const filename = getFilenameFromUrl(context, req.url);
            if (!filename) {
                goNext();
                return;
            }
            /**
             * @type {{key: string, value: string | number}[]}
             */
            if (!res.getHeader('Content-Type')) {
                // content-type name(like application/javascript; charset=utf-8) or false
                const contentType = renderer_1.RenderInternals.mimeContentType(path_1.default.extname(filename));
                // Only set content-type header if media type is known
                // https://tools.ietf.org/html/rfc7231#section-3.1.1.5
                if (contentType) {
                    (0, compatible_api_1.setHeaderForResponse)(res, 'Content-Type', contentType);
                }
            }
            if (!res.getHeader('Accept-Ranges')) {
                res.setHeader('Accept-Ranges', 'bytes');
                (0, compatible_api_1.setHeaderForResponse)(res, 'Accept-Ranges', 'bytes');
            }
            const rangeHeader = req.headers.range;
            let start;
            let end;
            if (rangeHeader &&
                BYTES_RANGE_REGEXP.test(rangeHeader) &&
                context.outputFileSystem) {
                const size = await new Promise((resolve) => {
                    var _a;
                    (_a = context.outputFileSystem) === null || _a === void 0 ? void 0 : _a.lstat(filename, (error, stats) => {
                        var _a;
                        if (error) {
                            context.logger.error(error);
                            return;
                        }
                        resolve((_a = stats === null || stats === void 0 ? void 0 : stats.size) !== null && _a !== void 0 ? _a : 0);
                    });
                });
                const parsedRanges = (0, range_parser_1.parseRange)(size, rangeHeader);
                if (parsedRanges === -1) {
                    const message = "Unsatisfiable range for 'Range' header.";
                    context.logger.error(message);
                    const existingHeaders = res.getHeaderNames();
                    for (const header of existingHeaders) {
                        res.removeHeader(header);
                    }
                    res.statusCode = 416;
                    (0, compatible_api_1.setHeaderForResponse)(res, 'Content-Range', getValueContentRangeHeader('bytes', size));
                    (0, compatible_api_1.setHeaderForResponse)(res, 'Content-Type', 'text/html; charset=utf-8');
                    const document = createHtmlDocument(416, `Error: ${message}`);
                    const _byteLength = Buffer.byteLength(document);
                    (0, compatible_api_1.setHeaderForResponse)(res, 'Content-Length', Buffer.byteLength(document));
                    (0, compatible_api_1.send)(req, res, document, _byteLength);
                    return;
                }
                if (parsedRanges === -2) {
                    context.logger.error("A malformed 'Range' header was provided. A regular response will be sent for this request.");
                }
                else if (parsedRanges.length > 1) {
                    context.logger.error("A 'Range' header with multiple ranges was provided. Multiple ranges are not supported, so a regular response will be sent for this request.");
                }
                if (parsedRanges !== -2 && parsedRanges.length === 1) {
                    // Content-Range
                    res.statusCode = 206;
                    (0, compatible_api_1.setHeaderForResponse)(res, 'Content-Range', getValueContentRangeHeader('bytes', size, parsedRanges[0]));
                    [{ start, end }] = parsedRanges;
                }
            }
            const isFsSupportsStream = typeof ((_a = context.outputFileSystem) === null || _a === void 0 ? void 0 : _a.createReadStream) === 'function';
            let bufferOtStream;
            let byteLength = 0;
            try {
                if (typeof start !== 'undefined' &&
                    typeof end !== 'undefined' &&
                    isFsSupportsStream &&
                    context.outputFileSystem) {
                    bufferOtStream = context.outputFileSystem.createReadStream(filename, {
                        start,
                        end,
                    });
                    byteLength = end - start + 1;
                }
                else if (context.outputFileSystem) {
                    bufferOtStream = context.outputFileSystem.readFileSync(filename);
                    byteLength = bufferOtStream.byteLength;
                }
            }
            catch (_ignoreError) {
                goNext();
                return;
            }
            if (bufferOtStream) {
                (0, compatible_api_1.send)(req, res, bufferOtStream, byteLength);
            }
        }
    };
}
exports.middleware = middleware;
