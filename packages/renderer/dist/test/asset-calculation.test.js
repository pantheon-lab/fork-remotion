"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const vitest_1 = require("vitest");
const calculate_asset_positions_1 = require("../assets/calculate-asset-positions");
const get_assets_for_markup_1 = require("./get-assets-for-markup");
const basicConfig = {
    width: 1080,
    height: 1080,
    fps: 30,
    durationInFrames: 60,
    id: 'hithere',
};
const getPositions = async (Markup) => {
    const assets = await (0, get_assets_for_markup_1.getAssetsForMarkup)(Markup, basicConfig);
    return (0, calculate_asset_positions_1.calculateAssetPositions)(assets);
};
const withoutId = (asset) => {
    const { id, ...others } = asset;
    return others;
};
(0, vitest_1.test)('Should be able to collect assets', async () => {
    const assetPositions = await getPositions(() => ((0, jsx_runtime_1.jsx)(remotion_1.Video, { src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" })));
    (0, vitest_1.expect)(assetPositions.length).toBe(1);
    (0, vitest_1.expect)(withoutId(assetPositions[0])).toEqual({
        type: 'video',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        duration: 60,
        startInVideo: 0,
        trimLeft: 0,
        volume: 1,
        playbackRate: 1,
    });
});
(0, vitest_1.test)('Should get multiple assets', async () => {
    const assetPositions = await getPositions(() => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(remotion_1.Video, { src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" }), (0, jsx_runtime_1.jsx)(remotion_1.Audio, { src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp3" })] })));
    (0, vitest_1.expect)(assetPositions.length).toBe(2);
    (0, vitest_1.expect)(withoutId(assetPositions[0])).toEqual({
        type: 'video',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        duration: 60,
        startInVideo: 0,
        trimLeft: 0,
        volume: 1,
        playbackRate: 1,
    });
    (0, vitest_1.expect)(withoutId(assetPositions[1])).toEqual({
        type: 'audio',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp3',
        duration: 60,
        startInVideo: 0,
        trimLeft: 0,
        volume: 1,
        playbackRate: 1,
    });
});
(0, vitest_1.test)('Should handle jumps inbetween', async () => {
    const assetPositions = await getPositions(() => {
        const frame = (0, remotion_1.useCurrentFrame)();
        return ((0, jsx_runtime_1.jsx)("div", { children: frame === 20 ? null : ((0, jsx_runtime_1.jsx)(remotion_1.Video, { src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" })) }));
    });
    (0, vitest_1.expect)(assetPositions.length).toBe(2);
    (0, vitest_1.expect)(withoutId(assetPositions[0])).toEqual({
        type: 'video',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        duration: 20,
        startInVideo: 0,
        trimLeft: 0,
        volume: 1,
        playbackRate: 1,
    });
    (0, vitest_1.expect)(withoutId(assetPositions[1])).toEqual({
        type: 'video',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        duration: 39,
        startInVideo: 21,
        trimLeft: 21,
        volume: 1,
        playbackRate: 1,
    });
});
(0, vitest_1.test)('Should support sequencing', async () => {
    const assetPositions = await getPositions(() => {
        return ((0, jsx_runtime_1.jsx)(remotion_1.Sequence, { durationInFrames: 30, from: -20, children: (0, jsx_runtime_1.jsx)(remotion_1.Video, { src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" }) }));
    });
    (0, vitest_1.expect)(assetPositions.length).toBe(1);
    (0, vitest_1.expect)(withoutId(assetPositions[0])).toEqual({
        type: 'video',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        duration: 10,
        startInVideo: 0,
        trimLeft: 20,
        volume: 1,
        playbackRate: 1,
    });
});
(0, vitest_1.test)('Should calculate volumes correctly', async () => {
    const assetPositions = await getPositions(() => {
        return ((0, jsx_runtime_1.jsx)(remotion_1.Video, { volume: (f) => (0, remotion_1.interpolate)(f, [0, 4], [0, 1], {
                extrapolateRight: 'clamp',
            }), src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" }));
    });
    (0, vitest_1.expect)(assetPositions.length).toBe(1);
    (0, vitest_1.expect)(withoutId(assetPositions[0])).toEqual({
        type: 'video',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        duration: 60,
        startInVideo: 0,
        trimLeft: 0,
        playbackRate: 1,
        volume: new Array(60)
            .fill(true)
            .map((_, i) => (0, remotion_1.interpolate)(i, [0, 4], [0, 1], { extrapolateRight: 'clamp' })),
    });
});
(0, vitest_1.test)('Should calculate startFrom correctly', async () => {
    const assetPositions = await getPositions(() => {
        return ((0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 1, children: (0, jsx_runtime_1.jsx)(remotion_1.Audio, { startFrom: 100, endAt: 200, src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4', volume: (f) => (0, remotion_1.interpolate)(f, [0, 50, 100], [0, 1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                }) }) }));
    });
    (0, vitest_1.expect)(assetPositions.length).toBe(1);
    (0, vitest_1.expect)(withoutId(assetPositions[0])).toEqual({
        type: 'audio',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        duration: 59,
        startInVideo: 1,
        trimLeft: 100,
        playbackRate: 1,
        volume: new Array(59).fill(true).map((_, i) => (0, remotion_1.interpolate)(i, [0, 50, 100], [0, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        })),
    });
});
