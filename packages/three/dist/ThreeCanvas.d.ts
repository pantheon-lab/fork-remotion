import { Canvas } from '@react-three/fiber';
import React from 'react';
export declare type ThreeCanvasProps = React.ComponentProps<typeof Canvas> & {
    width: number;
    height: number;
    children: React.ReactNode;
};
export declare const ThreeCanvas: (props: ThreeCanvasProps) => JSX.Element;
