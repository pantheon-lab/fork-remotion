"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitesLsSubcommand = exports.SITES_LS_SUBCOMMAND = void 0;
const cli_1 = require("@remotion/cli");
const log_1 = require("@remotion/cli/dist/log");
const get_sites_1 = require("../../../api/get-sites");
const get_aws_region_1 = require("../../get-aws-region");
const date_string_1 = require("../../helpers/date-string");
exports.SITES_LS_SUBCOMMAND = 'ls';
const COLS = [20, 30, 10, 15];
const logRow = (data) => {
    return [
        data[0].padEnd(COLS[0], ' '),
        data[1].padEnd(COLS[1], ' '),
        data[2].padEnd(COLS[2], ' '),
        String(data[3]).padEnd(COLS[3], ' '),
    ].join('');
};
const sitesLsSubcommand = async () => {
    const region = (0, get_aws_region_1.getAwsRegion)();
    const { sites, buckets } = await (0, get_sites_1.getSites)({ region });
    if (buckets.length > 1 && !cli_1.CliInternals.quietFlagProvided()) {
        log_1.Log.warn('Warning: You have more than one Remotion S3 bucket, but only one is needed. This can lead to conflicts. Remove all but one of them.');
    }
    const sitesPluralized = sites.length === 1 ? 'site' : 'sites';
    if (!cli_1.CliInternals.quietFlagProvided()) {
        log_1.Log.info(`${sites.length} ${sitesPluralized} in the ${region} region.`);
    }
    if (cli_1.CliInternals.quietFlagProvided()) {
        if (sites.length === 0) {
            log_1.Log.info('()');
            return;
        }
        return log_1.Log.info(sites.map((s) => s.id).join(' '));
    }
    log_1.Log.info();
    log_1.Log.info(cli_1.CliInternals.chalk.gray(logRow(['Site Name', 'Bucket', 'Size', 'Last updated'])));
    for (const site of sites) {
        log_1.Log.info(logRow([
            site.id,
            site.bucketName,
            cli_1.CliInternals.formatBytes(site.sizeInBytes),
            site.lastModified ? (0, date_string_1.dateString)(new Date(site.lastModified)) : 'n/a',
        ]));
        log_1.Log.info(site.serveUrl);
        log_1.Log.info();
    }
};
exports.sitesLsSubcommand = sitesLsSubcommand;
