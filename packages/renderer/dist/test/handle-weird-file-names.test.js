"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const vitest_1 = require("vitest");
const download_and_map_assets_to_file_1 = require("../assets/download-and-map-assets-to-file");
(0, vitest_1.test)('Should sanitize weird file names when downloading', () => {
    const newSrc = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'http://gtts-api.miniggiodev.fr/Ici+Japon+Corp.?lang=ja',
        downloadDir: '/var/tmp',
        contentDisposition: null,
    });
    (0, vitest_1.expect)(newSrc).toBe(process.platform === 'win32'
        ? '\\var\\tmp\\7415404696948826'
        : '/var/tmp/7415404696948826');
});
(0, vitest_1.test)('Should give different file names based on different url query parameters', () => {
    const asset1 = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'https://gtts-api.miniggiodev.fr/Ici+Japon+Corp.mp4?hi=1',
        downloadDir: '',
        contentDisposition: null,
    });
    const sameAgain = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'https://gtts-api.miniggiodev.fr/Ici+Japon+Corp.mp4?hi=1',
        downloadDir: '',
        contentDisposition: null,
    });
    const differentAsset = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'https://gtts-api.miniggiodev.fr/Ici+Japon+Corp.mp4?hi=2',
        downloadDir: '',
        contentDisposition: null,
    });
    (0, vitest_1.expect)(asset1).toEqual(sameAgain);
    (0, vitest_1.expect)(asset1).not.toEqual(differentAsset);
});
(0, vitest_1.test)('Should give different file names based on different url query parameters', () => {
    const asset1 = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'https://gtts-api.miniggiodev.fr/Ici+Japon+Corp.mp4?hi=1',
        downloadDir: 'dl',
        contentDisposition: 'attachment; filename=notjacksondatiras_1656689770_musicaldown.com.mp4; otherstuff',
    });
    (0, vitest_1.expect)(asset1).toEqual(`dl${path_1.default.sep}2276125883217901.mp4`);
    const asset2 = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'https://gtts-api.miniggiodev.fr/Ici+Japon+Corp.mp4?hi=1',
        downloadDir: 'dl',
        contentDisposition: 'attachment; filename=notjacksondatiras_1656689770_musicaldown.com.mp4',
    });
    (0, vitest_1.expect)(asset2).toEqual(`dl${path_1.default.sep}2276125883217901.mp4`);
});
