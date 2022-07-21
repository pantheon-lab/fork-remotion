import React from 'react';
import type { SubMenu } from '../NewComposition/ComboBox';
export declare const MENU_SUBMENU_BUTTON_CLASS_NAME = "remotion-submenu-button";
export declare type SubMenuActivated = false | 'with-mouse' | 'without-mouse';
export declare const MenuSubItem: React.FC<{
    label: React.ReactNode;
    id: string;
    onActionChosen: (id: string) => void;
    selected: boolean;
    onItemSelected: (id: string) => void;
    keyHint: string | null;
    leaveLeftSpace: boolean;
    leftItem: React.ReactNode;
    subMenu: SubMenu | null;
    onQuitMenu: () => void;
    onNextMenu: () => void;
    subMenuActivated: SubMenuActivated;
    setSubMenuActivated: React.Dispatch<React.SetStateAction<SubMenuActivated>>;
}>;
