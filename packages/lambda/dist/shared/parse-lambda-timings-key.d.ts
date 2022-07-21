export declare type ParsedTiming = {
    renderId: string;
    chunk: number;
    start: number;
    rendered: number;
};
export declare const parseLambdaTimingsKey: (key: string) => ParsedTiming;
