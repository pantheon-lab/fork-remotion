import type { InputHTMLAttributes } from 'react';
import React from 'react';
declare type Props = InputHTMLAttributes<HTMLInputElement> & {
    onValueChange: (newVal: number) => void;
};
export declare const InputDragger: React.FC<Props>;
export {};
