export declare type ProjectInfo = {
    videoFile: string | null;
    relativeVideoFile: string | null;
};
export declare const getProjectInfo: () => Promise<ProjectInfo>;
