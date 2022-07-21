import React from 'react';
import type { TComposition } from 'remotion';
export declare type CompositionSelectorItemType = {
    key: string;
    type: 'composition';
    composition: TComposition<unknown>;
} | {
    key: string;
    type: 'folder';
    folderName: string;
    parentName: string | null;
    items: CompositionSelectorItemType[];
    expanded: boolean;
};
export declare const CompositionSelectorItem: React.FC<{
    item: CompositionSelectorItemType;
    currentComposition: string | null;
    tabIndex: number;
    selectComposition: (c: TComposition) => void;
    toggleFolder: (folderName: string, parentName: string | null) => void;
    level: number;
}>;
