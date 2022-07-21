import React from 'react';
import type { ComboboxValue } from '../NewComposition/ComboBox';
export declare type MenuId = 'remotion' | 'file' | 'view' | 'tools' | 'help';
export declare type Menu = {
    id: MenuId;
    label: React.ReactNode;
    items: ComboboxValue[];
    leaveLeftPadding: boolean;
};
export declare const MenuItem: React.FC<{
    label: React.ReactNode;
    id: MenuId;
    selected: boolean;
    onItemSelected: (id: MenuId) => void;
    onItemHovered: (id: MenuId) => void;
    onItemQuit: () => void;
    onPreviousMenu: () => void;
    onNextMenu: () => void;
    menu: Menu;
    leaveLeftPadding: boolean;
}>;
