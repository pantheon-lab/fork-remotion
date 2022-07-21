"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const bundler_1 = require("@remotion/bundler");
const renderer_1 = require("@remotion/renderer");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const dev_middleware_1 = require("./dev-middleware");
const hot_middleware_1 = require("./hot-middleware");
const live_events_1 = require("./live-events");
const routes_1 = require("./routes");
const startServer = async (entry, userDefinedComponent, options) => {
    var _a, _b, _c, _d;
    const tmpDir = await fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'react-motion-graphics'));
    const config = bundler_1.BundlerInternals.webpackConfig({
        entry,
        userDefinedComponent,
        outDir: tmpDir,
        environment: 'development',
        webpackOverride: (_a = options === null || options === void 0 ? void 0 : options.webpackOverride) !== null && _a !== void 0 ? _a : remotion_1.Internals.getWebpackOverrideFn(),
        envVariables: (_b = options === null || options === void 0 ? void 0 : options.envVariables) !== null && _b !== void 0 ? _b : {},
        maxTimelineTracks: (_c = options === null || options === void 0 ? void 0 : options.maxTimelineTracks) !== null && _c !== void 0 ? _c : 15,
        entryPoints: [
            require.resolve('./hot-middleware/client'),
            require.resolve('./error-overlay/entry-basic.js'),
        ],
    });
    const compiler = (0, bundler_1.webpack)(config);
    const hashPrefix = '/static-';
    const hash = `${hashPrefix}${crypto_1.default.randomBytes(6).toString('hex')}`;
    const wdmMiddleware = (0, dev_middleware_1.wdm)(compiler);
    const whm = (0, hot_middleware_1.webpackHotMiddleware)(compiler);
    const liveEventsServer = (0, live_events_1.makeLiveEventsRouter)();
    const server = http_1.default.createServer((request, response) => {
        new Promise((resolve) => {
            wdmMiddleware(request, response, () => {
                resolve();
            });
        })
            .then(() => {
            return new Promise((resolve) => {
                whm(request, response, () => {
                    resolve();
                });
            });
        })
            .then(() => {
            (0, routes_1.handleRoutes)({
                hash,
                hashPrefix,
                request,
                response,
                liveEventsServer,
                getCurrentInputProps: options.getCurrentInputProps,
            });
        })
            .catch((err) => {
            response.setHeader('content-type', 'application/json');
            response.writeHead(500);
            response.end(JSON.stringify({
                err: err.message,
            }));
        });
    });
    const desiredPort = (_d = options === null || options === void 0 ? void 0 : options.port) !== null && _d !== void 0 ? _d : undefined;
    const port = await renderer_1.RenderInternals.getDesiredPort(desiredPort, 3000, 3100);
    server.listen(port);
    return { port, liveEventsServer };
};
exports.startServer = startServer;
