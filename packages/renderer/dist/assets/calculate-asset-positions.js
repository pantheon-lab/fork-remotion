"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAssetPositions = void 0;
const resolve_asset_src_1 = require("../resolve-asset-src");
const flatten_volume_array_1 = require("./flatten-volume-array");
const types_1 = require("./types");
const areEqual = (a, b) => {
    return a.id === b.id;
};
const findFrom = (target, asset) => {
    const index = target.findIndex((a) => areEqual(a, asset));
    if (index === -1) {
        return false;
    }
    target.splice(index, 1);
    return true;
};
const copyAndDeduplicateAssets = (assets) => {
    const deduplicated = [];
    for (const asset of assets) {
        if (!deduplicated.find((d) => d.id === asset.id)) {
            deduplicated.push(asset);
        }
    }
    return deduplicated;
};
const calculateAssetPositions = (frames) => {
    var _a, _b;
    const assets = [];
    for (let frame = 0; frame < frames.length; frame++) {
        const prev = copyAndDeduplicateAssets((_a = frames[frame - 1]) !== null && _a !== void 0 ? _a : []);
        const current = copyAndDeduplicateAssets(frames[frame]);
        const next = copyAndDeduplicateAssets((_b = frames[frame + 1]) !== null && _b !== void 0 ? _b : []);
        for (const asset of current) {
            if (!findFrom(prev, asset)) {
                assets.push({
                    src: (0, resolve_asset_src_1.resolveAssetSrc)((0, types_1.uncompressMediaAsset)(frames.flat(1), asset).src),
                    type: asset.type,
                    duration: null,
                    id: asset.id,
                    startInVideo: frame,
                    trimLeft: asset.mediaFrame,
                    volume: [],
                    playbackRate: asset.playbackRate,
                });
            }
            const found = assets.find((a) => a.duration === null && areEqual(a, asset));
            if (!found)
                throw new Error('something wrong');
            if (!findFrom(next, asset)) {
                // Duration calculation:
                // start 0, range 0-59:
                // 59 - 0 + 1 ==> 60 frames duration
                found.duration = frame - found.startInVideo + 1;
            }
            found.volume = [...found.volume, asset.volume];
        }
    }
    for (const asset of assets) {
        if (asset.duration === null) {
            throw new Error('duration is unexpectedly null');
        }
    }
    return assets.map((a) => (0, flatten_volume_array_1.convertAssetToFlattenedVolume)(a));
};
exports.calculateAssetPositions = calculateAssetPositions;
