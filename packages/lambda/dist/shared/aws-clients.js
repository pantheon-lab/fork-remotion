"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceQuotasClient = exports.getIamClient = exports.getLambdaClient = exports.getS3Client = exports.getCloudWatchLogsClient = exports.getServiceClient = void 0;
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
const client_iam_1 = require("@aws-sdk/client-iam");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const client_s3_1 = require("@aws-sdk/client-s3");
const client_service_quotas_1 = require("@aws-sdk/client-service-quotas");
const check_credentials_1 = require("./check-credentials");
const is_in_lambda_1 = require("./is-in-lambda");
const _clients = {};
const getCredentials = () => {
    if ((0, is_in_lambda_1.isInsideLambda)()) {
        return undefined;
    }
    if (process.env.REMOTION_AWS_ACCESS_KEY_ID &&
        process.env.REMOTION_AWS_SECRET_ACCESS_KEY) {
        return {
            accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY,
        };
    }
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
        return {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        };
    }
    return undefined;
};
const getCredentialsKey = () => JSON.stringify(getCredentials());
const getServiceClient = (region, service) => {
    if (!_clients[region]) {
        _clients[region] = {};
    }
    const Client = (() => {
        if (service === 'cloudwatch') {
            return client_cloudwatch_logs_1.CloudWatchLogsClient;
        }
        if (service === 'lambda') {
            return client_lambda_1.LambdaClient;
        }
        if (service === 's3') {
            return client_s3_1.S3Client;
        }
        if (service === 'iam') {
            return client_iam_1.IAMClient;
        }
        if (service === 'servicequotas') {
            return client_service_quotas_1.ServiceQuotasClient;
        }
    })();
    const key = getCredentialsKey();
    // @ts-expect-error
    if (!_clients[region][key]) {
        // @ts-expect-error
        _clients[region][key] = {};
    }
    // @ts-expect-error
    if (!_clients[region][key][service]) {
        (0, check_credentials_1.checkCredentials)();
        // @ts-expect-error
        _clients[region][key][service] = new Client({
            region,
            credentials: getCredentials(),
        });
    }
    // @ts-expect-error
    return _clients[region][key][service];
};
exports.getServiceClient = getServiceClient;
const getCloudWatchLogsClient = (region) => {
    return (0, exports.getServiceClient)(region, 'cloudwatch');
};
exports.getCloudWatchLogsClient = getCloudWatchLogsClient;
const getS3Client = (region) => {
    return (0, exports.getServiceClient)(region, 's3');
};
exports.getS3Client = getS3Client;
const getLambdaClient = (region) => {
    return (0, exports.getServiceClient)(region, 'lambda');
};
exports.getLambdaClient = getLambdaClient;
const getIamClient = (region) => {
    return (0, exports.getServiceClient)(region, 'iam');
};
exports.getIamClient = getIamClient;
const getServiceQuotasClient = (region) => {
    return (0, exports.getServiceClient)(region, 'servicequotas');
};
exports.getServiceQuotasClient = getServiceQuotasClient;
