export declare type BundleProgress = {
    progress: number;
    doneIn: number | null;
};
export declare const makeBundleProgress: ({ progress, doneIn }: BundleProgress) => string;
export declare type BucketCreationProgress = {
    bucketCreated: boolean;
    websiteEnabled: boolean;
    doneIn: number | null;
};
export declare const makeBucketProgress: ({ bucketCreated, websiteEnabled, doneIn, }: BucketCreationProgress) => string;
export declare type DeployToS3Progress = {
    sizeUploaded: number;
    totalSize: number | null;
    doneIn: number | null;
};
export declare const makeDeployProgressBar: ({ sizeUploaded, totalSize, doneIn, }: DeployToS3Progress) => string;
