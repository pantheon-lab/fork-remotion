"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServeUrlHash = exports.makeS3ServeUrl = void 0;
const crypto_1 = __importDefault(require("crypto"));
const makeS3ServeUrl = ({ bucketName, subFolder, region, }) => {
    return `https://${bucketName}.s3.${region}.amazonaws.com/${subFolder}/index.html`;
};
exports.makeS3ServeUrl = makeS3ServeUrl;
const hashCache = {};
const getServeUrlHash = (url) => {
    if (hashCache[url]) {
        return hashCache[url];
    }
    const hash = crypto_1.default.createHash('md5').update(url).digest('hex');
    hashCache[url] = hash;
    return hash;
};
exports.getServeUrlHash = getServeUrlHash;
