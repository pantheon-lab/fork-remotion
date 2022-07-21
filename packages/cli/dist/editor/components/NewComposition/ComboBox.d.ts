import React from 'react';
declare type DividerItem = {
    type: 'divider';
    id: string;
};
export declare type SubMenu = {
    preselectIndex: number | false;
    leaveLeftSpace: boolean;
    items: ComboboxValue[];
};
declare type SelectionItem = {
    type: 'item';
    id: string;
    label: React.ReactNode;
    value: string | number;
    onClick: (id: string) => void;
    keyHint: string | null;
    leftItem: React.ReactNode;
    subMenu: SubMenu | null;
};
export declare type ComboboxValue = DividerItem | SelectionItem;
export declare const Combobox: React.FC<{
    values: ComboboxValue[];
    selectedId: string | number;
    style?: React.CSSProperties;
    title: string;
}>;
export {};
