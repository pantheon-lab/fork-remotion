export declare const makeFfmpegFilterFile: (complexFilter: string) => Promise<{
    file: string;
    cleanup: () => void;
}>;
