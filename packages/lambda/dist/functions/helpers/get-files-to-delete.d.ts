export declare type CleanupJob = {
    name: string;
    type: 'exact' | 'prefix';
};
export declare const getFilesToDelete: ({ chunkCount, renderId, }: {
    chunkCount: number;
    renderId: string;
}) => CleanupJob[];
