import type { TAsset } from './CompositionManager';
/**
 * Since audio or video can be base64-encoded, those can be really long strings.
 * Since we track the `src` property for every frame, Node.JS can run out of memory easily. Instead of duplicating the src for every frame, we save memory by replacing the full base 64 encoded data with a string `same-as-[asset-id]-[frame]` referencing a previous asset with the same src.
 */
export declare const compressAsset: (previousAssets: TAsset[], newAsset: TAsset) => TAsset;
export declare const isAssetCompressed: (src: string) => boolean;
