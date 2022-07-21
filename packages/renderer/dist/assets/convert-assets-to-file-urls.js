"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAssetsToFileUrls = void 0;
const download_and_map_assets_to_file_1 = require("./download-and-map-assets-to-file");
const chunk = (input, size) => {
    return input.reduce((arr, item, idx) => {
        return idx % size === 0
            ? [...arr, [item]]
            : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
};
const convertAssetsToFileUrls = async ({ assets, downloadDir, onDownload, }) => {
    const chunks = chunk(assets, 1000);
    const results = [];
    for (const ch of chunks) {
        const result = await Promise.all(ch.map((assetsForFrame) => {
            return Promise.all(assetsForFrame.map((a) => {
                return (0, download_and_map_assets_to_file_1.downloadAndMapAssetsToFileUrl)({
                    asset: a,
                    downloadDir,
                    onDownload,
                });
            }));
        }));
        results.push(result);
    }
    return results.flat(1);
};
exports.convertAssetsToFileUrls = convertAssetsToFileUrls;
