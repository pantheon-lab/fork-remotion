"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const getClient = (url) => {
    if (url.startsWith('https://')) {
        return https_1.default.get;
    }
    if (url.startsWith('http://')) {
        return http_1.default.get;
    }
    throw new Error('Can only download URLs starting with http:// or https://');
};
const readFileWithoutRedirect = (url) => {
    return new Promise((resolve, reject) => {
        getClient(url)(url, (res) => {
            resolve(res);
        }).on('error', (err) => {
            return reject(err);
        });
    });
};
const readFile = async (url, redirectsSoFar = 0) => {
    if (redirectsSoFar > 10) {
        throw new Error(`Too many redirects while downloading ${url}`);
    }
    const file = await readFileWithoutRedirect(url);
    if (file.statusCode === 302 ||
        file.statusCode === 301 ||
        file.statusCode === 307 ||
        file.statusCode === 308) {
        if (!file.headers.location) {
            throw new Error(`Received a status code ${file.statusCode} but no "Location" header while calling ${file.headers.location}`);
        }
        return (0, exports.readFile)(file.headers.location, redirectsSoFar + 1);
    }
    if (file.statusCode >= 400) {
        throw new Error(`Received a status code of ${file.statusCode} while downloading file ${url}`);
    }
    return file;
};
exports.readFile = readFile;
