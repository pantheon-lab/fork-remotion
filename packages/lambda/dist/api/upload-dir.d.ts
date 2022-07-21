import type { Privacy } from '../defaults';
import type { AwsRegion } from '../pricing/aws-regions';
export declare type UploadDirProgress = {
    totalFiles: number;
    filesUploaded: number;
    totalSize: number;
    sizeUploaded: number;
};
export declare type MockFile = {
    name: string;
    content: string;
};
export declare const getDirFiles: (entry: string) => MockFile[];
export declare const uploadDir: ({ bucket, region, dir, onProgress, folder, privacy, }: {
    bucket: string;
    region: AwsRegion;
    dir: string;
    folder: string;
    onProgress: (progress: UploadDirProgress) => void;
    privacy: Privacy;
}) => Promise<void>;
