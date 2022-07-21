import type React from 'react';
import type { UpdateInfo } from '../components/UpdateCheck';
export declare type CompType = 'composition' | 'still';
export declare type ModalState = {
    type: 'new-comp';
    compType: CompType;
} | {
    type: 'update';
    info: UpdateInfo;
} | {
    type: 'shortcuts';
};
export declare type ModalContextType = {
    selectedModal: ModalState | null;
    setSelectedModal: React.Dispatch<React.SetStateAction<ModalState | null>>;
};
export declare const ModalsContext: React.Context<ModalContextType>;
