"use strict";
/*!
 * serve-static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const renderer_1 = require("@remotion/renderer");
const fs_1 = require("fs");
const path_1 = require("path");
const middleware_1 = require("./dev-middleware/middleware");
const range_parser_1 = require("./dev-middleware/range-parser");
const serveStatic = async function (root, hash, req, res) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        // method not allowed
        res.statusCode = 405;
        res.setHeader('Allow', 'GET, HEAD');
        res.setHeader('Content-Length', '0');
        res.end();
        return;
    }
    const path = (0, path_1.join)(root, new URL(req.url, 'http://localhost').pathname.replace(new RegExp(`^${hash}`), ''));
    if (!renderer_1.RenderInternals.isPathInside(path, root)) {
        res.writeHead(500);
        res.write('Not allowed to read');
        res.end();
        return;
    }
    const exists = (0, fs_1.existsSync)(path);
    if (!exists) {
        res.writeHead(404);
        res.write(`${path} does not exist`);
        res.end();
        return;
    }
    const lstat = await fs_1.promises.lstat(path);
    const isDirectory = lstat.isDirectory();
    if (isDirectory) {
        res.writeHead(500);
        res.write('Is a directory');
        res.end();
        return;
    }
    const hasRange = req.headers.range && lstat.size;
    if (!hasRange) {
        const readStream = (0, fs_1.createReadStream)(path);
        res.setHeader('content-type', renderer_1.RenderInternals.mimeLookup(path) || 'application/octet-stream');
        res.setHeader('content-length', lstat.size);
        res.writeHead(200);
        readStream.pipe(res);
        return;
    }
    const range = (0, range_parser_1.parseRange)(lstat.size, req.headers.range);
    if (typeof range === 'object' && range.type === 'bytes') {
        const { start, end } = range[0];
        res.setHeader('content-type', renderer_1.RenderInternals.mimeLookup(path) || 'application/octet-stream');
        res.setHeader('content-range', (0, middleware_1.getValueContentRangeHeader)('bytes', lstat.size, {
            end,
            start,
        }));
        res.setHeader('content-length', end - start + 1);
        res.writeHead(206);
        const readStream = (0, fs_1.createReadStream)(path, {
            start,
            end,
        });
        readStream.pipe(res);
        return;
    }
    res.statusCode = 416;
    res.setHeader('Content-Range', `bytes */${lstat.size}`);
    res.end();
};
exports.serveStatic = serveStatic;
