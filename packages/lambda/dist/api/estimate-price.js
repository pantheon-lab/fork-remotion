"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimatePrice = void 0;
const defaults_1 = require("../defaults");
const price_per_1_s_1 = require("../pricing/price-per-1-s");
const validate_architecture_1 = require("../shared/validate-architecture");
const validate_aws_region_1 = require("../shared/validate-aws-region");
const validate_disk_size_in_mb_1 = require("../shared/validate-disk-size-in-mb");
const validate_memory_size_1 = require("../shared/validate-memory-size");
/**
 *
 * @description Calculates the AWS costs incurred for AWS Lambda given the region, execution duration and memory size.
 * @link https://remotion.dev/docs/lambda/estimateprice
 * @returns {number} Price in USD
 */
const estimatePrice = ({ region, durationInMiliseconds, memorySizeInMb, diskSizeInMb, architecture, lambdasInvoked, }) => {
    (0, validate_memory_size_1.validateMemorySize)(memorySizeInMb);
    (0, validate_aws_region_1.validateAwsRegion)(region);
    (0, validate_architecture_1.validateArchitecture)(architecture);
    (0, validate_disk_size_in_mb_1.validateDiskSizeInMb)(diskSizeInMb);
    if (typeof durationInMiliseconds !== 'number') {
        throw new TypeError(`Parameter 'durationInMiliseconds' must be a number but got ${typeof durationInMiliseconds}`);
    }
    if (Number.isNaN(durationInMiliseconds)) {
        throw new TypeError(`Parameter 'durationInMiliseconds' must not be NaN but it is.`);
    }
    if (!Number.isFinite(durationInMiliseconds)) {
        throw new TypeError(`Parameter 'durationInMiliseconds' must be finite but it is ${durationInMiliseconds}`);
    }
    if (durationInMiliseconds < 0) {
        throw new TypeError(`Parameter 'durationInMiliseconds' must be over 0 but it is ${durationInMiliseconds}.`);
    }
    const durationPrice = architecture === 'x86_64'
        ? price_per_1_s_1.pricing[region]['Lambda Duration'].price
        : price_per_1_s_1.pricing[region]['Lambda Duration-ARM'].price;
    // In GB-second
    const timeCostDollars = Number(durationPrice) *
        ((memorySizeInMb * durationInMiliseconds) / 1000 / 1024);
    const diskSizePrice = architecture === 'x86_64'
        ? price_per_1_s_1.pricing[region]['Lambda Storage-Duration'].price
        : price_per_1_s_1.pricing[region]['Lambda Storage-Duration-ARM'].price;
    const chargedDiskSize = Math.max(0, diskSizeInMb - defaults_1.MIN_EPHEMERAL_STORAGE_IN_MB);
    // In GB-second
    const diskSizeDollars = chargedDiskSize *
        Number(diskSizePrice) *
        (durationInMiliseconds / 1000 / 1024);
    const invocationCost = Number(price_per_1_s_1.pricing[region]['Lambda Requests'].price) * lambdasInvoked;
    return Number((timeCostDollars + diskSizeDollars + invocationCost).toFixed(5));
};
exports.estimatePrice = estimatePrice;
