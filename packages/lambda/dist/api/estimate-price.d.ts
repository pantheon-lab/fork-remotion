import type { AwsRegion } from '../pricing/aws-regions';
import type { LambdaArchitecture } from '../shared/validate-architecture';
export declare type EstimatePriceInput = {
    region: AwsRegion;
    durationInMiliseconds: number;
    memorySizeInMb: number;
    diskSizeInMb: number;
    architecture: LambdaArchitecture;
    lambdasInvoked: number;
};
/**
 *
 * @description Calculates the AWS costs incurred for AWS Lambda given the region, execution duration and memory size.
 * @link https://remotion.dev/docs/lambda/estimateprice
 * @returns {number} Price in USD
 */
export declare const estimatePrice: ({ region, durationInMiliseconds, memorySizeInMb, diskSizeInMb, architecture, lambdasInvoked, }: EstimatePriceInput) => number;
