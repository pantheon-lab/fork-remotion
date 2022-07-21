"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotasListCommand = void 0;
const client_service_quotas_1 = require("@aws-sdk/client-service-quotas");
const cli_1 = require("@remotion/cli");
const _1 = require(".");
const defaults_1 = require("../../../defaults");
const aws_clients_1 = require("../../../shared/aws-clients");
const get_aws_region_1 = require("../../get-aws-region");
const log_1 = require("../../log");
const increase_1 = require("./increase");
const quotasListCommand = async () => {
    var _a, _b, _c, _d;
    const region = (0, get_aws_region_1.getAwsRegion)();
    log_1.Log.info(cli_1.CliInternals.chalk.gray(`Region = ${region}`));
    log_1.Log.info();
    const [concurrencyLimit, defaultConcurrencyLimit, burstLimit, changes] = await Promise.all([
        (0, aws_clients_1.getServiceQuotasClient)(region).send(new client_service_quotas_1.GetServiceQuotaCommand({
            QuotaCode: defaults_1.LAMBDA_CONCURRENCY_LIMIT_QUOTA,
            ServiceCode: 'lambda',
        })),
        (0, aws_clients_1.getServiceQuotasClient)(region).send(new client_service_quotas_1.GetAWSDefaultServiceQuotaCommand({
            QuotaCode: defaults_1.LAMBDA_CONCURRENCY_LIMIT_QUOTA,
            ServiceCode: 'lambda',
        })),
        (0, aws_clients_1.getServiceQuotasClient)(region).send(new client_service_quotas_1.GetAWSDefaultServiceQuotaCommand({
            QuotaCode: defaults_1.LAMBDA_BURST_LIMIT_QUOTA,
            ServiceCode: 'lambda',
        })),
        (0, aws_clients_1.getServiceQuotasClient)(region).send(new client_service_quotas_1.ListRequestedServiceQuotaChangeHistoryByQuotaCommand({
            QuotaCode: defaults_1.LAMBDA_CONCURRENCY_LIMIT_QUOTA,
            ServiceCode: 'lambda',
        })),
    ]);
    const openCase = (_a = changes.RequestedQuotas) === null || _a === void 0 ? void 0 : _a.find((r) => r.Status === 'CASE_OPENED');
    const concurrencyCurrent = (_b = concurrencyLimit.Quota) === null || _b === void 0 ? void 0 : _b.Value;
    const defaultConcurrency = (_c = defaultConcurrencyLimit.Quota) === null || _c === void 0 ? void 0 : _c.Value;
    const burstDefault = (_d = burstLimit.Quota) === null || _d === void 0 ? void 0 : _d.Value;
    const increaseRecommended = concurrencyCurrent <= defaultConcurrency;
    const effectiveBurstConcurrency = Math.min(burstDefault, defaultConcurrency);
    if (increaseRecommended) {
        log_1.Log.info(`Concurrency limit: ${concurrencyCurrent} - ${increaseRecommended
            ? cli_1.CliInternals.chalk.greenBright('Increase recommended!')
            : ''}`);
    }
    else {
        log_1.Log.info(`Concurrency limit: ${concurrencyCurrent}`);
    }
    if (openCase) {
        log_1.Log.warn(`A request to increase it to ${openCase.DesiredValue} is pending:`);
        log_1.Log.warn(`https://${region}.console.aws.amazon.com/support/home#/case/?displayId=${openCase.CaseId}`);
    }
    log_1.Log.info(cli_1.CliInternals.chalk.gray('The maximum amount of Lambda functions which can concurrently execute.'));
    log_1.Log.info(cli_1.CliInternals.chalk.gray(`Run \`npx ${defaults_1.BINARY_NAME} ${_1.QUOTAS_COMMAND} ${increase_1.INCREASE_SUBCOMMAND}\` to ask AWS to increase your limit.`));
    log_1.Log.info();
    if (effectiveBurstConcurrency === burstDefault) {
        log_1.Log.info(`Burst concurrency: ${burstDefault}`);
    }
    else {
        log_1.Log.info(`Burst concurrency: ${burstDefault}, but only ${effectiveBurstConcurrency} effective because of concurrency limit`);
    }
    log_1.Log.info(cli_1.CliInternals.chalk.gray('The maximum amount of Lambda functions that can spawn in a short amount of time'));
};
exports.quotasListCommand = quotasListCommand;
