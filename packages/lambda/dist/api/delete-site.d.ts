import type { AwsRegion } from '../pricing/aws-regions';
export declare type DeleteSiteInput = {
    bucketName: string;
    siteName: string;
    region: AwsRegion;
    onAfterItemDeleted?: (data: {
        bucketName: string;
        itemName: string;
    }) => void;
};
export declare type DeleteSiteOutput = {
    totalSizeInBytes: number;
};
/**
 *
 * @description Deletes a deployed site from your S3 bucket. The opposite of deploySite().
 * @link https://remotion.dev/docs/lambda/deletesite
 * @param options.bucketName The S3 bucket name where the site resides in.
 * @param options.siteName The ID of the site that you want to delete.
 * @param {AwsRegion} options.region The region in where the S3 bucket resides in.
 * @param options.onAfterItemDeleted Function that gets called after each file that gets deleted, useful for showing progress.
 * @returns {Promise<DeleteSiteOutput>} Object containing info about how much space was freed.
 */
export declare const deleteSite: ({ bucketName, siteName, region, onAfterItemDeleted, }: DeleteSiteInput) => Promise<DeleteSiteOutput>;
