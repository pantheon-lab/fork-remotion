"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uncompressMediaAsset = void 0;
const uncompressMediaAsset = (allAssets, assetToUncompress) => {
    const isCompressed = assetToUncompress.src.match(/same-as-(.*)-([0-9]+)$/);
    if (!isCompressed) {
        return assetToUncompress;
    }
    const [, id, frame] = isCompressed;
    const assetToFill = allAssets.find((a) => a.id === id && String(a.frame) === frame);
    if (!assetToFill) {
        console.log('List of assets:');
        console.log(allAssets);
        throw new TypeError(`Cannot uncompress asset, asset list seems corrupt. Please file a bug in the Remotion repo with the debug information above.`);
    }
    return {
        ...assetToUncompress,
        src: assetToFill.src,
    };
};
exports.uncompressMediaAsset = uncompressMediaAsset;