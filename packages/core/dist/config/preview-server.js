"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerPort = exports.setPort = void 0;
let serverPort;
const setPort = (port) => {
    if (!['number', 'undefined'].includes(typeof port)) {
        throw new Error(`Preview server port should be a number. Got ${typeof port} (${JSON.stringify(port)})`);
    }
    if (port === undefined) {
        serverPort = undefined;
        return;
    }
    if (port < 1 || port > 65535) {
        throw new Error(`Preview server port should be a number between 1 and 65535. Got ${port}`);
    }
    serverPort = port;
};
exports.setPort = setPort;
const getServerPort = () => serverPort;
exports.getServerPort = getServerPort;
