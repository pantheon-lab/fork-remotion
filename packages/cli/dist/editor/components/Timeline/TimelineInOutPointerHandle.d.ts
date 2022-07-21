import React from 'react';
export declare const inPointerHandle: React.RefObject<HTMLDivElement>;
export declare const outPointerHandle: React.RefObject<HTMLDivElement>;
export declare const TimelineInOutPointerHandle: React.FC<{
    dragging: boolean;
    type: 'in' | 'out';
    atFrame: number;
}>;
