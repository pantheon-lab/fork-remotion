import React from 'react';
import type { ComboboxValue } from './ComboBox';
export declare const MenuContent: React.FC<{
    values: ComboboxValue[];
    onHide: () => void;
    onNextMenu: () => void;
    onPreviousMenu: () => void;
    leaveLeftSpace: boolean;
    preselectIndex: false | number;
    topItemCanBeUnselected: boolean;
}>;
