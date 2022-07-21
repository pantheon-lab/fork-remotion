"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remotion_1 = require("remotion");
const vitest_1 = require("vitest");
const calculate_asset_positions_1 = require("../assets/calculate-asset-positions");
(0, vitest_1.test)('Should compress and uncompress assets', () => {
    const uncompressed = [
        [
            {
                frame: 0,
                id: 'my-id',
                src: String('x').repeat(1000),
                mediaFrame: 0,
                playbackRate: 1,
                type: 'video',
                volume: 1,
            },
        ],
        [
            {
                frame: 1,
                id: 'my-id',
                src: String('x').repeat(1000),
                mediaFrame: 0,
                playbackRate: 1,
                type: 'video',
                volume: 1,
            },
        ],
    ].flat(1);
    const compressedAssets = uncompressed.map((asset, i) => {
        return remotion_1.Internals.AssetCompression.compressAsset(uncompressed.slice(0, i), asset);
    });
    (0, vitest_1.expect)(compressedAssets[0].src).toBe(String('x').repeat(1000));
    (0, vitest_1.expect)(compressedAssets[1].src).toBe('same-as-my-id-0');
    const assPos = (0, calculate_asset_positions_1.calculateAssetPositions)([compressedAssets]);
    (0, vitest_1.expect)(assPos).toEqual([
        {
            duration: 1,
            id: 'my-id',
            playbackRate: 1,
            src: String('x').repeat(1000),
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
        },
    ]);
});
