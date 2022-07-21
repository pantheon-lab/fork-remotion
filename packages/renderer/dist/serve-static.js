"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const http_1 = __importDefault(require("http"));
const remotion_1 = require("remotion");
const get_port_1 = require("./get-port");
const offthread_video_server_1 = require("./offthread-video-server");
const serve_handler_1 = require("./serve-handler");
const serveStatic = async (path, options) => {
    var _a, _b;
    const port = await (0, get_port_1.getDesiredPort)((_b = (_a = options === null || options === void 0 ? void 0 : options.port) !== null && _a !== void 0 ? _a : remotion_1.Internals.getServerPort()) !== null && _b !== void 0 ? _b : undefined, 3000, 3100);
    const offthreadRequest = (0, offthread_video_server_1.startOffthreadVideoServer)({
        ffmpegExecutable: options.ffmpegExecutable,
        ffprobeExecutable: options.ffprobeExecutable,
        downloadDir: options.downloadDir,
        onDownload: options.onDownload,
        onError: options.onError,
    });
    try {
        const server = http_1.default
            .createServer((request, response) => {
            var _a;
            if ((_a = request.url) === null || _a === void 0 ? void 0 : _a.startsWith('/proxy')) {
                return offthreadRequest(request, response);
            }
            if (path === null) {
                response.writeHead(404);
                response.end('Server only supports /proxy');
                return;
            }
            (0, serve_handler_1.serveHandler)(request, response, {
                public: path,
            }).catch(() => {
                response.statusCode = 500;
                response.end('Error serving file');
            });
        })
            .listen(port);
        const close = () => {
            return new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) {
                        if (err.code === 'ERR_SERVER_NOT_RUNNING') {
                            return resolve();
                        }
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        return { port, close };
    }
    catch (err) {
        console.log({ err, msg: err.message });
        if (err.message.includes('EADDRINUSE')) {
            return (0, exports.serveStatic)(path, options);
        }
        throw err;
    }
};
exports.serveStatic = serveStatic;
