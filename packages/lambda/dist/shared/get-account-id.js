"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountId = void 0;
const client_iam_1 = require("@aws-sdk/client-iam");
const aws_clients_1 = require("./aws-clients");
const validate_aws_region_1 = require("./validate-aws-region");
const getAccountId = async (options) => {
    var _a, _b;
    (0, validate_aws_region_1.validateAwsRegion)(options.region);
    const user = await (0, aws_clients_1.getIamClient)(options.region).send(new client_iam_1.GetUserCommand({}));
    const accountId = (_b = (_a = user.User) === null || _a === void 0 ? void 0 : _a.Arn) === null || _b === void 0 ? void 0 : _b.match(/aws:iam::([0-9]+)/);
    if (!accountId) {
        throw new Error('Cannot get account ID');
    }
    return accountId[1];
};
exports.getAccountId = getAccountId;
