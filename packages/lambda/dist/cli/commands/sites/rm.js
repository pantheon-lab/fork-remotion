"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitesRmSubcommand = exports.SITES_RM_COMMAND = void 0;
const cli_1 = require("@remotion/cli");
const delete_site_1 = require("../../../api/delete-site");
const get_buckets_1 = require("../../../api/get-buckets");
const get_sites_1 = require("../../../api/get-sites");
const get_aws_region_1 = require("../../get-aws-region");
const confirm_1 = require("../../helpers/confirm");
const quit_1 = require("../../helpers/quit");
const log_1 = require("../../log");
exports.SITES_RM_COMMAND = 'rm';
const sitesRmSubcommand = async (args) => {
    if (args.length === 0) {
        log_1.Log.error('No site name was passed. Run the command again and pass another argument <site-name>.');
        (0, quit_1.quit)(1);
    }
    if (args[0] === '()') {
        log_1.Log.info('No sites to remove.');
        return;
    }
    const region = (0, get_aws_region_1.getAwsRegion)();
    const deployedSites = await (0, get_sites_1.getSites)({
        region,
    });
    for (const siteName of args) {
        const { remotionBuckets } = await (0, get_buckets_1.getRemotionS3Buckets)(region);
        if (remotionBuckets.length > 1) {
            log_1.Log.error('You have more than one Remotion Lambda bucket:');
            for (const bucket of remotionBuckets) {
                log_1.Log.error(`- ${bucket.name}`);
            }
            log_1.Log.error('You should only have one - delete all but one before continuing.');
            (0, quit_1.quit)(1);
        }
        if (remotionBuckets.length === 0) {
            log_1.Log.error(`You don't have a Remotion Lambda bucket in the ${region} region. Therefore nothing was deleted.`);
            (0, quit_1.quit)(1);
        }
        const site = deployedSites.sites.find((s) => s.id === siteName.trim());
        if (!site) {
            log_1.Log.error(`No site ${siteName.trim()} was found in your bucket ${remotionBuckets[0].name}.`);
            return (0, quit_1.quit)(1);
        }
        await (0, confirm_1.confirmCli)({
            delMessage: `Site ${site.id} in bucket ${site.bucketName} (${cli_1.CliInternals.formatBytes(site.sizeInBytes)}): Delete? (Y/n)`,
            allowForceFlag: true,
        });
        const { totalSizeInBytes: totalSize } = await (0, delete_site_1.deleteSite)({
            bucketName: remotionBuckets[0].name,
            siteName,
            region,
            onAfterItemDeleted: ({ itemName }) => {
                log_1.Log.info(cli_1.CliInternals.chalk.gray(`Deleted ${itemName}`));
            },
        });
        log_1.Log.info(`Deleted site ${siteName} and freed up ${cli_1.CliInternals.formatBytes(totalSize)}.`);
    }
};
exports.sitesRmSubcommand = sitesRmSubcommand;
