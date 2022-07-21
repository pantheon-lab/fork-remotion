import type { ParsedTiming } from './parse-lambda-timings-key';
export declare const OVERHEAD_TIME_PER_LAMBDA = 100;
export declare type ExpensiveChunk = {
    chunk: number;
    frameRange: [number, number];
    timeInMilliseconds: number;
};
export declare const getMostExpensiveChunks: (parsedTimings: ParsedTiming[], framesPerLambda: number) => ExpensiveChunk[];
