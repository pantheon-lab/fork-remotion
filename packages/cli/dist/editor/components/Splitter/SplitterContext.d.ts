import React from 'react';
export declare type SplitterDragState = false | {
    x: number;
    y: number;
};
export declare type SplitterOrientation = 'horizontal' | 'vertical';
export declare type TSplitterContext = {
    flexValue: number;
    setFlexValue: React.Dispatch<React.SetStateAction<number>>;
    domRect: DOMRect | DOMRectReadOnly | null;
    orientation: SplitterOrientation;
    maxFlex: number;
    minFlex: number;
    defaultFlex: number;
    id: string;
    persistFlex: (value: number) => void;
    isDragging: React.MutableRefObject<false | {
        x: number;
        y: number;
    }>;
};
export declare const SplitterContext: React.Context<TSplitterContext>;
