export declare const createFfmpegComplexFilter: (filters: number) => Promise<{
    complexFilterFlag: [string, string] | null;
    cleanup: () => void;
}>;
