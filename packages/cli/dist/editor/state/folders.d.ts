import React from 'react';
import type { ExpandedFoldersState } from '../helpers/persist-open-folders';
declare type TFolderContext = {
    foldersExpanded: ExpandedFoldersState;
    setFoldersExpanded: React.Dispatch<React.SetStateAction<ExpandedFoldersState>>;
};
export declare const FolderContext: React.Context<TFolderContext>;
export declare const FolderContextProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
