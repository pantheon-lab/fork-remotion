import type { CanvasProps } from '@shopify/react-native-skia';
import type { ReactNode } from 'react';
declare type RemotionCanvasProps = CanvasProps & {
    children: ReactNode;
    width: number;
    height: number;
};
export declare const SkiaCanvas: ({ children, height, width, ...otherProps }: RemotionCanvasProps) => JSX.Element;
export {};
