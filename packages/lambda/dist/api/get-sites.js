"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSites = void 0;
const io_1 = require("../functions/helpers/io");
const constants_1 = require("../shared/constants");
const get_account_id_1 = require("../shared/get-account-id");
const make_s3_url_1 = require("../shared/make-s3-url");
const get_buckets_1 = require("./get-buckets");
/**
 *
 * @description Gets all the deployed sites for a certain AWS region.
 * @link https://remotion.dev/docs/lambda/getsites
 * @param {AwsRegion} params.region The AWS region that you want to query for.
 * @returns {Promise<GetSitesOutput>} A Promise containing an object with `sites` and `bucket` keys. Consult documentation for details.
 */
const getSites = async ({ region, }) => {
    var _a;
    const { remotionBuckets } = await (0, get_buckets_1.getRemotionS3Buckets)(region);
    const accountId = await (0, get_account_id_1.getAccountId)({ region });
    const sites = {};
    for (const bucket of remotionBuckets) {
        const ls = await (0, io_1.lambdaLs)({
            bucketName: bucket.name,
            prefix: (0, constants_1.getSitesKey)(''),
            region,
            expectedBucketOwner: accountId,
        });
        for (const file of ls) {
            const siteKeyMatch = (_a = file.Key) === null || _a === void 0 ? void 0 : _a.match(/sites\/([0-9a-zA-Z-!_.*'()]+)\/(.*)$/);
            if (!siteKeyMatch) {
                throw new Error(`A file was found in the bucket "${bucket.name}" with the key ${file.Key} which is an unexpected folder structure. Delete this file.`);
            }
            const [, siteId] = siteKeyMatch;
            if (!sites[siteId]) {
                sites[siteId] = {
                    sizeInBytes: 0,
                    bucketName: bucket.name,
                    lastModified: null,
                    id: siteId,
                    serveUrl: (0, make_s3_url_1.makeS3ServeUrl)({
                        bucketName: bucket.name,
                        region,
                        subFolder: (0, constants_1.getSitesKey)(siteId),
                    }),
                };
            }
            if (file.LastModified) {
                const currentLastModified = sites[siteId].lastModified;
                if (currentLastModified === null ||
                    file.LastModified.getTime() > currentLastModified) {
                    sites[siteId].lastModified = file.LastModified.getTime();
                }
            }
            if (file.Size) {
                sites[siteId].sizeInBytes += file.Size;
            }
        }
    }
    const sitesArray = Object.keys(sites).map((siteId) => {
        return sites[siteId];
    });
    return { sites: sitesArray, buckets: remotionBuckets };
};
exports.getSites = getSites;
