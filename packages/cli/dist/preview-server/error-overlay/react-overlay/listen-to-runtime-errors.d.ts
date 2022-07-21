import type { SymbolicatedStackFrame } from './utils/stack-frame';
export declare type ErrorRecord = {
    error: Error;
    contextSize: number;
    stackFrames: SymbolicatedStackFrame[];
};
export declare const getErrorRecord: (error: Error) => Promise<ErrorRecord | null>;
export declare function listenToRuntimeErrors(crash: () => void): () => void;
