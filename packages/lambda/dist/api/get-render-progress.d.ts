import type { AwsRegion } from '../pricing/aws-regions';
import type { RenderProgress } from '../shared/constants';
export declare type GetRenderInput = {
    functionName: string;
    bucketName: string;
    renderId: string;
    region: AwsRegion;
};
/**
 * @description Gets the current status of a render originally triggered via renderMediaOnLambda().
 * @link https://remotion.dev/docs/lambda/getrenderprogress
 * @param {string} params.functionName The name of the function used to trigger the render.
 * @param {string} params.bucketName The name of the bucket that was used in the render.
 * @param {string} params.renderId The ID of the render that was returned by `renderMediaOnLambda()`.
 * @param {AwsRegion} params.region The region in which the render was triggered.
 * @returns {Promise<RenderProgress>} See documentation for this function to see all properties on the return object.
 */
export declare const getRenderProgress: ({ functionName, bucketName, renderId, region, }: GetRenderInput) => Promise<RenderProgress>;
