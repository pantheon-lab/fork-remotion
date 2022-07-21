export declare type FileNameAndSize = {
    filename: string;
    size: number;
};
export declare function getFolderFiles(folder: string): FileNameAndSize[];
