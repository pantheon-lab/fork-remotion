"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareServer = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const is_serve_url_1 = require("./is-serve-url");
const serve_static_1 = require("./serve-static");
const wait_for_symbolication_error_to_be_done_1 = require("./wait-for-symbolication-error-to-be-done");
const prepareServer = async ({ downloadDir, ffmpegExecutable, ffprobeExecutable, onDownload, onError, webpackConfigOrServeUrl, port, }) => {
    if ((0, is_serve_url_1.isServeUrl)(webpackConfigOrServeUrl)) {
        const { port: offthreadPort, close: closeProxy } = await (0, serve_static_1.serveStatic)(null, {
            downloadDir,
            onDownload,
            onError,
            ffmpegExecutable,
            ffprobeExecutable,
            port,
        });
        return Promise.resolve({
            serveUrl: webpackConfigOrServeUrl,
            closeServer: () => {
                return closeProxy();
            },
            offthreadPort,
        });
    }
    // Check if the path has a `index.html` file
    const indexFile = path_1.default.join(webpackConfigOrServeUrl, 'index.html');
    const exists = (0, fs_1.existsSync)(indexFile);
    if (!exists) {
        throw new Error(`Tried to serve the Webpack bundle on a HTTP server, but the file ${indexFile} does not exist. Is this a valid path to a Webpack bundle?`);
    }
    const { port: serverPort, close } = await (0, serve_static_1.serveStatic)(webpackConfigOrServeUrl, {
        downloadDir,
        onDownload,
        onError,
        ffmpegExecutable,
        ffprobeExecutable,
        port,
    });
    return Promise.resolve({
        closeServer: () => {
            return (0, wait_for_symbolication_error_to_be_done_1.waitForSymbolicationToBeDone)().then(() => close());
        },
        serveUrl: `http://localhost:${serverPort}`,
        offthreadPort: serverPort,
    });
};
exports.prepareServer = prepareServer;
