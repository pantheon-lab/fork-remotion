import type { ChromiumOptions } from '@remotion/renderer';
import type { Codec, FrameRange, ImageFormat, LogLevel, PixelFormat, ProResProfile, VideoConfig } from 'remotion';
import type { ChunkRetry } from '../functions/helpers/get-retry-stats';
import type { EnhancedErrorInfo } from '../functions/helpers/write-lambda-error';
import type { AwsRegion } from '../pricing/aws-regions';
import type { DownloadBehavior } from './content-disposition-header';
import type { ExpensiveChunk } from './get-most-expensive-chunks';
import type { LambdaArchitecture } from './validate-architecture';
import type { LambdaCodec } from './validate-lambda-codec';
export declare const MIN_MEMORY = 512;
export declare const MAX_MEMORY = 10240;
export declare const DEFAULT_MEMORY_SIZE = 2048;
export declare const DEFAULT_ARCHITECTURE: LambdaArchitecture;
export declare const DEFAULT_TIMEOUT = 120;
export declare const MIN_TIMEOUT = 15;
export declare const MAX_TIMEOUT = 900;
export declare const MINIMUM_FRAMES_PER_LAMBDA = 4;
export declare const DEFAULT_FRAMES_PER_LAMBDA = 20;
export declare const BINARY_NAME = "remotion lambda";
export declare const COMMAND_NOT_FOUND = "Command not found";
export declare const DEFAULT_REGION: AwsRegion;
export declare const DEFAULT_MAX_RETRIES = 1;
export declare const MAX_FUNCTIONS_PER_RENDER = 200;
export declare const DEFAULT_EPHEMERAL_STORAGE_IN_MB = 512;
export declare const MIN_EPHEMERAL_STORAGE_IN_MB = 512;
export declare const MAX_EPHEMERAL_STORAGE_IN_MB = 10240;
export declare const DEFAULT_OUTPUT_PRIVACY: Privacy;
export declare const DEFAULT_CLOUDWATCH_RETENTION_PERIOD = 14;
export declare const REMOTION_BUCKET_PREFIX = "remotionlambda-";
export declare const RENDER_FN_PREFIX = "remotion-render-";
export declare const LOG_GROUP_PREFIX = "/aws/lambda/";
export declare const rendersPrefix: (renderId: string) => string;
export declare const encodingProgressKey: (renderId: string) => string;
export declare const renderMetadataKey: (renderId: string) => string;
export declare const lambdaInitializedPrefix: (renderId: string) => string;
export declare const lambdaInitializedKey: ({ renderId, chunk, attempt, }: {
    attempt: number;
    renderId: string;
    chunk: number;
}) => string;
export declare const lambdaTimingsPrefix: (renderId: string) => string;
export declare const lambdaTimingsPrefixForChunk: (renderId: string, chunk: number) => string;
export declare const lambdaLogsPrefix: (renderId: string, chunk: number, startFrame: number, endFrame: number) => string;
export declare const lambdaTimingsKey: ({ renderId, chunk, start, rendered, }: {
    renderId: string;
    chunk: number;
    start: number;
    rendered: number;
}) => string;
export declare const chunkKey: (renderId: string) => string;
export declare const chunkKeyForIndex: ({ renderId, index, }: {
    renderId: string;
    index: number;
}) => string;
export declare const getErrorKeyPrefix: (renderId: string) => string;
export declare const getErrorFileName: ({ renderId, chunk, attempt, }: {
    renderId: string;
    chunk: number | null;
    attempt: number;
}) => string;
export declare type OutNameInput = string | {
    bucketName: string;
    key: string;
};
export declare type OutNameOutput = {
    renderBucketName: string;
    key: string;
};
export declare const optimizationProfile: (siteId: string, compositionId: string) => string;
export declare const getSitesKey: (siteId: string) => string;
export declare const outName: (renderId: string, extension: string) => string;
export declare const outStillName: (renderId: string, imageFormat: ImageFormat) => string;
export declare const customOutName: (renderId: string, bucketName: string, name: OutNameInput) => OutNameOutput;
export declare const postRenderDataKey: (renderId: string) => string;
export declare const RENDERER_PATH_TOKEN = "remotion-bucket";
export declare const CONCAT_FOLDER_TOKEN = "remotion-concat";
export declare const REMOTION_CONCATED_TOKEN = "remotion-concated-token";
export declare const REMOTION_FILELIST_TOKEN = "remotion-filelist";
export declare enum LambdaRoutines {
    info = "info",
    start = "start",
    launch = "launch",
    status = "status",
    renderer = "renderer",
    still = "still"
}
export declare type LambdaPayloads = {
    info: {
        type: LambdaRoutines.info;
    };
    start: {
        type: LambdaRoutines.start;
        serveUrl: string;
        composition: string;
        framesPerLambda: number | null;
        inputProps: unknown;
        codec: LambdaCodec;
        imageFormat: ImageFormat;
        crf: number | undefined;
        envVariables: Record<string, string> | undefined;
        pixelFormat: PixelFormat | undefined;
        proResProfile: ProResProfile | undefined;
        quality: number | undefined;
        maxRetries: number;
        privacy: Privacy;
        logLevel: LogLevel;
        frameRange: FrameRange | null;
        outName: OutNameInput | null;
        timeoutInMilliseconds: number;
        chromiumOptions: ChromiumOptions;
        scale: number;
        everyNthFrame: number;
        numberOfGifLoops: number | null;
        concurrencyPerLambda: number;
        downloadBehavior: DownloadBehavior;
    };
    launch: {
        type: LambdaRoutines.launch;
        serveUrl: string;
        composition: string;
        framesPerLambda: number | null;
        bucketName: string;
        inputProps: unknown;
        renderId: string;
        imageFormat: ImageFormat;
        codec: LambdaCodec;
        crf: number | undefined;
        envVariables: Record<string, string> | undefined;
        pixelFormat: PixelFormat | undefined;
        proResProfile: ProResProfile | undefined;
        quality: number | undefined;
        maxRetries: number;
        privacy: Privacy;
        logLevel: LogLevel;
        frameRange: FrameRange | null;
        outName: OutNameInput | null;
        timeoutInMilliseconds: number;
        chromiumOptions: ChromiumOptions;
        scale: number;
        everyNthFrame: number;
        numberOfGifLoops: number | null;
        concurrencyPerLambda: number;
        downloadBehavior: DownloadBehavior;
    };
    status: {
        type: LambdaRoutines.status;
        bucketName: string;
        renderId: string;
    };
    renderer: {
        concurrencyPerLambda: number;
        type: LambdaRoutines.renderer;
        serveUrl: string;
        frameRange: [number, number];
        chunk: number;
        bucketName: string;
        composition: string;
        fps: number;
        height: number;
        width: number;
        durationInFrames: number;
        retriesLeft: number;
        inputProps: unknown;
        renderId: string;
        imageFormat: ImageFormat;
        codec: Exclude<Codec, 'h264'>;
        crf: number | undefined;
        proResProfile: ProResProfile | undefined;
        pixelFormat: PixelFormat | undefined;
        quality: number | undefined;
        envVariables: Record<string, string> | undefined;
        privacy: Privacy;
        attempt: number;
        logLevel: LogLevel;
        timeoutInMilliseconds: number;
        chromiumOptions: ChromiumOptions;
        scale: number;
        everyNthFrame: number;
    };
    still: {
        type: LambdaRoutines.still;
        serveUrl: string;
        composition: string;
        inputProps: unknown;
        imageFormat: ImageFormat;
        envVariables: Record<string, string> | undefined;
        attempt: number;
        quality: number | undefined;
        maxRetries: number;
        frame: number;
        privacy: Privacy;
        logLevel: LogLevel;
        outName: OutNameInput | null;
        timeoutInMilliseconds: number;
        chromiumOptions: ChromiumOptions;
        scale: number;
        downloadBehavior: DownloadBehavior | null;
    };
};
export declare type LambdaPayload = LambdaPayloads[LambdaRoutines];
export declare type EncodingProgress = {
    framesEncoded: number;
    totalFrames: number | null;
    doneIn: number | null;
    timeToInvoke: number | null;
};
export declare type RenderMetadata = {
    siteId: string;
    videoConfig: VideoConfig;
    startedDate: number;
    totalChunks: number;
    estimatedTotalLambdaInvokations: number;
    estimatedRenderLambdaInvokations: number;
    compositionId: string;
    codec: Codec | null;
    usesOptimizationProfile: boolean;
    type: 'still' | 'video';
    imageFormat: ImageFormat;
    inputProps: unknown;
    framesPerLambda: number;
    memorySizeInMb: number;
    lambdaVersion: LambdaVersions;
    region: AwsRegion;
    renderId: string;
    outName: OutNameInput | undefined;
};
export declare type LambdaVersions = '2022-07-20' | '2022-07-18' | '2022-07-15' | '2022-07-14' | '2022-07-12' | '2022-07-10' | '2022-07-09' | '2022-07-08' | '2022-07-04' | '2022-06-30' | '2022-06-29' | '2022-06-25' | '2022-06-22' | '2022-06-21' | '2022-06-14' | '2022-06-08' | '2022-06-07' | '2022-06-02' | '2022-05-31' | '2022-05-28' | '2022-05-27' | '2022-05-19' | '2022-05-16' | '2022-05-11' | '2022-05-07' | '2022-05-06' | '2022-05-03' | '2022-04-20' | '2022-04-19' | '2022-04-18' | '2022-04-09' | '2022-04-08' | '2022-04-05' | '2022-04-02' | '2022-03-29' | '2022-03-17' | '2022-03-02' | '2022-03-01' | '2022-02-27' | '2022-02-14' | '2022-02-12' | '2022-02-09' | '2022-02-08' | '2022-02-07' | '2022-02-06' | '2022-02-05' | '2022-02-04' | '2022-02-03' | '2022-01-23' | '2022-01-19' | '2022-01-11' | '2022-01-10' | '2022-01-09' | '2022-01-06' | '2022-01-05' | '2021-12-22' | '2021-12-17' | '2021-12-16' | '2021-12-15' | '2021-12-14' | '2021-12-13' | '2021-12-11' | '2021-12-10' | '2021-12-04' | '2021-11-29' | '2021-11-27' | '2021-11-24' | '2021-11-22' | '2021-11-19' | '2021-11-18' | '2021-11-15' | '2021-11-12' | '2021-11-10' | '2021-11-01' | '2021-10-29' | '2021-10-27' | '2021-10-21' | '2021-10-19' | '2021-10-07' | '2021-10-03' | '2021-10-01' | '2021-09-15' | '2021-09-06' | '2021-08-06' | '2021-07-14' | '2021-07-05' | '2021-07-02' | '2021-06-23' | 'n/a';
export declare const CURRENT_VERSION: LambdaVersions;
export declare type PostRenderData = {
    cost: {
        estimatedCost: number;
        estimatedDisplayCost: string;
        currency: string;
        disclaimer: string;
    };
    outputFile: string;
    outputSize: number;
    renderSize: number;
    timeToFinish: number;
    errors: EnhancedErrorInfo[];
    startTime: number;
    endTime: number;
    filesCleanedUp: number;
    renderMetadata: RenderMetadata;
    timeToEncode: number;
    timeToCleanUp: number;
    timeToRenderChunks: number;
    timeToInvokeLambdas: number;
    retriesInfo: ChunkRetry[];
    mostExpensiveFrameRanges: ExpensiveChunk[] | undefined;
};
export declare type CostsInfo = {
    accruedSoFar: number;
    displayCost: string;
    currency: string;
    disclaimer: string;
};
export declare type CleanupInfo = {
    doneIn: number | null;
    minFilesToDelete: number;
    filesDeleted: number;
};
export declare type RenderProgress = {
    chunks: number;
    done: boolean;
    encodingStatus: EncodingProgress | null;
    costs: CostsInfo;
    renderId: string;
    renderMetadata: RenderMetadata | null;
    bucket: string;
    outputFile: string | null;
    outKey: string | null;
    outBucket: string | null;
    timeToFinish: number | null;
    errors: EnhancedErrorInfo[];
    fatalErrorEncountered: boolean;
    currentTime: number;
    renderSize: number;
    lambdasInvoked: number;
    cleanup: CleanupInfo | null;
    timeToFinishChunks: number | null;
    timeToInvokeLambdas: number | null;
    overallProgress: number;
    retriesInfo: ChunkRetry[];
    mostExpensiveFrameRanges: ExpensiveChunk[] | null;
};
export declare type Privacy = 'public' | 'private';
export declare const LAMBDA_CONCURRENCY_LIMIT_QUOTA = "L-B99A9384";
export declare const LAMBDA_BURST_LIMIT_QUOTA = "L-548AE339";
