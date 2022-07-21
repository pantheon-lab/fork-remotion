"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAwsRegion = void 0;
const constants_1 = require("../shared/constants");
const is_in_lambda_1 = require("../shared/is-in-lambda");
const validate_aws_region_1 = require("../shared/validate-aws-region");
const args_1 = require("./args");
const getAwsRegion = () => {
    if ((0, is_in_lambda_1.isInsideLambda)()) {
        throw new Error('Should not call getAwsRegion() if in lambda');
    }
    if (args_1.parsedLambdaCli.region) {
        (0, validate_aws_region_1.validateAwsRegion)(args_1.parsedLambdaCli.region);
        return args_1.parsedLambdaCli.region;
    }
    const envVariable = process.env.AWS_REGION;
    if (envVariable) {
        (0, validate_aws_region_1.validateAwsRegion)(envVariable);
        return envVariable;
    }
    return constants_1.DEFAULT_REGION;
};
exports.getAwsRegion = getAwsRegion;
