"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateRule = void 0;
const client_iam_1 = require("@aws-sdk/client-iam");
const aws_policies_1 = require("aws-policies");
const aws_clients_1 = require("../../shared/aws-clients");
const simulateRule = async (options) => {
    var _a;
    try {
        if (options.actionNames.includes(aws_policies_1.iam.GetUser)) {
            try {
                await (0, aws_clients_1.getIamClient)(options.region).send(new client_iam_1.GetUserCommand({}));
                const result = [
                    {
                        decision: 'allowed',
                        name: aws_policies_1.iam.GetUser,
                    },
                ];
                return result;
            }
            catch (err) {
                const result = [
                    {
                        decision: 'explicitDeny',
                        name: aws_policies_1.iam.GetUser,
                    },
                ];
                return result;
            }
        }
        const res = await (0, aws_clients_1.getIamClient)(options.region).send(new client_iam_1.SimulatePrincipalPolicyCommand({
            ActionNames: options.actionNames,
            PolicySourceArn: options.arn,
            ResourceArns: options.resource,
        }));
        return ((_a = res.EvaluationResults) !== null && _a !== void 0 ? _a : []).map((pol) => {
            return {
                decision: pol.EvalDecision,
                name: pol.EvalActionName,
            };
        });
    }
    catch (err) {
        // Sometimes the AWS Rate limit hits. In that case we retry up to two times
        // after waiting for 2 seconds.
        if (options.retries <= 0) {
            throw err;
        }
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        return (0, exports.simulateRule)({ ...options, retries: options.retries - 1 });
    }
};
exports.simulateRule = simulateRule;
