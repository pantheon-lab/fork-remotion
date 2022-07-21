import type { AwsRegion } from '../../pricing/aws-regions';
import type { LambdaCodec } from '../../shared/validate-lambda-codec';
export declare const concatVideosS3: ({ bucket, expectedFiles, onProgress, numberOfFrames, renderId, region, codec, expectedBucketOwner, fps, numberOfGifLoops, }: {
    bucket: string;
    expectedFiles: number;
    onProgress: (frames: number, encodingStart: number) => void;
    numberOfFrames: number;
    renderId: string;
    region: AwsRegion;
    codec: LambdaCodec;
    expectedBucketOwner: string;
    fps: number;
    numberOfGifLoops: number | null;
}) => Promise<{
    outfile: string;
    cleanupChunksProm: Promise<void>;
    encodingStart: number;
}>;
