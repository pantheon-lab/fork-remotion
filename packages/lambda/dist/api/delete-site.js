"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSite = void 0;
const defaults_1 = require("../defaults");
const io_1 = require("../functions/helpers/io");
const get_account_id_1 = require("../shared/get-account-id");
const clean_items_1 = require("./clean-items");
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
const deleteSite = async ({ bucketName, siteName, region, onAfterItemDeleted, }) => {
    const accountId = await (0, get_account_id_1.getAccountId)({ region });
    let files = await (0, io_1.lambdaLs)({
        bucketName,
        prefix: (0, defaults_1.getSitesKey)(siteName),
        region,
        expectedBucketOwner: accountId,
    });
    if (files.length === 0) {
        return {
            totalSizeInBytes: 0,
        };
    }
    let totalSize = 0;
    while (files.length > 0) {
        totalSize += files.reduce((a, b) => {
            var _a;
            return a + ((_a = b.Size) !== null && _a !== void 0 ? _a : 0);
        }, 0);
        await (0, clean_items_1.cleanItems)({
            list: files.map((f) => f.Key),
            bucket: bucketName,
            onAfterItemDeleted: onAfterItemDeleted !== null && onAfterItemDeleted !== void 0 ? onAfterItemDeleted : (() => undefined),
            onBeforeItemDeleted: () => undefined,
            region,
        });
        files = await (0, io_1.lambdaLs)({
            bucketName,
            prefix: (0, defaults_1.getSitesKey)(siteName),
            region,
            expectedBucketOwner: accountId,
        });
    }
    return {
        totalSizeInBytes: totalSize,
    };
};
exports.deleteSite = deleteSite;
