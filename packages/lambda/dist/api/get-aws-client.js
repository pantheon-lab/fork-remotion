"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAwsClient = void 0;
const CloudWatchSDK = __importStar(require("@aws-sdk/client-cloudwatch-logs"));
const IamSdk = __importStar(require("@aws-sdk/client-iam"));
const LambdaSDK = __importStar(require("@aws-sdk/client-lambda"));
const S3SDK = __importStar(require("@aws-sdk/client-s3"));
const ServiceQuotasSDK = __importStar(require("@aws-sdk/client-service-quotas"));
const aws_clients_1 = require("../shared/aws-clients");
/**
 * @description Gets the full AWS SDK and an instantiated client for an AWS service
 * @link https://remotion.dev/docs/lambda/getawsclient
 * @param {AwsRegion} params.region The region in which the S3 bucket resides in.
 * @param {string} params.service One of `iam`, `s3`, `cloudwatch`, `iam` or `servicequotas`
 * @returns {GetAwsClientOutput<T>} Returns `client` and `sdk` of a AWS service
 */
const getAwsClient = ({ region, service, }) => {
    return {
        client: (0, aws_clients_1.getServiceClient)(region, service),
        sdk: {
            lambda: LambdaSDK,
            cloudwatch: CloudWatchSDK,
            iam: IamSdk,
            s3: S3SDK,
            servicequotas: ServiceQuotasSDK,
        }[service],
    };
};
exports.getAwsClient = getAwsClient;
