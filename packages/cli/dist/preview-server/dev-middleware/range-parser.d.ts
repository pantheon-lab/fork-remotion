/*!
 * range-parser
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare type Range = {
    start: number;
    end: number;
};
declare type Ranges = Range[] & {
    type?: string;
};
export declare function parseRange(size: number, str: string | string[]): -1 | Ranges | -2;
export {};
