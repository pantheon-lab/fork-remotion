import type { AwsRegion } from '../../pricing/aws-regions';
export declare const collectChunkInformation: ({ bucketName, renderId, region, expectedBucketOwner, }: {
    bucketName: string;
    renderId: string;
    region: AwsRegion;
    expectedBucketOwner: string;
}) => Promise<(Omit<import("./types").ObjectChunkTimingData, "timings"> & {
    timings: number[];
})[]>;
