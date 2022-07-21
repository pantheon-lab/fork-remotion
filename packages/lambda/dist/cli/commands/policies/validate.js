"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSubcommand = exports.VALIDATE_SUBCOMMAND = void 0;
const simulate_1 = require("../../../api/iam-validation/simulate");
const get_aws_region_1 = require("../../get-aws-region");
const log_1 = require("../../log");
exports.VALIDATE_SUBCOMMAND = 'validate';
const validateSubcommand = async () => {
    try {
        await (0, simulate_1.simulatePermissions)({
            region: (0, get_aws_region_1.getAwsRegion)(),
            onSimulation: (res) => {
                log_1.Log.info((0, simulate_1.logPermissionOutput)(res));
            },
        });
    }
    catch (err) {
        log_1.Log.error('Did not have the required permissions on AWS:');
        log_1.Log.error(err);
    }
};
exports.validateSubcommand = validateSubcommand;