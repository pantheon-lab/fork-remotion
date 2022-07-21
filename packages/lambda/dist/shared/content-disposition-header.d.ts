export declare type DownloadBehavior = {
    type: 'play-in-browser';
} | {
    type: 'download';
    fileName: string | null;
};
export declare const getContentDispositionHeader: (behavior: DownloadBehavior | null) => string | undefined;
