import type { AwsRegion } from '../pricing/aws-regions';
import type { BucketWithLocation } from './get-buckets';
declare type Site = {
    sizeInBytes: number;
    lastModified: number | null;
    bucketName: string;
    id: string;
    serveUrl: string;
};
export declare type GetSitesInput = {
    region: AwsRegion;
};
export declare type GetSitesOutput = {
    sites: Site[];
    buckets: BucketWithLocation[];
};
/**
 *
 * @description Gets all the deployed sites for a certain AWS region.
 * @link https://remotion.dev/docs/lambda/getsites
 * @param {AwsRegion} params.region The AWS region that you want to query for.
 * @returns {Promise<GetSitesOutput>} A Promise containing an object with `sites` and `bucket` keys. Consult documentation for details.
 */
export declare const getSites: ({ region, }: GetSitesInput) => Promise<GetSitesOutput>;
export {};
