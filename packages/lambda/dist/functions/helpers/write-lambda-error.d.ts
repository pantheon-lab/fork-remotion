import type { FileNameAndSize } from './get-files-in-folder';
export declare type LambdaErrorInfo = {
    type: 'renderer' | 'browser' | 'stitcher';
    message: string;
    name: string;
    stack: string;
    frame: number | null;
    chunk: number | null;
    isFatal: boolean;
    attempt: number;
    willRetry: boolean;
    totalAttempts: number;
    tmpDir: {
        files: FileNameAndSize[];
        total: number;
    } | null;
};
export declare const getTmpDirStateIfENoSp: (err: string) => LambdaErrorInfo['tmpDir'];
export declare type EnhancedErrorInfo = LambdaErrorInfo & {
    s3Location: string;
    explanation: string | null;
};
export declare const writeLambdaError: ({ bucketName, renderId, errorInfo, expectedBucketOwner, }: {
    bucketName: string;
    renderId: string;
    expectedBucketOwner: string;
    errorInfo: LambdaErrorInfo;
}) => Promise<void>;
