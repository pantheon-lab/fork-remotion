"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = require("os");
const vitest_1 = require("vitest");
const download_and_map_assets_to_file_1 = require("../assets/download-and-map-assets-to-file");
const download_file_1 = require("../assets/download-file");
(0, vitest_1.test)('Should be able to download file', async () => {
    const downloadDir = (0, os_1.tmpdir)();
    const { to } = await (0, download_file_1.downloadFile)({
        url: 'https://example.net/',
        to: (contentDisposition) => {
            return (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
                contentDisposition,
                downloadDir,
                src: 'https://example.net/',
            });
        },
        onProgress: () => undefined,
    });
    const data = await fs_1.default.promises.readFile(to, 'utf8');
    (0, vitest_1.expect)(data).toMatch(/This domain is for use in illustrative examples in documents/);
});
(0, vitest_1.test)('Should fail to download invalid files', async () => {
    const downloadDir = (0, os_1.tmpdir)();
    await (0, vitest_1.expect)(() => (0, download_file_1.downloadFile)({
        to: (contentDisposition) => {
            return (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
                contentDisposition,
                downloadDir,
                src: 'https://thisdomain.doesnotexist',
            });
        },
        url: 'https://thisdomain.doesnotexist',
        onProgress: () => undefined,
    })).rejects.toThrow(/ENOTFOUND/);
});
