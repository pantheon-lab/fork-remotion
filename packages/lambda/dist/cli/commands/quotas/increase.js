"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotasIncreaseCommand = exports.INCREASE_SUBCOMMAND = void 0;
const client_service_quotas_1 = require("@aws-sdk/client-service-quotas");
const log_1 = require("@remotion/cli/dist/log");
const process_1 = require("process");
const _1 = require(".");
const defaults_1 = require("../../../defaults");
const aws_clients_1 = require("../../../shared/aws-clients");
const get_aws_region_1 = require("../../get-aws-region");
const confirm_1 = require("../../helpers/confirm");
const quit_1 = require("../../helpers/quit");
exports.INCREASE_SUBCOMMAND = 'increase';
const quotasIncreaseCommand = async () => {
    var _a, _b, _c;
    const region = (0, get_aws_region_1.getAwsRegion)();
    const [concurrencyLimit, defaultConcurrencyLimit, changes] = await Promise.all([
        (0, aws_clients_1.getServiceQuotasClient)(region).send(new client_service_quotas_1.GetServiceQuotaCommand({
            QuotaCode: defaults_1.LAMBDA_CONCURRENCY_LIMIT_QUOTA,
            ServiceCode: 'lambda',
        })),
        (0, aws_clients_1.getServiceQuotasClient)(region).send(new client_service_quotas_1.GetAWSDefaultServiceQuotaCommand({
            QuotaCode: defaults_1.LAMBDA_CONCURRENCY_LIMIT_QUOTA,
            ServiceCode: 'lambda',
        })),
        (0, aws_clients_1.getServiceQuotasClient)(region).send(new client_service_quotas_1.ListRequestedServiceQuotaChangeHistoryByQuotaCommand({
            QuotaCode: defaults_1.LAMBDA_CONCURRENCY_LIMIT_QUOTA,
            ServiceCode: 'lambda',
        })),
    ]);
    const openCase = (_a = changes.RequestedQuotas) === null || _a === void 0 ? void 0 : _a.find((r) => r.Status === 'CASE_OPENED');
    if (openCase) {
        log_1.Log.warn(`A request to increase it to ${openCase.DesiredValue} is already pending:`);
        log_1.Log.warn(`https://${region}.console.aws.amazon.com/support/home#/case/?displayId=${openCase.CaseId}`);
        (0, process_1.exit)(1);
    }
    const concurrencyCurrent = (_b = concurrencyLimit.Quota) === null || _b === void 0 ? void 0 : _b.Value;
    const defaultConcurrency = (_c = defaultConcurrencyLimit.Quota) === null || _c === void 0 ? void 0 : _c.Value;
    const increaseRecommended = concurrencyCurrent <= defaultConcurrency;
    if (!increaseRecommended) {
        log_1.Log.info(`Current limit of ${concurrencyCurrent} is already increased over the default (${defaultConcurrency}). Increase it further via the AWS console.`);
        (0, quit_1.quit)(1);
    }
    const newLimit = Math.floor(concurrencyCurrent / 5000) * 5000 + 5000;
    log_1.Log.info(`Sending request to AWS to increase concurrency limit from ${concurrencyCurrent} to ${newLimit}.`);
    await (0, confirm_1.confirmCli)({
        allowForceFlag: true,
        delMessage: 'Send? (Y/n)',
    });
    await (0, aws_clients_1.getServiceQuotasClient)(region).send(new client_service_quotas_1.RequestServiceQuotaIncreaseCommand({
        QuotaCode: defaults_1.LAMBDA_CONCURRENCY_LIMIT_QUOTA,
        DesiredValue: newLimit,
        ServiceCode: 'lambda',
    }));
    log_1.Log.info(`Requested increase successfully. Run "${defaults_1.BINARY_NAME} ${_1.QUOTAS_COMMAND}" to check whether your request was approved.`);
};
exports.quotasIncreaseCommand = quotasIncreaseCommand;
