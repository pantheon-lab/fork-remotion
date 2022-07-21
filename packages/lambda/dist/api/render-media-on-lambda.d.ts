import type { ChromiumOptions } from '@remotion/renderer';
import type { FrameRange, ImageFormat, LogLevel, PixelFormat, ProResProfile } from 'remotion';
import type { AwsRegion } from '../pricing/aws-regions';
import type { OutNameInput, Privacy } from '../shared/constants';
import type { DownloadBehavior } from '../shared/content-disposition-header';
import type { LambdaCodec } from '../shared/validate-lambda-codec';
export declare type RenderMediaOnLambdaInput = {
    region: AwsRegion;
    functionName: string;
    serveUrl: string;
    composition: string;
    inputProps: unknown;
    codec: LambdaCodec;
    imageFormat: ImageFormat;
    crf?: number | undefined;
    envVariables?: Record<string, string>;
    pixelFormat?: PixelFormat;
    proResProfile?: ProResProfile;
    privacy: Privacy;
    quality?: number;
    maxRetries: number;
    framesPerLambda?: number;
    logLevel?: LogLevel;
    frameRange?: FrameRange;
    outName?: OutNameInput;
    timeoutInMilliseconds?: number;
    chromiumOptions?: ChromiumOptions;
    scale?: number;
    everyNthFrame?: number;
    numberOfGifLoops?: number | null;
    concurrencyPerLambda?: number;
    downloadBehavior?: DownloadBehavior | null;
};
export declare type RenderMediaOnLambdaOutput = {
    renderId: string;
    bucketName: string;
};
/**
 * @description Triggers a render on a lambda given a composition and a lambda function.
 * @link https://remotion.dev/docs/lambda/rendermediaonlambda
 * @param params.functionName The name of the Lambda function that should be used
 * @param params.serveUrl The URL of the deployed project
 * @param params.composition The ID of the composition which should be rendered.
 * @param params.inputProps The input props that should be passed to the composition.
 * @param params.codec The video codec which should be used for encoding.
 * @param params.imageFormat In which image format the frames should be rendered.
 * @param params.crf The constant rate factor to be used during encoding.
 * @param params.envVariables Object containing environment variables to be inserted into the video environment
 * @param params.proResProfile The ProRes profile if rendering a ProRes video
 * @param params.quality JPEG quality if JPEG was selected as the image format.
 * @param params.region The AWS region in which the video should be rendered.
 * @param params.maxRetries How often rendering a chunk may fail before the video render gets aborted.
 * @param params.logLevel Level of logging that Lambda function should perform. Default "info".
 * @returns {Promise<RenderMediaOnLambdaOutput>} See documentation for detailed structure
 */
export declare const renderMediaOnLambda: ({ functionName, serveUrl, inputProps, codec, imageFormat, crf, envVariables, pixelFormat, proResProfile, quality, region, maxRetries, composition, framesPerLambda, privacy, logLevel, frameRange, outName, timeoutInMilliseconds, chromiumOptions, scale, numberOfGifLoops, everyNthFrame, concurrencyPerLambda, downloadBehavior, }: RenderMediaOnLambdaInput) => Promise<RenderMediaOnLambdaOutput>;
/**
 * @deprecated Renamed to renderMediaOnLambda()
 */
export declare const renderVideoOnLambda: ({ functionName, serveUrl, inputProps, codec, imageFormat, crf, envVariables, pixelFormat, proResProfile, quality, region, maxRetries, composition, framesPerLambda, privacy, logLevel, frameRange, outName, timeoutInMilliseconds, chromiumOptions, scale, numberOfGifLoops, everyNthFrame, concurrencyPerLambda, downloadBehavior, }: RenderMediaOnLambdaInput) => Promise<RenderMediaOnLambdaOutput>;
