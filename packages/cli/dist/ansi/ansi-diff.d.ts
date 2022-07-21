/// <reference types="node" />
declare type Options = {
    width?: number;
    height?: number;
};
export declare class AnsiDiff {
    x: number;
    y: number;
    width: number;
    height: number;
    _buffer: string | null;
    _out: Buffer[];
    _lines: Line[];
    constructor(opts?: Options);
    resize: (opts: Options) => void;
    toString(): string | null;
    update(buffer: string | Buffer, opts?: {
        moveTo?: [number, number];
    }): Buffer;
    _clearDown(y: number): void;
    _newline(): void;
    _write(line: Line): void;
    _moveTo(x: number, y: number): void;
    _push: (buf: Buffer) => void;
}
declare class Line {
    y: number;
    width: number;
    parts: string[];
    height: number;
    remainder: number;
    raw: string;
    length: number;
    newline: boolean;
    constructor(str: string, y: number, nl: boolean, term: AnsiDiff);
    diffLeft(other: Line): number;
    diffRight(other: Line): number;
    toBuffer(): Buffer;
}
export {};
