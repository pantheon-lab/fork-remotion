"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegions = void 0;
const regions_1 = require("../regions");
/**
 * @description Gets an array of all supported AWS regions of this release of Remotion Lambda.
 * @link https://remotion.dev/docs/lambda/getregions
 * @returns {AwsRegion[]} A list of AWS regions.
 */
const getRegions = () => {
    return regions_1.AWS_REGIONS;
};
exports.getRegions = getRegions;
