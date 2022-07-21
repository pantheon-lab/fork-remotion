import React from 'react';
declare type HighestZIndexContainer = {
    highestIndex: number;
    registerZIndex: (index: number) => void;
    unregisterZIndex: (index: number) => void;
};
export declare const HighestZIndexContext: React.Context<HighestZIndexContainer>;
export declare const HighestZIndexProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
