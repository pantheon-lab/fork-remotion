"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAwsRegion = void 0;
const aws_regions_1 = require("../pricing/aws-regions");
function validateAwsRegion(region) {
    if (!aws_regions_1.AWS_REGIONS.includes(region)) {
        throw new TypeError(`${region} is not a valid AWS region. Must be one of: ${aws_regions_1.AWS_REGIONS.join(', ')}`);
    }
}
exports.validateAwsRegion = validateAwsRegion;
