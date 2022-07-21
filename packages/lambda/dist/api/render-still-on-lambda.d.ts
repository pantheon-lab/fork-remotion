import type { ChromiumOptions } from '@remotion/renderer';
import type { LogLevel, StillImageFormat } from 'remotion';
import type { AwsRegion } from '../pricing/aws-regions';
import type { CostsInfo, OutNameInput } from '../shared/constants';
import type { DownloadBehavior } from '../shared/content-disposition-header';
export declare type RenderStillOnLambdaInput = {
    region: AwsRegion;
    functionName: string;
    serveUrl: string;
    composition: string;
    inputProps: unknown;
    imageFormat: StillImageFormat;
    privacy: 'private' | 'public';
    maxRetries?: number;
    envVariables?: Record<string, string>;
    quality?: number;
    frame?: number;
    logLevel?: LogLevel;
    outName?: OutNameInput;
    timeoutInMilliseconds?: number;
    chromiumOptions?: ChromiumOptions;
    scale?: number;
    downloadBehavior?: DownloadBehavior;
};
export declare type RenderStillOnLambdaOutput = {
    estimatedPrice: CostsInfo;
    url: string;
    sizeInBytes: number;
    bucketName: string;
    renderId: string;
};
/**
 * @description Renders a still frame on Lambda
 * @link https://remotion.dev/docs/lambda/renderstillonlambda
 * @param params.functionName The name of the Lambda function that should be used
 * @param params.serveUrl The URL of the deployed project
 * @param params.composition The ID of the composition which should be rendered.
 * @param params.inputProps The input props that should be passed to the composition.
 * @param params.imageFormat In which image format the frames should be rendered.
 * @param params.envVariables Object containing environment variables to be inserted into the video environment
 * @param params.quality JPEG quality if JPEG was selected as the image format.
 * @param params.region The AWS region in which the video should be rendered.
 * @param params.maxRetries How often rendering a chunk may fail before the video render gets aborted.
 * @param params.frame Which frame should be used for the still image. Default 0.
 * @param params.privacy Whether the item in the S3 bucket should be public. Possible values: `"private"` and `"public"`
 * @returns {Promise<RenderStillOnLambdaOutput>} See documentation for exact response structure.
 */
export declare const renderStillOnLambda: ({ functionName, serveUrl, inputProps, imageFormat, envVariables, quality, region, maxRetries, composition, privacy, frame, logLevel, outName, timeoutInMilliseconds, chromiumOptions, scale, downloadBehavior, }: RenderStillOnLambdaInput) => Promise<RenderStillOnLambdaOutput>;
