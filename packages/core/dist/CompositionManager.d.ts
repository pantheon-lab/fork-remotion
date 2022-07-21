import type { ComponentType, LazyExoticComponent } from 'react';
import React from 'react';
import type { TFolder } from './Folder';
export declare type TComposition<T = unknown> = {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
    id: string;
    folderName: string | null;
    parentFolderName: string | null;
    component: LazyExoticComponent<ComponentType<T>>;
    defaultProps: T | undefined;
    nonce: number;
};
export declare type TCompMetadata = Pick<TComposition, 'id' | 'height' | 'width' | 'fps' | 'durationInFrames' | 'defaultProps'>;
export declare type SmallTCompMetadata = Pick<TComposition, 'id' | 'height' | 'width' | 'fps' | 'durationInFrames'> & Partial<Pick<TComposition, 'defaultProps'>>;
declare type EnhancedTSequenceData = {
    type: 'sequence';
} | {
    type: 'audio';
    src: string;
    volume: string | number;
    doesVolumeChange: boolean;
    startMediaFrom: number;
} | {
    type: 'video';
    src: string;
    volume: string | number;
    doesVolumeChange: boolean;
    startMediaFrom: number;
};
export declare type TSequence = {
    from: number;
    duration: number;
    id: string;
    displayName: string;
    parent: string | null;
    rootId: string;
    showInTimeline: boolean;
    nonce: number;
    showLoopTimesInTimeline: number | undefined;
} & EnhancedTSequenceData;
export declare type TAsset = {
    type: 'audio' | 'video';
    src: string;
    id: string;
    frame: number;
    volume: number;
    mediaFrame: number;
    playbackRate: number;
};
export declare type RenderAssetInfo = {
    assets: TAsset[][];
    imageSequenceName: string;
    downloadDir: string;
    firstFrameIndex: number;
};
export declare type CompositionManagerContext = {
    compositions: TComposition[];
    registerComposition: <T>(comp: TComposition<T>) => void;
    unregisterComposition: (name: string) => void;
    registerFolder: (name: string, parent: string | null) => void;
    unregisterFolder: (name: string, parent: string | null) => void;
    currentComposition: string | null;
    setCurrentComposition: (curr: string) => void;
    registerSequence: (seq: TSequence) => void;
    unregisterSequence: (id: string) => void;
    registerAsset: (asset: TAsset) => void;
    unregisterAsset: (id: string) => void;
    sequences: TSequence[];
    assets: TAsset[];
    folders: TFolder[];
};
export declare const CompositionManager: React.Context<CompositionManagerContext>;
export declare const compositionsRef: React.RefObject<{
    getCompositions: () => TCompMetadata[];
}>;
export declare const CompositionManagerProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
