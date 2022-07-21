"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulatePermissions = exports.logPermissionOutput = void 0;
const client_iam_1 = require("@aws-sdk/client-iam");
const aws_clients_1 = require("../../shared/aws-clients");
const simulate_rule_1 = require("./simulate-rule");
const user_permissions_1 = require("./user-permissions");
const getEmojiForStatus = (decision) => {
    switch (decision) {
        case 'allowed':
            return '✅';
        default:
            return '❌';
    }
};
const logPermissionOutput = (output) => {
    return [getEmojiForStatus(output.decision), output.name].join(' ');
};
exports.logPermissionOutput = logPermissionOutput;
/**
 * @description Simulates calls using the AWS Simulator to validate the correct permissions.
 * @link http://remotion.dev/docs/lambda/simulatepermissions
 * @param {AwsRegion} options.region The region which you would like to validate
 * @param {(result: SimulationResult) => void} options.onSimulation The region which you would like to validate
 * @returns {Promise<SimulatePermissionsOutput>} See documentation for detailed response structure.
 */
const simulatePermissions = async (options) => {
    var _a;
    const user = await (0, aws_clients_1.getIamClient)(options.region).send(new client_iam_1.GetUserCommand({}));
    if (!user || !user.User) {
        throw new Error('No valid AWS user detected');
    }
    const results = [];
    for (const per of user_permissions_1.requiredPermissions) {
        const result = await (0, simulate_rule_1.simulateRule)({
            actionNames: per.actions,
            arn: user.User.Arn,
            region: options.region,
            resource: per.resource,
            retries: 2,
        });
        for (const res of result) {
            results.push(res);
            (_a = options.onSimulation) === null || _a === void 0 ? void 0 : _a.call(options, res);
        }
    }
    return { results };
};
exports.simulatePermissions = simulatePermissions;
