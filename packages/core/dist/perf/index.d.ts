declare type PerfId = 'activate-target' | 'capture' | 'save' | 'extract-frame' | 'piping';
export declare const startPerfMeasure: (marker: PerfId) => number;
export declare const stopPerfMeasure: (id: number) => void;
export declare const logPerf: () => void;
export {};
