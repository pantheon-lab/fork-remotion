/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type ScriptLine = {
    lineNumber: number;
    content: string;
    highlight: boolean;
};
export declare type SymbolicatedStackFrame = {
    originalFunctionName: string | null;
    originalFileName: string | null;
    originalLineNumber: number | null;
    originalColumnNumber: number | null;
    originalScriptCode: ScriptLine[] | null;
};
export declare type StackFrame = {
    functionName: string | null;
    fileName: string;
    lineNumber: number;
    columnNumber: number;
};
export declare type SomeStackFrame = {
    type: 'symbolicated';
    frame: SymbolicatedStackFrame;
} | {
    type: 'transpiled';
    frame: StackFrame;
};
/**
 * A representation of a stack frame.
 */
export declare const makeStackFrame: ({ functionName, fileName, lineNumber, columnNumber, }: {
    functionName: string | null;
    fileName: string;
    lineNumber: number;
    columnNumber: number;
}) => StackFrame;
