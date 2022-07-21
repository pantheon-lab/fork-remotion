"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.degit = exports.fetch = void 0;
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const tar_1 = __importDefault(require("tar"));
const mkdirp_1 = require("./mkdirp");
function fetch(url, dest) {
    return new Promise((resolve, reject) => {
        https_1.default
            .get(url, (response) => {
            const code = response.statusCode;
            if (code >= 400) {
                reject(new Error(`Network request to ${url} failed with code ${code} (${response.statusMessage})`));
            }
            else if (code >= 300) {
                fetch(response.headers.location, dest)
                    .then(resolve)
                    .catch(reject);
            }
            else {
                response
                    .pipe(fs_1.default.createWriteStream(dest))
                    .on('finish', () => resolve())
                    .on('error', reject);
            }
        })
            .on('error', reject);
    });
}
exports.fetch = fetch;
const degit = async ({ repoOrg, repoName, dest, }) => {
    const base = path_1.default.join((0, os_1.tmpdir)(), '.degit');
    const dir = path_1.default.join(base, repoOrg, repoName);
    const file = `${dir}/HEAD.tar.gz`;
    const url = `https://github.com/${repoOrg}/${repoName}/archive/HEAD.tar.gz`;
    (0, mkdirp_1.mkdirp)(path_1.default.dirname(file));
    await fetch(url, file);
    (0, mkdirp_1.mkdirp)(dest);
    await untar(file, dest);
    fs_1.default.unlinkSync(file);
};
exports.degit = degit;
function untar(file, dest) {
    return tar_1.default.extract({
        file,
        strip: 1,
        C: dest,
    }, []);
}
