import React from 'react';
import type { TAsset } from 'remotion';
export declare const getAssetsForMarkup: (Markup: React.FC, config: {
    durationInFrames: number;
    width: number;
    height: number;
    fps: number;
}) => Promise<TAsset[][]>;
