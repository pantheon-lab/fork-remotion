"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoutes = void 0;
const bundler_1 = require("@remotion/bundler");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const get_file_source_1 = require("./error-overlay/react-overlay/utils/get-file-source");
const open_in_editor_1 = require("./error-overlay/react-overlay/utils/open-in-editor");
const project_info_1 = require("./project-info");
const serve_static_1 = require("./serve-static");
const update_available_1 = require("./update-available");
const handleUpdate = async (_, response) => {
    const data = await (0, update_available_1.isUpdateAvailableWithTimeout)();
    response.setHeader('content-type', 'application/json');
    response.writeHead(200);
    response.end(JSON.stringify(data));
};
const editorGuess = (0, open_in_editor_1.guessEditor)();
const static404 = (response) => {
    response.writeHead(404);
    response.end('The static/ prefix has been changed, this URL is no longer valid.');
};
const handleFallback = async (hash, _, response, getCurrentInputProps) => {
    const edit = await editorGuess;
    const displayName = (0, open_in_editor_1.getDisplayNameForEditor)(edit[0].command);
    response.setHeader('content-type', 'text/html');
    response.writeHead(200);
    response.end(bundler_1.BundlerInternals.indexHtml(hash, '/', displayName, getCurrentInputProps()));
};
const handleProjectInfo = async (_, response) => {
    const data = await (0, project_info_1.getProjectInfo)();
    response.setHeader('content-type', 'application/json');
    response.writeHead(200);
    response.end(JSON.stringify(data));
};
const handleFileSource = async (search, _, response) => {
    if (!search.startsWith('?')) {
        throw new Error('query must start with ?');
    }
    const query = new url_1.URLSearchParams(search);
    const f = query.get('f');
    if (typeof f !== 'string') {
        throw new Error('must pass `f` parameter');
    }
    const data = await (0, get_file_source_1.getFileSource)(decodeURIComponent(f));
    response.writeHead(200);
    response.write(data);
    return response.end();
};
const handleOpenInEditor = async (req, res) => {
    try {
        const b = await new Promise((_resolve) => {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => {
                _resolve(data.toString());
            });
        });
        const body = JSON.parse(b);
        if (!('stack' in body)) {
            throw new TypeError('Need to pass stack');
        }
        const stack = body.stack;
        const guess = await editorGuess;
        const didOpen = await (0, open_in_editor_1.launchEditor)({
            colNumber: stack.originalColumnNumber,
            editor: guess[0],
            fileName: path_1.default.resolve(process.cwd(), stack.originalFileName),
            lineNumber: stack.originalLineNumber,
            vsCodeNewWindow: false,
        });
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
            success: didOpen,
        }));
    }
    catch (err) {
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
            success: false,
        }));
    }
};
const handleFavicon = (_, response) => {
    const filePath = path_1.default.join(__dirname, '..', '..', 'web', 'favicon.png');
    const stat = (0, fs_1.statSync)(filePath);
    response.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size,
    });
    const readStream = (0, fs_1.createReadStream)(filePath);
    readStream.pipe(response);
};
const handleRoutes = ({ hash, hashPrefix, request, response, liveEventsServer, getCurrentInputProps, }) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/api/update') {
        return handleUpdate(request, response);
    }
    if (url.pathname === '/api/project-info') {
        return handleProjectInfo(request, response);
    }
    if (url.pathname === '/api/file-source') {
        return handleFileSource(url.search, request, response);
    }
    if (url.pathname === '/api/open-in-editor') {
        return handleOpenInEditor(request, response);
    }
    if (url.pathname === '/remotion.png') {
        return handleFavicon(request, response);
    }
    if (url.pathname === '/events') {
        return liveEventsServer.router(request, response);
    }
    if (url.pathname.startsWith(hash)) {
        const root = path_1.default.join(process.cwd(), 'public');
        return (0, serve_static_1.serveStatic)(root, hash, request, response);
    }
    if (url.pathname.startsWith(hashPrefix)) {
        return static404(response);
    }
    return handleFallback(hash, request, response, getCurrentInputProps);
};
exports.handleRoutes = handleRoutes;
