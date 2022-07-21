/// <reference types="react" />
import type { PreviewSize } from '@remotion/player';
declare type PreviewSizeCtx = {
    size: PreviewSize;
    setSize: (cb: (oldSize: PreviewSize) => PreviewSize) => void;
};
export declare const persistPreviewSizeOption: (option: PreviewSize) => void;
export declare const loadPreviewSizeOption: () => PreviewSize;
export declare const PreviewSizeContext: import("react").Context<PreviewSizeCtx>;
export {};
